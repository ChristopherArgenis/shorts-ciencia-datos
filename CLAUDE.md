# Reglas del proyecto

## Todo gratuito (regla del dueño del canal)
- Solo herramientas 100 % gratuitas. Si una herramienta tiene cualquier costo, aunque sea mínimo
  u oculto (créditos, plan de pago, API con cobro, prueba gratis que luego cobra), NO se usa.
  Si hay duda, preguntar antes.
- Ya aprobadas: Remotion (gratis para 1 persona), Kokoro TTS local (voz `em_alex`),
  Whisper local (faster-whisper / `hyperframes transcribe`), `hyperframes remove-background`
  (local), ffmpeg, Python (numpy/scipy, scikit-learn).
- Skills de motion graphics (iart-ai, MIT): `tiktok-video-skills`, `explainer-video-skills`,
  `data-animation-skills`. Sin sus alternativas de pago (transcripción en la nube, After Effects).
- No usar: ElevenLabs, HeyGen, `hyperframes cloud`/`lambda`, Remotion Lambda, ni servicios de pago.

## Formato de los Shorts
- Vertical 1080×1920, ~30 s, sin cara. Voz: Alex (Kokoro), solo frases clave.
- Datos reales con fuente en pantalla; ejemplos ilustrativos marcados como "Ejemplo simplificado".

## Retención (datos de YouTube Studio, nov 2026)
Promedio "Se quedaron viendo": 23.7 %. Meta: >70 %. Porcentaje medio visto: 35–45 %. Meta: >80 %.
Mejor caso: StatsBomb (57.8 %), que abría con un número grande y una cancha llenándose desde el cuadro 0.
- Cuadro 0 lleno: nada de textos que entran desde opacidad 0. El primer cuadro ya muestra el dato
  contraintuitivo o la imagen que lo prueba.
- Prohibido abrir con definición, presentación del concepto, etiqueta de serie grande o pausa de "reto".
  El reto, si existe, va dentro del gancho, no como escena aparte.
- Estructura: resultado sorprendente → por qué → giro. Nunca definición → funcionamiento → ejemplo.
- 20–30 s máximo. Una sola idea.
- Cierre en bucle: la última frase completa la primera. Sin "síguenos", "fin" ni avance de la siguiente parte.
- Títulos de curiosidad, no de tema: "Por qué casi todo mide lo mismo (y tú eres el raro)",
  no "Distribución normal | Mates #3". El linter de títulos mide forma, no curiosidad.

## Entrega de cada video nuevo
Al terminar cada video, entregar SIEMPRE en el chat, listo para copiar a YouTube:
- **Título** (≤ 60 caracteres, verificado con `yt-package/title.py`)
- **Descripción** (las 2 primeras líneas dicen qué da el video, con las palabras que la gente busca)
- **#** (3 a 5 hashtags relevantes + #shorts; YouTube muestra los 3 primeros sobre el título)
- **Miniatura** PNG 1080×1920: máximo 3 palabras, distintas al título, legible al tamaño del feed.
  Se hace como `<Still>` en `src/miniaturas/Miniaturas.tsx` y se exporta con
  `npx remotion still <id> out/miniaturas/<id>.png`.
Y agregarlo también a `PUBLICAR.md`.
