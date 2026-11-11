# Guiones: 3 Shorts sueltos (pendientes de producir)

Números calculados en Python. Todo lo ilustrativo dice "Ejemplo simplificado" en pantalla.

---

## 1. La paradoja de Simpson engaña a los analistas de fútbol (~40 s)

Ángulo nuevo frente al Short de Simpson (cálculos renales): aquí la decisión es **a quién fichar**.

| Tiempo | Voz (Alex) | En pantalla |
|---|---|---|
| 0–3 s | "Este delantero tiene mejor efectividad… y aun así es peor." | Dos tarjetas: Delantero A 20 % · Delantero B 15 % |
| 3–6 s | "Tú eres el director deportivo. ¿A quién fichas?" | Reto "Tú vs. los datos" |
| 6–13 s | "En total, A convierte el 20 % de sus tiros. B, solo el 15 %. Fichamos a A… ¿verdad?" | Barras: A 20/100 = 20 % · B 15/100 = 15 % |
| 13–20 s | "Pero separa los tiros. Dentro del área: A, 30 %. B, 33 %." | Cancha con el área resaltada; A 18/60, B 5/15 |
| 20–26 s | "Fuera del área: A, 5 %. B, casi 12 %. B gana en los dos." | A 2/40, B 10/85; sticker "B gana en TODO" |
| 26–33 s | "¿El truco? A tira casi siempre desde cerca, donde es fácil anotar. B tira de lejos." | Mapa de tiros: A concentrado en el área, B afuera |
| 33–40 s | "Se llama paradoja de Simpson. Antes de fichar, pregunta: ¿desde dónde tiró?" | "Paradoja de Simpson" + "¿Y tú a quién fichabas?" |

**Datos clave:** A 18/60 dentro (30.0 %), 2/40 fuera (5.0 %), total 20/100 (20.0 %) · B 5/15 dentro (33.3 %), 10/85 fuera (11.8 %), total 15/100 (15.0 %).
**Título:** `20% vs 15%: el delantero "mejor" es peor`
**Miniatura:** "¿A QUIÉN FICHAS?"
**#:** #futbol #cienciadedatos #estadistica #paradojadesimpson #shorts

---

## 2. El secreto de la parada perfecta en F1, con probabilidad pura (~40 s)

Ángulo nuevo frente al Short del undercut: aquí es **probabilidad de que todo salga bien** y **valor esperado**.

| Tiempo | Voz (Alex) | En pantalla |
|---|---|---|
| 0–3 s | "Una parada en boxes dura unos segundos. Y una sola falla la arruina." | Cronómetro + auto entrando a boxes |
| 3–6 s | "Reto: si cada mecánico acierta el 99 % de las veces, ¿qué tan seguido sale perfecta?" | Reto |
| 6–14 s | "En el ejemplo, veinte tareas deben salir bien al mismo tiempo. Las probabilidades se multiplican." | 20 iconos de mecánicos; fórmula P = p²⁰ |
| 14–21 s | "Con 99 %: solo 82 de cada 100 paradas son perfectas." | 0.99²⁰ = 81.8 % |
| 21–27 s | "Con 99.9 %: 98 de cada 100. Por eso los equipos ensayan tanto: cada décima cuenta." | 0.995²⁰ = 90.5 % → 0.999²⁰ = 98.0 % |
| 27–35 s | "Y decidir cuándo parar también es probabilidad. Si hay 30 % de que salga el auto de seguridad, y eso te ahorra 10 segundos, esperar vale 3 segundos en promedio." | Valor esperado: 0.30 × 10 s = 3 s |
| 35–40 s | "Si parar ahora te da menos de 3, conviene esperar. No es suerte: es probabilidad." | "Valor esperado" + "¿Tú habrías esperado?" |

**Datos clave:** 0.99²⁰ = 81.8 % · 0.995²⁰ = 90.5 % · 0.999²⁰ = 98.0 % · VE = 0.30 × 10 = 3 s. "20 tareas", "30 %" y "10 s" son ilustrativos.
**Título:** `La parada perfecta en F1 es pura probabilidad`
**Miniatura:** "¿99% BASTA?"
**#:** #f1 #formula1 #probabilidad #cienciadedatos #shorts

---

## 3. Cómo Netflix o Spotify adivinan lo que te gusta con matrices (~40 s)

Ángulo nuevo frente al Short de filtrado colaborativo: aquí la **matriz y su factorización** (multiplicar dos tablas pequeñas).

| Tiempo | Voz (Alex) | En pantalla |
|---|---|---|
| 0–3 s | "Tus gustos caben en una tabla. Y con ella, la app adivina lo que no has escuchado." | Matriz usuarios × canciones con huecos "?" |
| 3–6 s | "Reto: Tú nunca escuchaste la canción 2. ¿Te va a gustar?" | Reto |
| 6–13 s | "Cada fila eres tú o alguien más. Cada columna, una canción. Los números, tus calificaciones." | Matriz 4×4; celda (Tú, Canción 2) con "?" |
| 13–21 s | "El truco: partir esa tabla gigante en dos tablas pequeñas: una de personas y una de canciones." | R ≈ U × Vᵀ; U = gustos (pop, rock) por persona; V = cuánto pop/rock tiene cada canción |
| 21–29 s | "Tú eres 1 de pop y 0.1 de rock. La canción 2 tiene 4.7 de pop. Multiplicas, sumas… 4.7." | 1×4.7 + 0.1×0.3 = 4.73 ≈ 4.7 |
| 29–35 s | "En cambio, la canción 3 te da apenas 1. Esa no te la recomienda." | 1×0.5 + 0.1×4.6 = 0.96 ≈ 1.0 |
| 35–40 s | "Las apps reales usan millones de filas y cientos de 'gustos' ocultos. Pero la idea es esta multiplicación." | "Factorización de matrices" + "¿Qué te recomendó a ti?" |

**Datos clave (calculados):** Tú = (1.0, 0.1); Canción 2 = (4.7, 0.3) → 4.73; Canción 3 = (0.5, 4.6) → 0.96. Ejemplo simplificado; no afirma cómo funciona por dentro una app específica.
**Título:** `Spotify te recomienda con 2 matrices` (idea ilustrativa, no el sistema interno de Spotify)
**Miniatura:** "TÚ × CANCIÓN"
**#:** #cienciadedatos #algebralineal #machinelearning #spotify #shorts
