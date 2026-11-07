"""Genera la narración de Alex (Kokoro, local y gratis) para cada Short.

    python3 scripts/make_voice.py            # todas
    python3 scripts/make_voice.py f1         # solo un Short

Lee scripts/voz.json y escribe public/voz/<short>/<id>.wav más
src/voz-duraciones.json (segundos de cada frase, para bajar la música).
Requiere: pip install kokoro-onnx soundfile numpy, y ffmpeg.
Modelo: busca kokoro-v1.0.onnx y voices-v1.0.bin en $KOKORO_DIR,
~/.cache/hyperframes/tts o ./models. Descarga:
https://github.com/thewh1teagle/kokoro-onnx/releases/tag/model-files-v1.0
"""
import json, os, subprocess, sys
import soundfile as sf
from kokoro_onnx import Kokoro

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
VOZ = "em_alex"
VELOCIDAD = 0.88  # más lento = menos robótico
# Ecualización suave: quita aspereza y da algo de calidez.
FILTRO = ("highpass=f=70,equalizer=f=220:t=q:w=1:g=2,equalizer=f=3500:t=q:w=1.5:g=-2.5,"
          "highshelf=f=7000:g=-4,acompressor=threshold=-20dB:ratio=2.5:attack=10:release=150,"
          "aecho=0.8:0.5:35:0.12,loudnorm=I=-16:TP=-1.5")

def modelo():
    for d in [os.environ.get("KOKORO_DIR", ""), os.path.expanduser("~/.cache/hyperframes/tts"),
              os.path.join(ROOT, "models")]:
        for sub in ("", "models"):
            m = os.path.join(d, sub, "kokoro-v1.0.onnx")
            v = os.path.join(d, "voices", "voices-v1.0.bin") if sub == "models" else os.path.join(d, "voices-v1.0.bin")
            if d and os.path.exists(m) and os.path.exists(v):
                return m, v
    sys.exit("No encuentro el modelo de Kokoro. Lee la cabecera de este script.")

def main():
    lineas = json.load(open(os.path.join(ROOT, "scripts", "voz.json"), encoding="utf-8"))
    pedir = sys.argv[1:] or [k for k in lineas if not k.startswith("_")]
    k = Kokoro(*modelo())
    dur_path = os.path.join(ROOT, "src", "voz-duraciones.json")
    dur = json.load(open(dur_path)) if os.path.exists(dur_path) else {}
    for short in pedir:
        carpeta = os.path.join(ROOT, "public", "voz", short)
        os.makedirs(carpeta, exist_ok=True)
        dur[short] = {}
        for id_, texto in lineas[short].items():
            s, sr = k.create(texto, voice=VOZ, speed=VELOCIDAD, lang="es")
            crudo = os.path.join(carpeta, id_ + ".raw.wav")
            final = os.path.join(carpeta, id_ + ".wav")
            sf.write(crudo, s, sr)
            subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", crudo, "-af", FILTRO, "-ar", "44100", final], check=True)
            os.remove(crudo)
            info = sf.info(final)
            dur[short][id_] = round(info.frames / info.samplerate, 3)
            print(f"{short}/{id_}: {dur[short][id_]:.2f}s  {texto}")
    json.dump(dur, open(dur_path, "w"), indent=1, ensure_ascii=False)

if __name__ == "__main__":
    main()
