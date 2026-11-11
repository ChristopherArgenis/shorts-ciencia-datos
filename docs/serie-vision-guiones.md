# Serie: cómo ve una computadora (visión por computadora)

Lista de reproducción, de lo básico a la IA. **En los videos no aparece número ni nombre de serie**:
cada Short se sostiene solo y el orden lo da la lista.

Todos siguen la plantilla de `CLAUDE.md`:
- **Primera frase:** premisa lógica + dato que la contradice.
- **Ritmo:** 0–3 s enigma · 4–10 s por qué falla la intuición · 11–18 s giro · 19–28 s revelación.
- **Voz:** máximo ~55 palabras, unas 2 por segundo. Nunca más de 4 s sin un cambio en pantalla.
- **Bucle:** la última frase se completa con la primera.

Cada video retoma la idea del anterior ("todo son números"), así que la lista engancha de uno a otro sin anunciar el siguiente.

## Orden de la lista

| # | Título | Idea única | Dato real |
|---|---|---|---|
| 1 | Esto que ves son 6 millones de números ✅ | Imagen = matriz | 1080×1920×3 = 6,220,800 |
| 2 | El amarillo de tu pantalla no existe | Color = 3 luces | 256³ = 16,777,216 colores |
| 3 | Subir el brillo borra tu foto para siempre | Brillo = suma, tope en 255 | 220 + 50 → 255 |
| 4 | La pantalla verde es una sola línea de código | Umbral / máscara | `G > R + B` |
| 5 | Desenfocar una foto es sacar promedios | Convolución 3×3 | promedio de 9 vecinos |
| 6 | Tu celular no ve caras: ve restas | Bordes y rasgos | Viola y Jones (2001) |
| 7 | Este video tiene la mitad del color que crees | Compresión 4:2:0 | 6,220,800 → 3,110,400 |
| 8 | La IA tira el 97 % de tu foto (y acierta) | Entrada 224×224 | 150,528 de 6,220,800 = 2.4 % |
| 9 | Para una IA, este 7 son solo 64 números | Clasificar con ejemplos | 431 de 450 = 95.8 % (scikit-learn) |
| 10 | Un ruido invisible engaña a la IA al 99 % | Ejemplo adversario | panda 57.7 % → gibón 99.3 % (Goodfellow et al., 2015) |

Números verificados con Python en este repo:
- **#9:** `load_digits` y regresión logística. Se usan 1,347 imágenes para entrenar y 450 para el examen, y falla 19.
- **#8:** 1 − 150,528 / 6,220,800 = 97.6 %.
- **#7:** 2,073,600 + 2 × 518,400 = 3,110,400.

Todas las imágenes son pixel art propio: balón, personaje, perro, dígito y panda.

---

## 2 · El amarillo de tu pantalla no existe
**Bucle:** "…Y ese amarillo" → "no existe en tu pantalla."

| Tiempo | Voz (Alex) | En pantalla |
|---|---|---|
| 0:00–0:03 | "Ese amarillo no existe en tu pantalla." | **Cuadro 0:** cuadro amarillo enorme y una lupa ya encima que muestra solo rayitas rojas y verdes |
| 0:03–0:07 | "Crees que hay una lucecita de cada color." | Paleta de 12 colores con un foco encima de cada uno (lo que imaginamos) y una ✗ |
| 0:07–0:10 | "Solo hay tres: roja, verde y azul." | Zoom al píxel: 3 tiras R, G y B encendidas |
| 0:10–0:14 | "Roja y verde a tope, azul en cero…" | Tres deslizadores: R=255, G=255, B=0 |
| 0:14–0:18 | "…y tu ojo se inventa el amarillo." | Dos círculos de luz se cruzan; la zona común se vuelve amarilla y aparece la etiqueta "tu cerebro" |
| 0:18–0:23 | "Doscientos cincuenta y seis, por doscientos cincuenta y seis, por doscientos cincuenta y seis…" | Multiplicación que se escribe término a término |
| 0:23–0:27 | "Dieciséis millones de colores, de solo tres luces. Y ese amarillo…" | Contador hasta **16,777,216** y el amarillo vuelve a llenar la pantalla |

- **Miniatura:** "SOLO 3 LUCES"
- **#:** `#cienciadedatos #vision #colores #python #shorts`
- **Descripción:** Tu pantalla no tiene luz amarilla: cada píxel solo tiene luz roja, verde y azul, cada una del 0 al 255. Rojo y verde a tope engañan a tu ojo. 256 × 256 × 256 = 16,777,216 colores salen de 3 números.

---

## 3 · Subir el brillo borra tu foto para siempre
**Bucle:** "…cuando subiste el brillo," → "borraste parte de tu foto para siempre."

| Tiempo | Voz | En pantalla |
|---|---|---|
| 0:00–0:03 | "Borraste parte de tu foto para siempre." | **Cuadro 0:** atardecer en pixel art: mitad normal, mitad con el cielo quemado en blanco y una ✗ roja |
| 0:03–0:07 | "Parece que solo la aclaras." | Deslizador de brillo subiendo; la foto se aclara |
| 0:07–0:11 | "Pero el brillo es una suma: más cincuenta a cada número." | Rejilla con números y "+50" que cae sobre cada celda |
| 0:11–0:15 | "La trampa: nada pasa de doscientos cincuenta y cinco." | Un 220 + 50 que debería dar 270 choca contra un techo y queda en **255** |
| 0:15–0:19 | "Nubes y cielo se vuelven el mismo número." | Celdas distintas (230, 241, 250) se vuelven todas 255 |
| 0:19–0:24 | "Y al bajar el brillo, ya no regresan." | Deslizador bajando: el cielo queda gris liso, sin nubes |
| 0:24–0:27 | "Porque cuando subiste el brillo…" | Código `np.clip(foto + 50, 0, 255)` y la foto quemada |

- **Miniatura:** "+50 = ADIÓS"
- **#:** `#cienciadedatos #python #fotografia #vision #shorts`
- **Descripción:** Subir el brillo es sumar a cada número de la imagen, pero ningún píxel pasa de 255: los tonos claros se vuelven el mismo blanco y esa información se pierde. Por eso bajar el brillo después no recupera las nubes. Ejemplo simplificado.

---

## 4 · La pantalla verde es una sola línea de código
**Bucle:** "…detrás de" → "la pantalla verde de las películas: una sola pregunta."

| Tiempo | Voz | En pantalla |
|---|---|---|
| 0:00–0:03 | "La pantalla verde de las películas es una sola pregunta." | **Cuadro 0:** personaje en pixel art; la mitad del fondo ya es verde y la otra mitad ya es espacio con estrellas |
| 0:03–0:07 | "Parece magia de cine." | Claqueta y destellos (corte rápido) |
| 0:07–0:11 | "Pero la computadora no ve a la persona. Solo ve números." | Zoom: tres píxeles con su terna (40, 200, 60), (220, 170, 140) y (30, 30, 90) |
| 0:11–0:15 | "La pregunta: ¿el verde gana a rojo y azul juntos?" | Código grande `G > R + B` |
| 0:15–0:19 | "Sí: se cambia por el fondo. No: es piel, ropa, persona." | Cada terna recibe ✓ o ✗; los píxeles marcados se vuelven estrellas |
| 0:19–0:23 | "Y se usa verde porque casi nada en la piel es tan verde." | Paleta de tonos de piel con su G comparado; ninguno pasa |
| 0:23–0:27 | "Dos millones de veces por cuadro. Eso es todo lo que hay detrás de…" | Barrido que cambia todo el fondo a una playa |

- **Miniatura:** "UN SOLO IF"
- **#:** `#cienciadedatos #python #cine #vision #shorts`
- **Descripción:** La pantalla verde funciona con una pregunta por píxel: si el verde es mayor que el rojo y el azul juntos, ese píxel se cambia por el fondo nuevo. Se usa verde porque casi no aparece en la piel. Ejemplo simplificado: el cine real además suaviza los bordes.

---

## 5 · Desenfocar una foto es sacar promedios
**Bucle:** "…en el fondo," → "desenfocar una foto es solo sacar promedios."

| Tiempo | Voz | En pantalla |
|---|---|---|
| 0:00–0:03 | "Desenfocar una foto es solo sacar promedios." | **Cuadro 0:** el balón: la mitad nítida y la mitad borrosa, con una ventanita de 3 × 3 ya sobre la frontera |
| 0:03–0:07 | "Parece que el celular la empaña." | Efecto de vaho sobre la lente y una ✗ |
| 0:07–0:11 | "En realidad, cada píxel se vuelve el promedio de sus nueve vecinos." | La ventana muestra 9 números; se suman, se dividen entre 9 y sale el nuevo valor |
| 0:11–0:15 | "Esa ventanita se llama filtro…" | La ventana se desliza por la imagen y la deja borrosa a su paso |
| 0:15–0:19 | "…y es la misma pieza que usa una IA para ver." | Etiqueta "red neuronal convolucional" con 3 ventanitas apiladas |
| 0:19–0:23 | "Cambia los números de la ventana… y en vez de borrar, afila." | La ventana pasa a [0, −1, 0 / −1, 5, −1 / 0, −1, 0] y la imagen se vuelve nítida |
| 0:23–0:27 | "Con nueves borra, con otros pesos afila. Porque en el fondo…" | Los dos resultados lado a lado |

- **Miniatura:** "÷ 9"
- **#:** `#cienciadedatos #python #inteligenciaartificial #vision #shorts`
- **Descripción:** El desenfoque reemplaza cada píxel por el promedio de sus 9 vecinos. Esa ventana de 3 × 3 se llama filtro (convolución), y cambiando sus números la misma operación afila la foto. Es la pieza base de las redes neuronales que ven imágenes.

---

## 6 · Tu celular no ve caras: ve restas
**Bucle:** "…aunque parezca que te mira," → "tu celular no ve tu cara: ve restas."

| Tiempo | Voz | En pantalla |
|---|---|---|
| 0:00–0:03 | "Tu celular no ve tu cara. Ve restas." | **Cuadro 0:** cara en pixel art a la izquierda y, a la derecha, solo sus bordes blancos sobre negro, con el cuadrito de detección ya puesto |
| 0:03–0:07 | "Crees que busca ojos y nariz." | Íconos de ojo y nariz con signo de pregunta |
| 0:07–0:11 | "Primero busca dónde cambian los números." | Fila de píxeles 30, 30, 30, 200, 200 con sus restas debajo: 0, 0, 170, 0 |
| 0:11–0:15 | "Donde la resta da cero, no hay nada. Donde salta, hay un borde." | Gráfica con un pico en el 170 que se ilumina |
| 0:15–0:20 | "Así detectaba caras el método de Viola y Jones, en 2001: zona clara menos zona oscura." | Rectángulos blanco/negro sobre los ojos (más oscuros que las mejillas) y el puente de la nariz |
| 0:20–0:24 | "Miles de restas en milisegundos… y aparece el cuadrito." | Cientos de rectángulos que barren la imagen y se quedan en la cara |
| 0:24–0:27 | "Y así, aunque parezca que te mira…" | La cara vuelve a verse solo como bordes |

- **Miniatura:** "CLARO − OSCURO"
- **#:** `#cienciadedatos #vision #inteligenciaartificial #python #shorts`
- **Descripción:** Para encontrar una cara, la computadora resta píxeles vecinos: donde la diferencia salta hay un borde. El método clásico de Viola y Jones (2001) detecta caras con restas de zonas claras y oscuras, como los ojos contra las mejillas. Fuente: Viola & Jones, CVPR 2001.

---

## 7 · Este video tiene la mitad del color que crees
**Bucle:** "…aunque no lo notes," → "este video tiene la mitad de los números que te dije."
Retoma el primer video: corrige su número con un dato nuevo.

| Tiempo | Voz | En pantalla |
|---|---|---|
| 0:00–0:03 | "Este video tiene la mitad de los números que te dije." | **Cuadro 0:** "6,220,800" tachado y "3,110,400" en grande |
| 0:03–0:07 | "Tu ojo nota mucho mejor la luz que el color." | La foto se separa en brillo (gris nítido) y color (manchas suaves) |
| 0:07–0:11 | "Y los videos lo aprovechan." | Logos genéricos de reproductor y la etiqueta "4:2:0" |
| 0:11–0:15 | "Guardan el brillo de cada píxel…" | La rejilla de brillo, una celda por píxel |
| 0:15–0:19 | "…pero un solo color por cada cuatro píxeles." | La rejilla de color en bloques de 2 × 2 |
| 0:19–0:24 | "Brillo completo, color en cuartos: la mitad de los datos." | 2,073,600 + 518,400 + 518,400 = **3,110,400** |
| 0:24–0:27 | "Y aunque no lo notes…" | Las dos versiones lado a lado, iguales a simple vista |

- **Miniatura:** "¿NOTAS ALGO?"
- **#:** `#cienciadedatos #video #youtube #vision #shorts`
- **Descripción:** Los videos usan submuestreo de color 4:2:0: guardan el brillo de cada píxel pero un solo color por cada bloque de 4, porque tu ojo distingue mejor la luz que el color. Un cuadro de 1080 × 1920 pasa de 6,220,800 a 3,110,400 números. Es el formato habitual de H.264, VP9 y AV1.

---

## 8 · La IA tira el 97 % de tu foto (y acierta)
**Bucle:** "…por eso, siempre," → "antes de mirarte, la IA tira el 97 % de tu foto."

| Tiempo | Voz | En pantalla |
|---|---|---|
| 0:00–0:03 | "Antes de mirarte, la IA tira el noventa y siete por ciento de tu foto." | **Cuadro 0:** foto grande que ya se encoge hasta un cuadrito, con "−97.6 %" en grande |
| 0:03–0:07 | "Pensarías que más píxeles es mejor." | Muchos megapíxeles y la flecha "mejor" con una ✗ |
| 0:07–0:11 | "Pero muchos modelos famosos solo miran doscientos veinticuatro por doscientos veinticuatro." | Cuadrado de 224 × 224 dentro del cuadro de 1080 × 1920, a escala real |
| 0:11–0:15 | "Y no es por flojera: con menos números aprende más rápido." | Barra de entrenamiento que se llena rápido junto a otra lenta |
| 0:15–0:19 | "Para saber si hay un perro, sobran." | Perro en pixel art cada vez más pixelado; sigue viéndose perro |
| 0:19–0:24 | "Seis millones entran. Ciento cincuenta mil se quedan." | 6,220,800 → 150,528 |
| 0:24–0:27 | "Por eso, siempre…" | El cuadrito vuelve a crecer hasta la foto |

- **Miniatura:** "224 × 224"
- **#:** `#inteligenciaartificial #cienciadedatos #deeplearning #vision #shorts`
- **Descripción:** Muchos modelos que clasifican imágenes, como ResNet, reciben fotos de 224 × 224 píxeles: 150,528 números, el 2.4 % de un cuadro de 1080 × 1920. Con menos datos aprenden más rápido, y para reconocer un perro alcanza. Fuente: He et al., 2015 (ResNet).

---

## 9 · Para una IA, este 7 son solo 64 números
**Bucle:** "…porque para ella," → "este siete son solo sesenta y cuatro números."

| Tiempo | Voz | En pantalla |
|---|---|---|
| 0:00–0:03 | "Este siete son solo sesenta y cuatro números." | **Cuadro 0:** dígito 7 real de 8 × 8 con su valor (0–16) escrito en cada casilla |
| 0:03–0:07 | "Parece que hay que explicarle qué es un siete." | Pizarrón con "un 7 tiene una raya arriba…" y una ✗ |
| 0:07–0:11 | "No. Le das mil trescientos ejemplos con su respuesta." | Lluvia de dígitos reales con su etiqueta |
| 0:11–0:15 | "Y no aprende formas…" | Silueta de un 7 tachada |
| 0:15–0:19 | "…aprende qué casillas suelen encenderse en cada número." | Mapa de calor de los pesos reales del modelo para el 7 |
| 0:19–0:24 | "Con dígitos que nunca vio, acierta cuatrocientos treinta y uno de cuatrocientos cincuenta." | Contador hasta **95.8 %** y uno de los 19 errores en coral |
| 0:24–0:27 | "Sin saber qué es un número. Porque para ella…" | Vuelve el 7 con sus 64 números |

- **Miniatura:** "8 × 8"
- **#:** `#machinelearning #cienciadedatos #python #inteligenciaartificial #shorts`
- **Descripción:** Un dígito escrito a mano de 8 × 8 píxeles son 64 números del 0 al 16. Una regresión logística entrenada con 1,347 ejemplos reconoce 431 de 450 dígitos que nunca vio: 95.8 %. Datos reales: conjunto Digits (UCI) en scikit-learn, modelo entrenado de verdad.

---

## 10 · Un ruido invisible engaña a la IA al 99 %
**Bucle:** "…apenas unos números, y por eso," → "para ti, estas dos fotos son iguales; para la IA, una es un gibón."
Cierra la lista volviendo a la idea del primer video: para la máquina solo hay números.

| Tiempo | Voz | En pantalla |
|---|---|---|
| 0:00–0:03 | "Para ti, estas dos fotos son iguales. Para la IA, una es un gibón." | **Cuadro 0:** dos pandas idénticos en pixel art con las etiquetas "panda 57.7 %" y "gibón 99.3 %" |
| 0:03–0:07 | "Creemos que una IA ve como nosotros." | Ojo humano = ojo robot, con una ✗ |
| 0:07–0:11 | "Pero solo ve números." | El panda se convierte en su rejilla de números |
| 0:11–0:15 | "Le sumaron un ruido diminuto, menos del uno por ciento…" | Capa de ruido de colores que se reduce a casi nada: "× 0.007" |
| 0:15–0:19 | "…calculado justo para engañarla." | Flecha "hacia gibón" sobre el ruido |
| 0:19–0:24 | "Mismo panda para ti. Gibón, con noventa y nueve por ciento de seguridad." | Barra de confianza: 57.7 % panda → 99.3 % gibón |
| 0:24–0:27 | "Cambiaron apenas unos números, y por eso…" | Vuelven los dos pandas idénticos |

- **Miniatura:** "¿PANDA?"
- **#:** `#inteligenciaartificial #cienciadedatos #deeplearning #ciberseguridad #shorts`
- **Descripción:** Un ruido invisible, menos del 1 % en cada número, hizo que una red neuronal pasara de ver un panda (57.7 %) a ver un gibón con 99.3 % de seguridad. Se llama ejemplo adversario. Fuente: Goodfellow, Shlens y Szegedy (2015), "Explaining and Harnessing Adversarial Examples". Ilustración propia.

---

## Pendiente antes de producir
- Generar la voz de cada uno y recortar si pasa de 30 s.
- Para el #9, guardar los datos reales en `src/datos/digitos.json` con `scripts/ml/digitos.py`.
- El #10 usa solo los porcentajes del artículo, no su imagen.
