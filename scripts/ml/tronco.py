"""Entrena los modelos del tronco común de Aprendizaje Automático y guarda los números reales
en src/datos/ml_tronco.json. Datos sintéticos de Café Datos (ficticio), semilla fija.
    pip install scikit-learn numpy
    python3 scripts/ml/tronco.py
"""
import json, os
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.preprocessing import PolynomialFeatures
from sklearn.pipeline import make_pipeline
from sklearn.metrics import mean_absolute_error

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..")
rng = np.random.default_rng(42)
out = {}

# --- Café Datos: 200 días ficticios ---
n = 200
temp = rng.uniform(12, 34, n)              # °C
finde = (np.arange(n) % 7 >= 5).astype(float)
lluvia = (rng.random(n) < 0.25).astype(float)
ventas = 180 - 2.2 * temp + 70 * finde - 55 * lluvia + rng.normal(0, 12, n)  # tazas al día

X = np.column_stack([temp, finde, lluvia])
Xtr, Xte, ytr, yte = train_test_split(X, ventas, test_size=0.2, random_state=0)
m = LinearRegression().fit(Xtr, ytr)
out["p1"] = {
    "n": n, "n_train": len(ytr), "n_test": len(yte),
    "mae_train": round(mean_absolute_error(ytr, m.predict(Xtr)), 1),
    "mae_test": round(mean_absolute_error(yte, m.predict(Xte)), 1),
    # "trampa": evaluar con los mismos datos de entrenamiento
}
# ejemplos de prueba: real vs predicho
ej = [(round(float(r)), round(float(p))) for r, p in zip(yte[:4], m.predict(Xte[:4]))]
out["p1"]["ejemplos"] = ej

# --- Sobreajuste: ventas por hora (10 puntos de entrenamiento, 8 de prueba), semilla 1 ---
r2 = np.random.default_rng(1)
curva = lambda x: 40 + 30 * np.sin((x - 7) / 14 * np.pi) + 15 * np.exp(-((x - 9) ** 2) / 2)
esc = lambda x: ((np.asarray(x) - 14) / 7).reshape(-1, 1)
htr = np.sort(r2.uniform(7, 21, 10)); yhtr = curva(htr) + r2.normal(0, 7, 10)
hte = np.sort(r2.uniform(7.5, 20.5, 8)); yhte = curva(hte) + r2.normal(0, 7, 8)
grados = {}
for g in [1, 3, 9]:
    mod = make_pipeline(PolynomialFeatures(g), LinearRegression()).fit(esc(htr), yhtr)
    xs = np.linspace(7, 21, 120)
    ys = mod.predict(esc(xs))
    grados[g] = {
        "mae_train": round(mean_absolute_error(yhtr, mod.predict(esc(htr))), 1),
        "mae_test": round(mean_absolute_error(yhte, mod.predict(esc(hte))), 1),
        "curva": [[round(float(a), 2), round(float(b), 1)] for a, b in zip(xs, np.clip(ys, -30, 130))],
    }
out["p2"] = {
    "train": [[round(float(a), 2), round(float(b), 1)] for a, b in zip(htr, yhtr)],
    "test": [[round(float(a), 2), round(float(b), 1)] for a, b in zip(hte, yhte)],
    "grados": grados,
}

# --- Variables: con y sin lluvia ---
sin = LinearRegression().fit(Xtr[:, :2], ytr)
con = m
out["p3"] = {
    "mae_sin_lluvia": round(mean_absolute_error(yte, sin.predict(Xte[:, :2])), 1),
    "mae_con_lluvia": round(mean_absolute_error(yte, con.predict(Xte)), 1),
    "coef": {"temp": round(float(con.coef_[0]), 1), "finde": round(float(con.coef_[1]), 1), "lluvia": round(float(con.coef_[2]), 1)},
}
os.makedirs(os.path.join(ROOT, "src", "datos"), exist_ok=True)
json.dump(out, open(os.path.join(ROOT, "src", "datos", "ml_tronco.json"), "w"), indent=1)
print(out['p1']); print(out['p3'])
for g, v in grados.items(): print(g, v['mae_train'], v['mae_test'])
