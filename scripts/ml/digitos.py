"""Datos reales para el Short "Para una IA, este 7 son solo 64 números".

    python3 scripts/ml/digitos.py   ->  src/datos/digitos.json

Conjunto Digits (UCI, incluido en scikit-learn): imágenes de 8 × 8 con valores de 0 a 16.
Regresión logística, 75 % para entrenar y 25 % para el examen (estratificado, semilla 0).
"""
import json, os
import numpy as np
from sklearn.datasets import load_digits
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..")
d = load_digits()
idx = np.arange(len(d.target))
Xtr, Xte, ytr, yte, itr, ite = train_test_split(
    d.data, d.target, idx, test_size=0.25, random_state=0, stratify=d.target)
m = LogisticRegression(max_iter=5000).fit(Xtr, ytr)
pred = m.predict(Xte)
ok = pred == yte

# Un 7 del examen que el modelo acierta (el más "típico": mayor probabilidad).
p7 = m.predict_proba(Xte)[:, 7]
cand = np.where((yte == 7) & ok)[0]
siete = cand[np.argmax(p7[cand])]
# Un error para mostrar.
err = np.where(~ok)[0][0]
# Ejemplos de entrenamiento (para la lluvia de dígitos).
rng = np.random.default_rng(1)
muestra = rng.choice(len(ytr), 40, replace=False)

out = {
    "n_train": int(len(ytr)), "n_test": int(len(yte)),
    "aciertos": int(ok.sum()), "errores": int((~ok).sum()),
    "exactitud": round(float(ok.mean()) * 100, 1),
    "siete": Xte[siete].astype(int).tolist(),
    "prob_siete": round(float(p7[siete]) * 100, 1),
    "pesos7": np.round(m.coef_[7], 3).tolist(),
    "error": {"img": Xte[err].astype(int).tolist(), "real": int(yte[err]), "dijo": int(pred[err])},
    "ejemplos": [{"img": Xtr[i].astype(int).tolist(), "y": int(ytr[i])} for i in muestra],
    "examen_ok": ok.astype(int).tolist(),
}
json.dump(out, open(os.path.join(ROOT, "src", "datos", "digitos.json"), "w"))
print({k: out[k] for k in ["n_train", "n_test", "aciertos", "errores", "exactitud", "prob_siete"]}, out["error"]["real"], out["error"]["dijo"])
