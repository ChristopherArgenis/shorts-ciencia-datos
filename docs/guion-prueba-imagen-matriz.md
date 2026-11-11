# Guion de prueba: "¿Una imagen es una matriz de números?"

Primer Short hecho con las reglas de retención de YouTube Studio (ver `CLAUDE.md`).

## La pregunta, reescrita
| Antes (tema) | Después (curiosidad) |
|---|---|
| ¿Una imagen es una matriz de números? | **Esto que ves son 6 millones de números** |

Por qué: no pregunta ni define. Afirma algo que parece falso sobre lo que la persona está mirando *en ese instante*.
El dato es real: un Short mide 1080 × 1920 = 2,073,600 píxeles × 3 colores = **6,220,800 números por cuadro**.

## Ficha
- **Duración:** ~25 s · una sola idea
- **Sin:** etiqueta de serie, escena de reto, saludo, "síguenos" ni avance
- **Imagen:** balón de fútbol en pixel art propio (16 × 16), sin derechos de terceros
- **Voz:** Alex, frases cortas
- **Bucle:** la última frase deja una multiplicación sin terminar; el primer cuadro da el resultado

## Guion

| Tiempo | Voz (Alex) | En pantalla (cuadro 0 ya lleno) |
|---|---|---|
| 0–2 s | "Esto que ves ahora mismo son seis millones de números." | **Cuadro 0:** el balón ya dibujado; la mitad derecha ya convertida en números; "6,220,800" grande arriba |
| 2–7 s | "Acércate: cada cuadrito es un píxel. Y cada píxel, un número del cero al doscientos cincuenta y cinco." | Zoom rápido al balón hasta ver un solo píxel con su número |
| 7–12 s | "Cero es negro. Doscientos cincuenta y cinco, blanco. Una foto en gris es solo una tabla: una matriz." | Imagen y su matriz 8 × 8 lado a lado; al tocar una celda se ilumina su píxel |
| 12–17 s | "En color son tres tablas: rojo, verde y azul. Tres números por píxel." | Las tres capas R, G, B se separan en 3D y vuelven a juntarse |
| 17–22 s | "Por eso un filtro es pura resta: doscientos cincuenta y cinco menos cada número… y la foto se invierte." | Se aplica `255 − x` en vivo: el balón se vuelve negativo |
| 22–25 s | "Ahora multiplica: mil ochenta, por mil novecientos veinte, por tres colores…" | Multiplicación escribiéndose en pantalla, sin resultado → el bucle lleva al cuadro 0 con "6,220,800" |

**Código opcional en pantalla (2 s, en el segundo 17–22):**
```python
from PIL import Image; import numpy as np
foto = np.array(Image.open("balon.png"))  # (alto, ancho, 3)
negativo = 255 - foto
```

## Publicación
**Título** (alternativas: "Así ve una IA tu foto: 6 millones de números", "Tu pantalla te miente: son solo números")
```
Esto que ves son 6 millones de números
```
**Descripción**
```
Un Short vertical mide 1080 × 1920 píxeles. Cada píxel guarda 3 números (rojo, verde y azul) del 0 al 255: 6,220,800 números en cada cuadro. Una imagen es una matriz, y por eso un filtro es pura matemática: 255 menos cada número invierte la foto.
```
**#**
```
#cienciadedatos #python #inteligenciaartificial #matematicas #shorts
```
**Miniatura:** balón mitad imagen, mitad números + "6,220,800"

## Qué medir en YouTube Studio
- **Se quedaron viendo:** meta > 50 % (canal hoy: 23.7 %; StatsBomb: 57.8 %)
- **Porcentaje medio visto:** meta > 80 % o > 100 % si hay bucle
- Si funciona, este formato reemplaza a la plantilla de serie actual.
