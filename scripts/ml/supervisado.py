"""Entrena los modelos de la rama Supervisado y guarda números reales en src/datos/ml_sup.json.
Pingüinos de Palmer (datos reales: Gorman, Williams & Fraser 2014, Palmer Station LTER).
Café Datos y fraude: datos sintéticos ficticios, semilla fija.
    pip install scikit-learn numpy pandas palmerpenguins
"""
import json, os
import numpy as np
from palmerpenguins import load_penguins
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn.linear_model import LogisticRegression, LinearRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier, GradientBoostingRegressor
from sklearn.neural_network import MLPClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import make_pipeline
from sklearn.metrics import accuracy_score, mean_absolute_error, confusion_matrix, precision_score, recall_score

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..")
out = {}
r = lambda x, d=1: round(float(x), d)

peng_raw = load_penguins()
NUM = ["bill_length_mm", "bill_depth_mm", "flipper_length_mm", "body_mass_g"]
peng = peng_raw.dropna(subset=NUM + ["sex"])
X = peng[NUM].values
y = peng["species"].values
Xtr, Xte, ytr, yte = train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)

# S1: regresión (peso) vs clasificación (especie)
Xr = peng[["flipper_length_mm", "bill_length_mm"]].values
yr = peng["body_mass_g"].values
a, b, c, d = train_test_split(Xr, yr, test_size=0.25, random_state=0)
reg = LinearRegression().fit(a, c)
clf = make_pipeline(StandardScaler(), LogisticRegression(max_iter=1000)).fit(Xtr, ytr)
out["s1"] = {"mae_peso": r(mean_absolute_error(d, reg.predict(b)), 0), "acc_especie": r(100 * accuracy_score(yte, clf.predict(Xte)), 1)}

# S2: KNN con pico (largo y profundidad)
X2 = peng[["bill_length_mm", "bill_depth_mm"]].values
a2, b2, c2, d2 = train_test_split(X2, y, test_size=0.25, random_state=0, stratify=y)
ks = {}
for k in [1, 5, 25]:
    m = make_pipeline(StandardScaler(), KNeighborsClassifier(k)).fit(a2, c2)
    ks[k] = r(100 * accuracy_score(d2, m.predict(b2)), 1)
nuevo = np.array([[46.0, 17.5]])
m5 = make_pipeline(StandardScaler(), KNeighborsClassifier(5)).fit(a2, c2)
dist, idx = m5[-1].kneighbors(m5[0].transform(nuevo))
vecinos = [str(c2[i]) for i in idx[0]]
out["s2"] = {
    "puntos": [[r(p[0]), r(p[1]), s] for p, s in zip(X2, y)],
    "nuevo": [46.0, 17.5], "vecinos_idx": [[r(a2[i][0]), r(a2[i][1])] for i in idx[0]],
    "vecinos": vecinos, "pred": str(m5.predict(nuevo)[0]), "acc_k": ks,
}

# S3: regresión logística — ¿regresará el cliente? (Café Datos, ficticio)
rng = np.random.default_rng(3)
visitas = rng.uniform(0, 12, 300)
p_true = 1 / (1 + np.exp(-(visitas - 5) * 0.9))
regresa = (rng.random(300) < p_true).astype(int)
a3, b3, c3, d3 = train_test_split(visitas.reshape(-1, 1), regresa, test_size=0.25, random_state=0)
lg = LogisticRegression().fit(a3, c3)
xs = np.linspace(0, 12, 60)
out["s3"] = {
    "puntos": [[r(v, 2), int(t)] for v, t in zip(visitas[:120], regresa[:120])],
    "curva": [[r(v, 2), r(p, 3)] for v, p in zip(xs, lg.predict_proba(xs.reshape(-1, 1))[:, 1])],
    "p_ana": r(100 * lg.predict_proba([[8]])[0, 1], 0), "p_luis": r(100 * lg.predict_proba([[2]])[0, 1], 0),
    "corte": r(-lg.intercept_[0] / lg.coef_[0, 0], 1), "acc": r(100 * accuracy_score(d3, lg.predict(b3)), 1),
}

# S4: un árbol vs bosque de 100 (pingüinos, 4 medidas)
tree = DecisionTreeClassifier(random_state=0).fit(Xtr, ytr)
forest = RandomForestClassifier(n_estimators=100, random_state=0).fit(Xtr, ytr)
imp = dict(zip(["pico largo", "pico grueso", "aleta", "peso"], forest.feature_importances_))
out["s4"] = {
    "acc_arbol": r(100 * accuracy_score(yte, tree.predict(Xte)), 1),
    "acc_bosque": r(100 * accuracy_score(yte, forest.predict(Xte)), 1),
    "errores_arbol": int((tree.predict(Xte) != yte).sum()), "errores_bosque": int((forest.predict(Xte) != yte).sum()),
    "n_test": len(yte), "importancia": {k: r(100 * v, 0) for k, v in sorted(imp.items(), key=lambda kv: -kv[1])},
}

# S5: fraude (ficticio, 1% fraude)
n = 10000
monto = rng.lognormal(6, 0.8, n); hora = rng.integers(0, 24, n)
fraude = (rng.random(n) < 0.01).astype(int)
monto[fraude == 1] *= rng.uniform(3, 8, fraude.sum()); hora[fraude == 1] = rng.choice([1, 2, 3, 4, 23], fraude.sum())
Xf = np.column_stack([np.log(monto), np.isin(hora, [0, 1, 2, 3, 4, 23]).astype(int)])
a5, b5, c5, d5 = train_test_split(Xf, fraude, test_size=0.3, random_state=0, stratify=fraude)
siempre_no = np.zeros_like(d5)
mf = LogisticRegression(class_weight="balanced").fit(a5, c5)
pf = mf.predict(b5)
cm = confusion_matrix(d5, pf)
out["s5"] = {
    "n_test": len(d5), "n_fraude": int(d5.sum()),
    "acc_tonto": r(100 * accuracy_score(d5, siempre_no), 1), "recall_tonto": 0.0,
    "acc_modelo": r(100 * accuracy_score(d5, pf), 1),
    "recall": r(100 * recall_score(d5, pf), 0), "precision": r(100 * precision_score(d5, pf), 0),
    "cm": cm.tolist(),
}

# S6: boosting — ventas de Café Datos (mismos datos sintéticos del tronco)
rng6 = np.random.default_rng(42); n6 = 200
temp = rng6.uniform(12, 34, n6); finde = (np.arange(n6) % 7 >= 5).astype(float); lluvia = (rng6.random(n6) < 0.25).astype(float)
ventas = 180 - 2.2 * temp + 70 * finde - 55 * lluvia + 25 * np.sin(temp / 4) * finde + rng6.normal(0, 12, n6)
X6 = np.column_stack([temp, finde, lluvia])
a6, b6, c6, d6 = train_test_split(X6, ventas, test_size=0.2, random_state=0)
gb = GradientBoostingRegressor(n_estimators=200, learning_rate=0.1, max_depth=2, random_state=0).fit(a6, c6)
etapas = {}
for i, pred in enumerate(gb.staged_predict(b6), 1):
    if i in (1, 5, 20, 100, 200): etapas[i] = r(mean_absolute_error(d6, pred))
out["s6"] = {"etapas": etapas, "curva": [[i, r(mean_absolute_error(d6, p))] for i, p in enumerate(gb.staged_predict(b6), 1) if i % 5 == 0 or i <= 5]}

# S7: red neuronal (pingüinos)
mlp = make_pipeline(StandardScaler(), MLPClassifier(hidden_layer_sizes=(16, 8), max_iter=600, random_state=0)).fit(Xtr, ytr)
net = mlp[-1]
params = sum(w.size for w in net.coefs_) + sum(bb.size for bb in net.intercepts_)
out["s7"] = {"acc": r(100 * accuracy_score(yte, mlp.predict(Xte)), 1), "params": int(params), "capas": [4, 16, 8, 3],
             "perdida": [r(l, 3) for l in net.loss_curve_[::max(1, len(net.loss_curve_) // 40)]], "epocas": len(net.loss_curve_)}

# S8: proyecto completo (pingüinos)
final = make_pipeline(StandardScaler(), RandomForestClassifier(n_estimators=100, random_state=0)).fit(Xtr, ytr)
nuevo8 = [[50.0, 15.0, 220.0, 5400.0]]
out["s8"] = {"n_crudo": len(peng_raw), "n_limpio": len(peng), "n_train": len(ytr), "n_test": len(yte),
             "acc": r(100 * accuracy_score(yte, final.predict(Xte)), 1), "nuevo": nuevo8[0], "pred": str(final.predict(nuevo8)[0]),
             "prob": r(100 * final.predict_proba(nuevo8).max(), 0)}

os.makedirs(os.path.join(ROOT, "src", "datos"), exist_ok=True)
json.dump(out, open(os.path.join(ROOT, "src", "datos", "ml_sup.json"), "w"), indent=1, ensure_ascii=False)
for k, v in out.items():
    print(k, {kk: vv for kk, vv in v.items() if kk not in ("puntos", "curva", "perdida")})
