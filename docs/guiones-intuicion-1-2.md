# Serie 3D "Tu intuición pierde": guiones #1 y #2

Plantilla de `CLAUDE.md`:
- Paradoja en la primera frase.
- Giro entre los segundos 11 y 18.
- Cambio visual cada 4 s o menos.
- Unas 55 a 60 palabras.
- Cierre en bucle.

Escenas en 3D con el kit ampliado (`src/kit/three/`):
- **Personas:** humanoides, multitudes de 1,000 y caminata.
- **Cámara:** viajes, zoom, órbita y temblor.
- **Física:** resortes, rebotes y gravedad.

Números y gráficas en 2D, encima del 3D.

---

## 1 · Diste positivo al 99 %… y casi seguro estás sano

**Datos (ejemplo simplificado, calculado aquí ✔)**
- Enfermedad que tiene **1 de cada 1,000** personas. Prueba que acierta el **99 %** con enfermos y con sanos.
- En 1,000 personas:
  - El enfermo da positivo.
  - De los 999 sanos, el 1 % da positivo por error: **≈ 10 falsos positivos**.
  - Total: **11 positivos y solo 1 enfermo → 9 %**.
- Se llama "valor predictivo positivo" y por eso un positivo se confirma con una segunda prueba.
- En pantalla y en la descripción va marcado como **ejemplo simplificado**, con cifras ilustrativas y no de una enfermedad real.

**Bucle:** el video termina con "…Y por eso, aunque suene imposible:" y arranca con "Diste positivo en una prueba que acierta el noventa y nueve por ciento… y casi seguro estás sano."

| Tiempo | Voz (Alex) | En pantalla (3D salvo donde se indica) |
|---|---|---|
| 0:00–0:04 | "Diste positivo en una prueba que acierta el noventa y nueve por ciento… y casi seguro estás sano." | **Cuadro 0:** consultorio. La doctora entrega un papel "POSITIVO" al paciente, que ya está en pose de preocupado. Zoom lento al papel; "99 %" en 2D |
| 0:04–0:07 | "Suena imposible. Imagina mil personas." | La cámara se aleja de golpe: el paciente queda en medio de una multitud de **1,000** que aparece desde el piso con un resorte |
| 0:07–0:11 | "Esta enfermedad la tiene una de cada mil." | Un reflector cae sobre **1 persona**, que se pinta de rojo; contador 2D "1 enfermo" |
| 0:11–0:16 | "La prueba lo detecta… pero también falla con el uno por ciento de los sanos: diez más." | La cámara orbita y **10 personas** se encienden en naranja una por una, cada una con un temblor; contador 2D "10 sanos que dan positivo" |
| 0:16–0:20 | "Once positivos… y solo uno está enfermo." | Los demás se apagan y quedan 11 iluminados; tarjeta 2D "1 de 11" |
| 0:20–0:25 | "Nueve por ciento. Por eso un positivo se confirma con otra prueba." | "9 %" gigante en 2D; la doctora en 3D levanta un segundo tubo de prueba |
| 0:25–0:27 | "Y por eso, aunque suene imposible…" | Vuelve el consultorio del inicio |

**Unas 60 palabras · entre 26 y 28 s**

- **Título:** `Diste positivo al 99 %… y casi seguro estás sano`
- **Miniatura:** "1 DE 11" sobre la multitud con los 11 iluminados. Revisada con el linter: no repite palabras del título.
- **#:** `#estadistica #probabilidad #salud #cienciadedatos #shorts`
- **Descripción:**
  > Si una enfermedad la tiene 1 de cada 1,000 personas y la prueba acierta el 99 %, de cada 11 positivos solo 1 está enfermo: un positivo significa 9 % de probabilidad, no 99 %. Los falsos positivos de los sanos superan a los enfermos reales.
  > Por eso un positivo se confirma con una segunda prueba (teorema de Bayes, valor predictivo positivo). Ejemplo simplificado con cifras ilustrativas. Animación 3D.

---

## 2 · ¿Cambias de puerta? Casi todos eligen mal

**Datos**
- ✔ **Simulación aquí de 10,000 juegos:** quedarse ganó **3,336 (33.4 %)** y cambiar **6,664 (66.6 %)**.
- **Reglas del juego (Monty Hall):** 3 puertas, 1 auto y 2 cabras. El presentador **sabe** dónde está el auto y siempre abre una puerta con cabra.
- **"Casi todos" se quedan:** ≈ en estudios de laboratorio (Granberg y Brown, 1995) la gran mayoría no cambia. **Falta verificarlo** antes de producir; si no se confirma, el título pasa a "La mayoría se queda".

**Bucle:** el video termina con "…Así que, la próxima vez que" y arranca con "te dejen cambiar de puerta".

| Tiempo | Voz (Alex) | En pantalla |
|---|---|---|
| 0:00–0:04 | "Te dejan cambiar de puerta. Si cambias, ganas el doble… y casi nadie cambia." | **Cuadro 0 (3D):** escenario con 3 puertas, reflectores y el concursante frente a la puerta 1; "×2" en 2D |
| 0:04–0:08 | "Detrás de una hay un auto; detrás de las otras, cabras. Eliges la uno." | El concursante camina y señala la puerta 1; la cámara viaja a su lado |
| 0:08–0:12 | "El presentador, que sabe dónde está el auto, abre otra: cabra." | La puerta 3 se abre con rebote de resorte y aparece la cabra; un temblor de cámara al abrir |
| 0:12–0:15 | "Parece cincuenta y cincuenta." | El concursante con los brazos cruzados; "50 / 50" en 2D, que se tacha |
| 0:15–0:20 | "Pero tu primera elección acertó solo una de cada tres veces. Las otras dos, el auto está en la que queda." | Tres "mundos" lado a lado (3 escenarios pequeños): en 2 de ellos el auto está detrás de la otra puerta |
| 0:20–0:25 | "Diez mil juegos: quedarse gana un tercio; cambiar, dos tercios." | Contadores 2D que corren hasta 33 % y 67 % mientras miles de puertitas se abren en una cuadrícula 3D |
| 0:25–0:27 | "Así que, la próxima vez que…" | Vuelve el concursante frente a las 3 puertas |

**Unas 70 palabras · entre 27 y 29 s.** Si pasa de 30 s, recorto la frase de los 0:04.

- **Título:** `¿Cambias de puerta? Casi todos eligen mal`
- **Miniatura:** "¿TE QUEDAS?" con las 3 puertas y la cabra asomándose. Revisada con el linter: no repite palabras del título.
- **#:** `#probabilidad #estadistica #matematicas #cienciadedatos #shorts`
- **Descripción:**
  > Tres puertas, un auto y dos cabras. Eliges una, el presentador abre otra con cabra y te deja cambiar. Cambiar gana 2 de cada 3 veces, porque tu primera elección solo acertó 1 de cada 3. Lo simulamos 10,000 veces: quedarse ganó 33 %, cambiar 67 %.
  > Es el problema de Monty Hall, uno de los más famosos de la probabilidad. Simulación hecha en Python. Animación 3D.

---

## Cambio en el plan: el #4
"Blindaron los aviones donde no había balas" se reemplaza por:

**#4 · Regaños que "funcionan"… y es pura estadística.** Un instructor de vuelo notaba que, después de regañar un mal aterrizaje, el siguiente salía mejor, y que después de felicitar uno bueno, el siguiente salía peor. Es **regresión a la media**: tras un resultado extremo, el siguiente casi siempre se acerca al promedio, con regaño o sin él. ≈ La historia la cuenta Daniel Kahneman (instructores de la Fuerza Aérea de Israel); **falta verificarla** antes de su guion.

En 3D: una persona lanzando dardos o aterrizando avioncitos, un entrenador que grita o aplaude, y la gráfica en 2D que muestra que el regaño no cambió nada.
