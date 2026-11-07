# Reglas del proyecto

## Todo gratuito (regla del dueño del canal)
- Solo herramientas 100 % gratuitas. Si una herramienta tiene cualquier costo, aunque sea mínimo
  u oculto (créditos, plan de pago, API con cobro, prueba gratis que luego cobra), NO se usa.
  Si hay duda, preguntar antes.
- Ya aprobadas: Remotion (gratis para 1 persona), Kokoro TTS local (voz `em_alex`),
  Whisper local (faster-whisper / `hyperframes transcribe`), `hyperframes remove-background`
  (local), ffmpeg, Python (numpy/scipy).
- Skills de motion graphics (iart-ai, MIT): `tiktok-video-skills`, `explainer-video-skills`,
  `data-animation-skills`. Sin sus alternativas de pago (transcripción en la nube, After Effects).
- No usar: ElevenLabs, HeyGen, `hyperframes cloud`/`lambda`, Remotion Lambda, ni servicios de pago.

## Formato de los Shorts
- Vertical 1080×1920, ~30 s, sin cara. Voz: Alex (Kokoro), solo frases clave.
- Datos reales con fuente en pantalla; ejemplos ilustrativos marcados como "Ejemplo simplificado".

## Entrega de cada video nuevo
Al terminar cada video, entregar SIEMPRE en el chat, listo para copiar a YouTube:
- **Título** (≤ 60 caracteres, verificado con `yt-package/title.py`)
- **Descripción** (las 2 primeras líneas dicen qué da el video, con las palabras que la gente busca)
- **#** (3 a 5 hashtags relevantes + #shorts; YouTube muestra los 3 primeros sobre el título)
- **Miniatura** PNG 1080×1920: máximo 3 palabras, distintas al título, legible al tamaño del feed.
  Se hace como `<Still>` en `src/miniaturas/Miniaturas.tsx` y se exporta con
  `npx remotion still <id> out/miniaturas/<id>.png`.
Y agregarlo también a `PUBLICAR.md`.
