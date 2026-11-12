# Shorts de Ciencia de Datos (@UniversoCienciaDatos)

Este repositorio se hizo con el fin de hacer Shorts para YouTube sobre Ciencia de Datos.

Shorts verticales (1080×1920, 30 s) sin cara, hechos con [Remotion](https://remotion.dev).

## Shorts
| ID | Tema |
| --- | --- |
| `Short1-Cumpleanos` | Paradoja del cumpleaños |
| `Short2-Simpson` | Paradoja de Simpson (datos: Charig et al., BMJ 1986) |
| `Short3-Recomendador` | ¿Cómo sabe Netflix qué vas a ver? (filtrado colaborativo) |
| `Short4-F1` | El undercut en la F1 (datos de sensores: AWS / Fórmula 1) |
| `Short5-ComoFuncionaClaude` | Cómo funciona Claude desde cero: tokens, atención y predicción (~40 s) |
| `Mates1-Mediana` … `Mates8-Gradiente` | Serie "Mates de científico de datos" partes 1–8 (`src/shorts/serie/`, plantilla en `src/kit/serie.tsx`) |
| `Algo1-Arreglos` … `Algo10-Dinamica` | Serie "Estructuras de Datos y Algoritmos" partes 1–10 (`src/shorts/algoritmos/`) |
| `Prac1-Ciclo` … `Prac10-Comunicar` | Serie "Programación en Ciencia de Datos" partes 1–10 (`src/shorts/practica/`, caso ficticio Café Datos) |
| `ML0-Aprender` … `ML3-Variables` | Serie "Aprendizaje Automático": tronco común 0–3 (`src/shorts/ml/`, mapa de metro en `src/kit/ml.tsx`, números de `scripts/ml/tronco.py`) |
| `SUP1-Tipos` … `SUP8-Proyecto` | Aprendizaje Automático › rama Supervisado 1–8 (`src/shorts/sup/`, números de `scripts/ml/supervisado.py`, pingüinos de Palmer) |
| `NOS1-Grupos` … `NOS7-Asociacion`, `ML-GranFinal` | Aprendizaje Automático › rama No supervisado 1–7 y Gran Final (`src/shorts/nos/`, números de `scripts/ml/nosupervisado.py`) |
| `Short7-SimpsonFutbol`, `Short8-ParadaF1`, `Short9-Matriz`, `Short10-ImagenNumeros` | Sueltos: Simpson en fútbol, parada en F1 con probabilidad, recomendaciones con matrices, una imagen son 6 millones de números (`src/shorts/sueltos/`) |
| `Vision6-Caras` | Serie cómo ve una computadora: tu celular ve restas (`src/shorts/vision/`) |
| `Vision5-Borroso` | Serie cómo ve una computadora: desenfocar es sacar promedios (`src/shorts/vision/`) |
| `Vision4-Verde` | Serie cómo ve una computadora: la pantalla verde es una pregunta (`src/shorts/vision/`) |
| `Vision3-Brillo` | Serie cómo ve una computadora: subir el brillo borra tu foto (`src/shorts/vision/`) |
| `Vision2-Amarillo` | Serie cómo ve una computadora: el amarillo de tu pantalla no existe (`src/shorts/vision/`, kit `src/kit/corto.tsx`) |
| `Short6-StatsBomb` | StatsBomb: datos de eventos, 360, xG y cómo los usan los analistas (~38 s) |

## Uso
```bash
npm i
npm run dev                                   # vista previa en Remotion Studio
npx remotion render Short1-Cumpleanos out/Short1-Cumpleanos.mp4
python3 scripts/make_audio.py                 # regenera música y efectos (requiere numpy)
python3 scripts/make_voice.py f1              # voz de Alex (Kokoro) desde scripts/voz.json
```

- `src/kit/` plantilla compartida (fondo, texto animado, contadores, sonidos).
- `src/shorts/` un archivo por Short.
- `src/miniaturas/` miniaturas (1080×1920): `npx remotion still Mini1-Cumpleanos out/miniaturas/Mini1-Cumpleanos.png`
- `public/` música y efectos originales generados por código, y fuentes locales.
- `scripts/voz.json` frases de narración; `src/kit/voz.tsx` coloca la voz y baja la música.
- `PUBLICAR.md` títulos, descripciones, hashtags y plan semanal.

Fuera de este sandbox, borra la línea `Config.setBrowserExecutable(...)` de `remotion.config.ts`
(Remotion descarga su propio navegador).
