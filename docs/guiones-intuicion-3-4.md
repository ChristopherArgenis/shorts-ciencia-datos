# Serie 3D "Tu intuición pierde": guiones #3 y #4

Misma plantilla que los guiones #1 y #2:
- Paradoja en la primera frase y giro entre los segundos 11 y 18.
- Un cambio visual cada 4 s o menos.
- Entre 55 y 65 palabras, con cierre en bucle.

Escenas 3D con el kit (`src/kit/three/`); números y gráficas en 2D encima.

---

## 3 · Salió negro 26 veces seguidas y todos perdieron

**Datos (verificados)**
- **Casino de Montecarlo, 18 de agosto de 1913:** la bola cayó en negro **26 veces seguidas**. Los jugadores apostaron cada vez más fuerte al rojo, convencidos de que "ya tocaba", y perdieron millones. Por eso la falacia del jugador también se llama **"falacia de Montecarlo"**.
- Las fuentes no coinciden en cuándo empezó la ola de apuestas: unas dicen que tras unos 15 negros, otras que tras 10. En el guion queda como "cada vez más gente".
- **Probabilidad (calculada aquí ✔):**
  - Las fuentes citan **1 en ≈ 67 millones**, que es (1/2)^26 y no cuenta el cero.
  - Con el cero de la ruleta europea, (18/37)^26 da **≈ 1 en 137 millones**. En pantalla uso esta cifra, marcada "contando el cero".
- **Sin memoria (calculado ✔):** después de 26 negros, la probabilidad de rojo en el giro 27 sigue siendo **18/37 = 48.6 %**, igual que en cualquier otro giro.

**Bucle:** el video termina con "…Así que, la próxima vez que pienses que ya toca rojo, recuerda:" y arranca con "Salió negro veintiséis veces seguidas… y todos perdieron."

| Tiempo | Voz (Alex) | En pantalla (3D salvo donde se indica) |
|---|---|---|
| 0:00–0:04 | "Salió negro veintiséis veces seguidas… y todos perdieron." | **Cuadro 0:** la ruleta 3D girando vista desde arriba, con la mesa llena de fichas sobre ROJO. Contador 2D "26 ⚫" ya visible; temblor de cámara al caer la bola |
| 0:04–0:08 | "Montecarlo, mil novecientos trece. Negro, negro, negro…" | Cortes rápidos: la bola cae en negro tres veces, con frenado físico (`frenado`). El contador sube 3, 4, 5…; la placa 2D "Montecarlo · 1913" |
| 0:08–0:12 | "La gente pensó: ya toca rojo. Y apostó más y más." | La cámara se aleja: una multitud de humanoides se amontona alrededor de la mesa y las torres de fichas sobre ROJO crecen con resorte |
| 0:12–0:17 | "Pero la ruleta no tiene memoria. No sabe qué salió antes." | **Giro:** la cámara se acerca a la ruleta y todo se congela. Texto 2D "🧠 ✗"; los 26 negros anteriores se desvanecen de la pista |
| 0:17–0:22 | "En el giro veintisiete, el rojo tenía las mismas chances que siempre: cuarenta y nueve por ciento." | Tarjeta 2D gigante "48.6 %", que aparece igual en tres giros distintos ("giro 1", "giro 15", "giro 27") |
| 0:22–0:26 | "Veintiséis seguidos era rarísimo: uno en ciento treinta y siete millones. Pero ya había pasado." | La bola cae en negro por 26.ª vez; la multitud se encorva en pose PREOCUPADO. "1 en 137 millones" en 2D, con la nota "contando el cero · calculado" |
| 0:26–0:29 | "Así que, la próxima vez que pienses que ya toca rojo, recuerda:" | Vuelve la toma inicial: la ruleta vista desde arriba con el contador "26" |

**≈ 63 palabras · 27 a 29 s**

- **Título:** `Salió negro 26 veces seguidas y todos perdieron` (47 caracteres, linter 98/100).
- **Miniatura:** "¿ROJO AHORA?" sobre la ruleta vista desde arriba, con la bola en una casilla negra. Revisada con el linter: no repite palabras del título.
- **#:** `#probabilidad #estadistica #casino #cienciadedatos #shorts`
- **Descripción:**
  > En 1913, en el casino de Montecarlo, la ruleta cayó en negro 26 veces seguidas. Los jugadores apostaron todo al rojo, convencidos de que "ya tocaba", y perdieron millones. La ruleta no tiene memoria: en cada giro el rojo tiene la misma probabilidad (18/37 ≈ 48.6 %).
  > Es la falacia del jugador, también llamada falacia de Montecarlo. Probabilidad de la racha calculada en Python (≈ 1 en 137 millones contando el cero). Animación 3D.

---

## 4 · Regaños que "funcionan"… y es pura estadística

**Datos (verificados)**
- **La historia la cuenta Daniel Kahneman en *Pensar rápido, pensar despacio*.** Él daba clases a instructores de vuelo de la Fuerza Aérea de Israel. Un instructor veterano le dijo:
  - cuando felicitaba una buena maniobra, la siguiente salía peor;
  - cuando gritaba tras una mala, la siguiente salía mejor.
- **Lo que pasaba era regresión a la media:** después de un intento extremo, el siguiente tiende a volver al promedio, con regaño o sin él. Kahneman lo demostró ahí mismo con monedas lanzadas de espaldas a un blanco: los que quedaron lejos en el primer tiro mejoraron y los que quedaron cerca empeoraron.
- Las fuentes no coinciden en la fecha (unas dicen mediados de los 60, otras finales de los 70), así que el guion no dice el año.
- **Simulación aquí ✔:** 100,000 personas con la misma puntería tiran dos veces, sin ningún regaño ni felicitación.
  - De los **peores 20 %** del primer tiro, el **90 % mejoró** en el segundo.
  - De los **mejores 20 %**, el **90 % empeoró**.

**Bucle:** el video termina con "…Por eso parece que" y arranca con "los regaños funcionan… y es pura estadística."

| Tiempo | Voz (Alex) | En pantalla |
|---|---|---|
| 0:00–0:04 | "Los regaños funcionan: le gritas, y el siguiente tiro sale mejor… y es pura estadística." | **Cuadro 0 (3D):** el entrenador en pose de grito junto a un lanzador; el dardo vuela con `proyectil` y pega cerca del centro. Texto 2D "¡FUNCIONA!" |
| 0:04–0:08 | "Un instructor de pilotos le dijo esto a Daniel Kahneman." | La cámara gira hacia el lanzador; placa 2D "Kahneman · instructores de vuelo" |
| 0:08–0:12 | "Si felicitaba un buen intento, el siguiente salía peor." | Un dardo pega en el centro, el entrenador aplaude (CELEBRA) y el siguiente dardo cae lejos. Flecha 2D roja ↓ |
| 0:12–0:16 | "Pero nadie cambió. Fue suerte." | **Giro:** cámara cenital sobre la diana; los dos impactos quedan marcados y "SUERTE" aparece en 2D con temblor |
| 0:16–0:21 | "Cien mil personas con la misma puntería tiran dos veces, sin regaños. Los peores mejoran; los mejores empeoran." | Una multitud lanza a la vez y miles de puntos caen sobre una diana gigante. Gráfica 2D de dos barras: "peores → 90 % mejoran" y "mejores → 90 % empeoran" |
| 0:21–0:25 | "Después de un extremo, casi todo vuelve al promedio: regresión a la media." | Los puntos extremos se deslizan hacia el anillo del medio; texto 2D "→ promedio" |
| 0:25–0:27 | "Por eso parece que…" | Vuelve el entrenador gritando, como al inicio |

**≈ 64 palabras · 26 a 28 s**

- **Título:** `Regaños que "funcionan"… y es pura estadística` (46 caracteres, linter 80/100). El linter pide un número. Si quieres subir el puntaje, la alternativa es `Gritar "funciona" el 90 % de las veces… por suerte`.
- **Miniatura:** "SUERTE, NO GRITOS" sobre el entrenador gritando y la diana. Revisada con el linter: no repite palabras del título.
- **#:** `#estadistica #psicologia #kahneman #cienciadedatos #shorts`
- **Descripción:**
  > ¿Regañar funciona? Un instructor de vuelo notaba que tras gritar un mal intento el siguiente salía mejor, y tras felicitar uno bueno salía peor. Daniel Kahneman le mostró que era regresión a la media: después de un resultado extremo, el siguiente casi siempre vuelve al promedio, con regaño o sin él.
  > Simulamos 100,000 personas con la misma puntería: el 90 % de los peores mejoró y el 90 % de los mejores empeoró, sin que nadie las regañara. Animación 3D.

---

**Fuentes**
- #3: Wikipedia, "Gambler's fallacy"; IFLScience; Gizmodo; *Medical Journal of Australia* (2011), "The Monte Carlo fallacy".
- #4: Kahneman, *Pensar rápido, pensar despacio*, cap. 17; fs.blog, "Regression to the mean"; Crooked Timber; blog de la UNE.
