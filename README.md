# Shorts de Ciencia de Datos (@UniversoCienciaDatos)

Este repositorio se hizo con el fin de hacer Shorts para YouTube sobre Ciencia de Datos.

Shorts verticales (1080×1920, 30 s) sin cara, hechos con [Remotion](https://remotion.dev).

## Shorts
| ID | Tema |
| --- | --- |
| `Short1-Cumpleanos` | Paradoja del cumpleaños |
| `Short2-Simpson` | Paradoja de Simpson (datos: Charig et al., BMJ 1986) |
| `Short3-Recomendador` | ¿Cómo sabe Netflix qué vas a ver? (filtrado colaborativo) |

## Uso
```bash
npm i
npm run dev                                   # vista previa en Remotion Studio
npx remotion render Short1-Cumpleanos out/Short1-Cumpleanos.mp4
python3 scripts/make_audio.py                 # regenera música y efectos (requiere numpy)
```

- `src/kit/` plantilla compartida (fondo, texto animado, contadores, sonidos).
- `src/shorts/` un archivo por Short.
- `public/` música y efectos originales generados por código, y fuentes locales.
- `PUBLICAR.md` títulos, descripciones, hashtags y plan semanal.

Fuera de este sandbox, borra la línea `Config.setBrowserExecutable(...)` de `remotion.config.ts`
(Remotion descarga su propio navegador).
