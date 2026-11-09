"""Modelos de la rama No supervisado y el Gran Final → src/datos/ml_nosup.json.
Pingüinos de Palmer (reales). Café Datos, lunas y transacciones: sintéticos ficticios, semilla fija.
    pip install scikit-learn numpy pandas palmerpenguins
"""
import json, os, itertools
import numpy as np
from palmerpenguins import load_penguins
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans, DBSCAN
from sklearn.decomposition import PCA
from sklearn.ensemble import IsolationForest
from sklearn.datasets import make_moons
from sklearn.metrics import adjusted_rand_score, silhouette_score

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..")
r = lambda x, d=1: round(float(x), d)
out = {}

NUM = ["bill_length_mm", "bill_depth_mm", "flipper_length_mm", "body_mass_g"]
peng = load_penguins().dropna(subset=NUM + ["sex"])
Xp = StandardScaler().fit_transform(peng[NUM].values)
esp = peng["species"].values

# U1: pingüinos sin etiquetas → 3 grupos
km_p = KMeans(3, n_init=20, random_state=0).fit(Xp)
out["u1"] = {"puntos": [[r(a), r(b), int(g)] for (a, b), g in zip(peng[["bill_length_mm", "bill_depth_mm"]].values, km_p.labels_)], "n": len(peng)}

# U2/U3: clientes de Café Datos (visitas al mes, ticket promedio)
rng = np.random.default_rng(7)
seg = [(3, 55, 70), (12, 60, 60), (6, 140, 50)]  # ocasionales, frecuentes, "gourmet"
cl = np.vstack([np.column_stack([rng.normal(v, 1.4, n), rng.normal(t, 12, n)]) for v, t, n in seg])
cl[:, 0] = np.clip(cl[:, 0], 0.5, None)
sc = StandardScaler().fit(cl); Z = sc.transform(cl)
# K-means paso a paso (para animar los centros)
c = Z[[5, 80, 150]].copy() + np.array([[0.8, 0.9], [-0.9, -0.2], [0.6, -1.4]])
hist = []
for _ in range(8):
    lab = np.argmin(((Z[:, None, :] - c[None]) ** 2).sum(2), 1)
    hist.append({"centros": [[r(a), r(b)] for a, b in sc.inverse_transform(c)], "lab": lab.tolist()})
    c = np.array([Z[lab == k].mean(0) for k in range(3)])
km_c = KMeans(3, n_init=20, random_state=0).fit(Z)
centros = sc.inverse_transform(km_c.cluster_centers_)
out["u2"] = {"puntos": [[r(a), r(b)] for a, b in cl], "pasos": hist,
             "centros": [[r(a), r(b)] for a, b in centros], "tam": np.bincount(km_c.labels_).tolist()}
inercias = {k: r(KMeans(k, n_init=20, random_state=0).fit(Z).inertia_, 0) for k in range(1, 9)}
sil = {k: r(silhouette_score(Z, KMeans(k, n_init=20, random_state=0).fit_predict(Z)), 2) for k in range(2, 9)}
out["u3"] = {"inercia": inercias, "silueta": sil}

# U4: lunas — k-means falla, DBSCAN acierta
Xm, ym = make_moons(300, noise=0.06, random_state=0)
km_m = KMeans(2, n_init=20, random_state=0).fit_predict(Xm)
db = DBSCAN(eps=0.2, min_samples=5).fit_predict(Xm)
out["u4"] = {"puntos": [[r(a, 2), r(b, 2)] for a, b in Xm], "km": km_m.tolist(), "db": db.tolist(),
             "ari_km": r(100 * adjusted_rand_score(ym, km_m), 0), "ari_db": r(100 * adjusted_rand_score(ym, db), 0)}

# U5: PCA pingüinos 4 → 2
pca = PCA(2).fit(Xp); P2 = pca.transform(Xp)
out["u5"] = {"puntos": [[r(a, 2), r(b, 2), s] for (a, b), s in zip(P2, esp)], "var": [r(100 * v, 0) for v in pca.explained_variance_ratio_],
             "var_total": r(100 * pca.explained_variance_ratio_.sum(), 0)}

# U6: anomalías en transacciones (sin etiquetas)
n = 2000
monto = rng.lognormal(5.5, 0.5, n); hora = rng.normal(14, 3.5, n)
anom_idx = rng.choice(n, 12, replace=False)
monto[anom_idx] = rng.uniform(4000, 15000, 12); hora[anom_idx] = rng.uniform(1, 5, 12)
Xa = np.column_stack([np.log(monto), hora])
iso = IsolationForest(contamination=0.01, random_state=0).fit(Xa)
flag = iso.predict(Xa) == -1
verdad = np.zeros(n, bool); verdad[anom_idx] = True
out["u6"] = {"n": n, "n_anom": 12, "marcadas": int(flag.sum()), "atrapadas": int((flag & verdad).sum()),
             "puntos": [[r(np.log10(m), 2), r(h, 1), int(f)] for m, h, f in zip(monto[::4], hora[::4], flag[::4])] + [[r(np.log10(monto[i]), 2), r(hora[i], 1), int(flag[i])] for i in anom_idx]}

# U7: reglas de asociación — tickets de Café Datos
prods = ["latte", "americano", "pan dulce", "galleta", "té"]
tickets = []
for _ in range(1000):
    t = set()
    if rng.random() < 0.45: t.add("latte")
    if rng.random() < 0.30: t.add("americano")
    if rng.random() < 0.15: t.add("té")
    p_pan = 0.55 if "latte" in t else 0.15
    if rng.random() < p_pan: t.add("pan dulce")
    if rng.random() < (0.35 if "americano" in t else 0.10): t.add("galleta")
    if not t: t.add("americano")
    tickets.append(t)
N = len(tickets)
sup = lambda s: sum(1 for t in tickets if s <= t) / N
reglas = []
for a, b in itertools.permutations(prods, 2):
    s_ab = sup({a, b}); s_a = sup({a})
    if s_ab > 0.05:
        reglas.append({"si": a, "entonces": b, "soporte": r(100 * s_ab), "confianza": r(100 * s_ab / s_a), "lift": r(s_ab / (s_a * sup({b})), 2)})
reglas.sort(key=lambda x: -x["lift"])
out["u7"] = {"n": N, "reglas": reglas[:4], "sup_latte": r(100 * sup({"latte"})), "sup_pan": r(100 * sup({"pan dulce"}))}

# Gran Final: grupos sin etiquetas vs especies reales
import pandas as pd
tab = pd.crosstab(km_p.labels_, esp)
mapa = tab.idxmax(axis=1).to_dict()
acierto = np.mean([mapa[g] == s for g, s in zip(km_p.labels_, esp)])
out["final"] = {"tabla": {int(g): {k: int(v) for k, v in fila.items()} for g, fila in tab.iterrows()},
                "mapa": {int(k): v for k, v in mapa.items()}, "coincide": r(100 * acierto, 1),
                "ari": r(100 * adjusted_rand_score(esp, km_p.labels_), 0), "sup_acc": 97.6}

json.dump(out, open(os.path.join(ROOT, "src", "datos", "ml_nosup.json"), "w"), indent=1, ensure_ascii=False)
print("u2 centros", out["u2"]["centros"], out["u2"]["tam"])
print("u3", out["u3"])
print("u4", out["u4"]["ari_km"], out["u4"]["ari_db"])
print("u5", out["u5"]["var"], out["u5"]["var_total"])
print("u6", {k: v for k, v in out["u6"].items() if k != "puntos"})
print("u7", out["u7"]["reglas"], out["u7"]["sup_latte"], out["u7"]["sup_pan"])
print("final", out["final"])
