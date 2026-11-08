# Shorts de Ciencia de Datos: paquete de publicación

Canal: @UniversoCienciaDatos · Formato: vertical 1080×1920, 30 s, sin cara. Voz: Alex (Kokoro, gratis), solo frases clave.

## Por qué estos tres temas

Analicé 395 Shorts recientes de 12 canales de ciencia, matemáticas y programación en español
(Derivando, QuantumFracture, Soy Dalto, MoureDev, Ringa Tech, Codificando Bits, Datademia y otros).
Los ordené según cuánto superó cada Short la mediana de **su propio canal** (herramienta `swipe.py`
del plugin youtube-agent).

Patrón de los que más destacan: **una pregunta o paradoja concreta que parece imposible**, no una
definición. Ejemplos:
- "¿Cuál es el problema sin resolver más antiguo de las matemáticas?" → 20,9× su mediana
- "El problema del pasajero nº 100" → 3,9×
- "El algoritmo que casi acaba con las armas nucleares" → 2,8×
- Las definiciones tipo "¿Qué es la imputación de datos?" se quedan en ~3× en canales pequeños.

En tu canal, tu mejor Short ("3 métricas… analistas de fútbol") hizo 11,8× tu mediana. Tu mejor
video largo (Cadenas de Markov) une un tema técnico con cosas que todos conocen.

Esto es **potencial**, no una promesa: la herramienta mide qué títulos funcionaron, no por qué.

---

## Short 1: La paradoja del cumpleaños (publicar primero)

**Título:** ¿Cuántas personas para que 2 cumplan el mismo día? (98/100)
**Texto en pantalla (0–2 s):** la pregunta + "Pista: no son 183"
**Bucle:** termina con "Entonces… ¿cuántas personas necesitas?", que vuelve a la pregunta inicial.

**Descripción:**
> Con solo 23 personas, la probabilidad de que dos cumplan años el mismo día ya es de 50,7 %. Con 57, es del 99 %. La clave: no comparas tu cumpleaños con el de los demás, comparas las 253 parejas posibles.
>
> #cienciadedatos #probabilidad #matematicas #estadistica #shorts

**Comentario fijado:** ¿Cuántas personas habrías dicho antes de ver el video? 👇

---

## Short 2: Paradoja de Simpson

**Título:** La Paradoja de Simpson en 30 segundos (100/100)
**Alternativa:** Gana en TODOS los grupos… y pierde en total (80/100, más intriga)
**Bucle:** "Entonces… ¿cuál es mejor?"

**Descripción:**
> Un tratamiento gana en piedras pequeñas (93 % vs 87 %) y en grandes (73 % vs 69 %)… pero pierde en el total (78 % vs 83 %). ¿Por qué? Porque recibió los casos más difíciles. Antes de confiar en un promedio, pregunta cómo se agruparon los datos.
>
> Datos reales: Charig et al., British Medical Journal (1986), tratamiento de cálculos renales. A = cirugía abierta, B = nefrolitotomía percutánea.
>
> #cienciadedatos #estadistica #paradojadesimpson #datos #shorts

**Comentario fijado:** ¿Qué tratamiento elegirías tú? A o B 👇

---

## Short 3: ¿Cómo sabe Netflix qué vas a ver?

**Título:** ¿Cómo sabe Netflix qué vas a ver? (94/100)
**Bucle:** "…¿y cómo lo supo Netflix?"
**Nota:** las personas y películas son un ejemplo inventado para explicar la idea. El video no
afirma cómo funciona el sistema interno de Netflix, solo la idea base (filtrado colaborativo).
Publícalo el mismo día que tu video largo de sistemas de recomendación y enlázalo como "video
relacionado".

**Descripción:**
> Las plataformas de streaming no adivinan tus gustos: te comparan con personas que ven lo mismo que tú. Esa idea se llama filtrado colaborativo y es una de las bases de los sistemas de recomendación.
>
> #cienciadedatos #machinelearning #netflix #python #shorts

**Comentario fijado:** ¿Cuál fue la última serie que te recomendaron y te enganchó? 👇

---

## Short 4: Ciencia de Datos en la F1 (el undercut)

**Título:** Entró a boxes PRIMERO… y por eso ganó
**Alternativa:** El undercut de la F1 explicado con datos
**Bucle:** "¿Tú habrías entrado antes?"
**Nota:** 300 sensores y 1,1 millones de datos por segundo son cifras de AWS / Fórmula 1. El
undercut usa números ilustrativos y en pantalla dice "Ejemplo simplificado".

**Descripción:**
> Un auto de F1 lleva unos 300 sensores que envían cerca de 1,1 millones de datos por segundo (AWS / Fórmula 1). Con esos datos, los equipos deciden cuándo entrar a boxes. El undercut: parar antes que tu rival y usar llantas nuevas para salir adelante.
>
> #cienciadedatos #f1 #formula1 #datos #shorts

**Comentario fijado:** ¿Qué carrera recuerdas que se haya ganado por estrategia? 👇

---

## Short 5: Cómo funciona Claude, desde cero (~40 s)

**Título:** Cómo funciona Claude en 40 segundos (100/100)
**Alternativa:** Claude no lee palabras. Lee números. (90/100, más intriga)
**Bucle:** "¿Cuál será el siguiente token?"
**Nota:** explicación general de un modelo de lenguaje. Los cortes en tokens, los números y los
porcentajes son ilustrativos y así lo dice en pantalla.

**Descripción:**
> Claude no lee palabras: corta tu texto en tokens y los convierte en números. Luego cada token "mira" a los demás para entender el contexto (atención), predice el siguiente token, lo agrega y repite. Así se escribe cada respuesta. Aprendió leyendo muchísimo texto y después lo entrenaron para ser útil, honesto e inofensivo.
>
> #cienciadedatos #inteligenciaartificial #claude #machinelearning #shorts

**Comentario fijado:** ¿Qué otra IA quieres que explique desde cero? 👇

---

## Short 6: StatsBomb, la fuente de datos de los analistas de fútbol (~38 s)

**Título:** StatsBomb explicado en 38 segundos (100/100)
**Alternativa:** 3,300 datos por partido: así trabaja StatsBomb (94/100)
**Miniatura:** `Mini6-StatsBomb` → "3,300 DATOS" sobre una cancha llena de puntos
**Bucle:** "¿Cuántos datos crees que tiene TU partido?"
**Nota:** datos verificados en fuentes de StatsBomb/Hudl. Jugadas, posiciones y valores de xG son
ilustrativos y así lo dice en pantalla. No usa datos de StatsBomb ni su logo.

**Descripción:**
> Un partido de fútbol tiene unos 3,300 eventos registrados: cada pase, presión o tiro con su ubicación y su momento. Así trabaja StatsBomb, la fuente de datos que usan los analistas de fútbol para fichar, estudiar al rival y medir el rendimiento.
> Con su tecnología 360 congelan la posición de los jugadores visibles en cada evento, y con eso calculan el xG: qué tan probable era el gol. Nació como blog en 2013 y hoy es parte de Hudl. Parte de sus datos son gratis en GitHub (statsbombpy).
>
> Fuente: StatsBomb / Hudl. Ejemplos de jugadas simplificados.

**#:** #cienciadedatos #futbol #statsbomb #analisisdedatos #shorts

**Comentario fijado:** ¿Quieres que analicemos un partido real con sus datos gratis? 👇

---

# Serie: Matemáticas que sí usa un científico de datos (8 partes)

Plantilla: `src/kit/serie.tsx` (etiqueta "Parte N/8", fórmula, avance). Ritmo sugerido: 2 por semana.
Plan: 1 Promedio vs mediana · 2 Desviación estándar · 3 Distribución normal · 4 Bayes ·
5 Correlación ≠ causalidad · 6 Regresión lineal · 7 Vectores y similitud · 8 Descenso de gradiente.

## Parte 1: Promedio vs mediana
**Título:** Promedio vs mediana | Mates de científico de datos #1
**Miniatura:** `MiniMates1` → "¿MEDIO MILLÓN?"
**Descripción:**
> 9 personas ganan unos $15,000 al mes. Entra un multimillonario y el promedio sube a $513,500… pero la mediana sigue en $15,000. Por eso muchos reportes de sueldos y precios de casas usan la mediana: no la mueven los valores extremos.
> Parte 1 de 8 de la serie "Matemáticas que sí usa un científico de datos". Ejemplo simplificado.
**#:** #cienciadedatos #estadistica #matematicas #mediana #shorts

## Parte 2: Desviación estándar
**Título:** Desviación estándar | Mates de científico de datos #2
**Miniatura:** `MiniMates2` → "¿EN CUÁL CONFÍAS?"
**Descripción:**
> Dos repartidores tardan 30 minutos en promedio, pero uno siempre llega a tiempo y el otro tarda de 10 a 50 minutos. La desviación estándar mide qué tan lejos caen los datos del promedio: σ = 0.6 vs σ = 15.8 minutos. Así se mide qué tan confiable es un servicio, la calidad de una fábrica o el riesgo de una inversión.
> Parte 2 de 8 de la serie "Matemáticas que sí usa un científico de datos". Ejemplo simplificado.
**#:** #cienciadedatos #estadistica #matematicas #desviacionestandar #shorts

## Parte 3: Distribución normal y puntaje z
**Título:** Distribución normal | Mates de científico de datos #3
**Miniatura:** `MiniMates3` → "¿FUISTE TÚ?"
**Descripción:**
> Muchos datos forman una campana: la distribución normal. El 68 % cae a 1 desviación del promedio, el 95 % a 2 y el 99.7 % a 3. El puntaje z = (x − μ)/σ dice qué tan lejos está un dato: una compra de $380 da z = 0.25 (normal) y una de $9,500 da z = 76 (alerta). Es la idea base de la detección de fraude.
> Parte 3 de 8 de la serie "Matemáticas que sí usa un científico de datos". Ejemplo simplificado: los bancos usan modelos más complejos.
**#:** #cienciadedatos #estadistica #distribucionnormal #matematicas #shorts

## Parte 4: Teorema de Bayes
**Título:** Teorema de Bayes | Mates de científico de datos #4
**Miniatura:** `MiniMates4` → "¿ES SPAM?"
**Descripción:**
> De cada 100 correos, 30 son spam. Pero si el correo dice "GRATIS", la probabilidad sube: de 25 correos con esa palabra, 18 son spam → 72 %. Eso es probabilidad condicional y el Teorema de Bayes, la base de los filtros de spam "Bayes ingenuo", que repiten el cálculo con cada palabra.
> Parte 4 de 8 de la serie "Matemáticas que sí usa un científico de datos". Números ilustrativos.
**#:** #cienciadedatos #probabilidad #teoremadebayes #matematicas #shorts

## Parte 5: Correlación ≠ causalidad
**Título:** Correlación vs causalidad | Mates de científico de datos #5
**Miniatura:** `MiniMates5` → "¿EL HELADO MATA?"
**Descripción:**
> Cuando suben las ventas de helado, suben los ahogados: correlación de 0.92. ¿El helado es peligroso? No: hay una variable escondida, el calor. La correlación (de −1 a 1) solo dice si dos cosas se mueven juntas, no por qué. Por eso las empresas deciden con experimentos como las pruebas A/B.
> Parte 5 de 8 de la serie "Matemáticas que sí usa un científico de datos". Ejemplo simplificado.
**#:** #cienciadedatos #estadistica #correlacion #matematicas #shorts

## Parte 6: Regresión lineal
**Título:** Regresión lineal | Mates de científico de datos #6
**Miniatura:** `MiniMates6` → "¿CUÁNTO CUESTA?"
**Descripción:**
> Con una línea puedes estimar el precio de una casa. La regresión lineal (y = m·x + b) busca la recta con el menor error: la suma de las distancias al cuadrado de cada punto. En este ejemplo, una casa de 130 m² costaría unos $2.65 millones. Se usa para estimar precios, ventas y demanda.
> Parte 6 de 8 de la serie "Matemáticas que sí usa un científico de datos". Ejemplo simplificado.
**#:** #cienciadedatos #regresionlineal #machinelearning #matematicas #shorts

## Parte 7: Vectores y similitud coseno
**Título:** Vectores y similitud | Mates de científico de datos #7
**Miniatura:** `MiniMates7` → "TÚ = FLECHA"
**Descripción:**
> Para una app de música, tus gustos son una flecha: cuánto rock y cuánto reguetón escuchas. Si dos flechas apuntan al mismo lado, sus gustos se parecen. La similitud coseno mide ese ángulo: Tú y Ana 0.99, Tú y Luis 0.35. Así funcionan las recomendaciones y las búsquedas por significado, con cientos de dimensiones.
> Parte 7 de 8 de la serie "Matemáticas que sí usa un científico de datos". Ejemplo simplificado.
**#:** #cienciadedatos #algebralineal #machinelearning #matematicas #shorts

## Parte 8: Derivadas y descenso de gradiente (final)
**Título:** Descenso de gradiente | Mates de científico de datos #8
**Miniatura:** `MiniMates8` → "¿CÓMO APRENDE?"
**Descripción:**
> Así aprende una IA: bajando una montaña con los ojos vendados. La montaña es el error del modelo, la derivada es la pendiente que indica hacia dónde bajar, y cada paso (w ← w − α·f′(w)) reduce el error. Eso es el descenso de gradiente: con él se entrenan las redes neuronales y los modelos de lenguaje como Claude.
> Parte 8 de 8, final de la serie "Matemáticas que sí usa un científico de datos". Ejemplo simplificado.
**#:** #cienciadedatos #inteligenciaartificial #machinelearning #matematicas #shorts

---

# Serie: Estructuras de Datos y Algoritmos (10 partes)

Misma plantilla que la serie de mates (`src/kit/serie.tsx`, `SERIE_ALGORITMOS`, color azul).
Plan: 1 Arreglos · 2 Big O · 3 Búsqueda binaria · 4 Tablas hash · 5 Pilas y colas ·
6 Ordenamiento · 7 Árboles · 8 Grafos · 9 Camino más corto · 10 Programación dinámica.

## Parte 1: Arreglos
**Título:** Arreglos | Estructuras y algoritmos #1
**Miniatura:** `MiniAlgo1` → "TU PLAYLIST"
**Descripción:**
> Tu playlist es una estructura de datos: un arreglo. Cada canción vive en una cajita numerada (desde el 0), así que puedes saltar directo a cualquiera en un paso. Pero si metes una al inicio, todas se recorren. Cada columna de una tabla en pandas o NumPy es un arreglo: por eso un científico de datos suma millones de números de un solo golpe.
> Parte 1 de 10 de la serie "Estructuras de Datos y Algoritmos". Ejemplo simplificado.
**#:** #cienciadedatos #programacion #python #estructurasdedatos #shorts

## Parte 2: Notación Big O
**Título:** Notación Big O | Estructuras y algoritmos #2
**Miniatura:** `MiniAlgo2` → "¿SEGUNDOS O HORAS?"
**Descripción:**
> Buscar correos repetidos en 100,000 filas: comparar todos con todos son 10,000 millones de pasos, O(n²), casi 3 horas. Revisar cada correo una sola vez con un set son 100,000 pasos, O(n), una décima de segundo. La notación Big O dice cómo crece el tiempo cuando crecen los datos.
> Parte 2 de 10 de la serie "Estructuras de Datos y Algoritmos". Ejemplo simplificado: 1 paso = 1 microsegundo.
**#:** #cienciadedatos #programacion #algoritmos #bigo #shorts

## Parte 3: Búsqueda binaria
**Título:** Búsqueda binaria | Estructuras y algoritmos #3
**Miniatura:** `MiniAlgo3` → "20 INTENTOS"
**Descripción:**
> Piensa un número del 1 al 1,000,000: lo adivino en 20 intentos o menos. Cada respuesta "más alto / más bajo" descarta la mitad, porque log₂(1,000,000) ≈ 20. Eso es búsqueda binaria, y solo funciona con datos ordenados. Un científico de datos la usa para buscar fechas o identificadores sin revisar fila por fila (searchsorted).
> Parte 3 de 10 de la serie "Estructuras de Datos y Algoritmos".
**#:** #cienciadedatos #programacion #algoritmos #python #shorts

## Parte 4: Tablas hash
**Título:** Tablas hash | Estructuras y algoritmos #4
**Miniatura:** `MiniAlgo4` → "¿AL INSTANTE?"
**Descripción:**
> Como un guardarropa: entregas tu abrigo y te dan una ficha. Una función hash convierte tu nombre en un número de casillero, siempre el mismo, para encontrarte directo sin revisar todo (y a veces dos nombres caen juntos: colisión). En Python son los diccionarios y los conjuntos: contar, quitar duplicados y unir tablas.
> Parte 4 de 10 de la serie "Estructuras de Datos y Algoritmos". Ejemplo simplificado.
**#:** #cienciadedatos #programacion #python #estructurasdedatos #shorts

## Parte 5: Pilas y colas
**Título:** Pilas y colas | Estructuras y algoritmos #5
**Miniatura:** `MiniAlgo5` → "CTRL+Z VS FILA"
**Descripción:**
> Una pila es una torre de platos: el último que entra es el primero que sale, por eso Ctrl+Z deshace lo último que hiciste. Una cola es la fila del banco: el primero que llega es el primero que atienden. Los científicos de datos usan colas para procesar pedidos, mensajes o lecturas de sensores en el orden en que llegan (deque en Python).
> Parte 5 de 10 de la serie "Estructuras de Datos y Algoritmos". Ejemplo simplificado.
**#:** #cienciadedatos #programacion #python #estructurasdedatos #shorts

## Parte 6: Ordenamiento
**Título:** Ordenamiento | Estructuras y algoritmos #6
**Miniatura:** `MiniAlgo6` → "1,000 EXÁMENES"
**Descripción:**
> Ordenar 1,000 exámenes buscando el menor una y otra vez cuesta unas 500,000 comparaciones. Merge sort divide la pila a la mitad hasta tener exámenes sueltos y luego junta pares ya ordenados: unas 10,000 comparaciones, O(n log n). Es la base de rankings, top de ventas y la mediana; Python usa Timsort, basado en merge sort.
> Parte 6 de 10 de la serie "Estructuras de Datos y Algoritmos". Ejemplo simplificado.
**#:** #cienciadedatos #programacion #algoritmos #python #shorts

## Parte 7: Árboles
**Título:** Árboles | Estructuras y algoritmos #7
**Miniatura:** `MiniAlgo7` → "¿CRÉDITO APROBADO?"
**Descripción:**
> Las carpetas de tu computadora son un árbol: raíz, ramas y hojas. Para llegar a un archivo no revisas todo, bajas por la rama correcta. Un árbol de decisión hace lo mismo con preguntas (¿ingreso alto? ¿pagos atrasados?) y los científicos de datos los entrenan para aprobar créditos, detectar fraudes o predecir si un cliente se va.
> Parte 7 de 10 de la serie "Estructuras de Datos y Algoritmos". Ejemplo simplificado.
**#:** #cienciadedatos #machinelearning #algoritmos #python #shorts

## Parte 8: Grafos
**Título:** Grafos | Estructuras y algoritmos #8
**Miniatura:** `MiniAlgo8` → "¿LA CONOCES?"
**Descripción:**
> Tú, tus amigos y los amigos de tus amigos forman un grafo: personas = nodos, amistades = aristas. Sara no es tu amiga, pero tiene 2 amigos en común contigo: por eso una red social te la sugeriría. Los científicos de datos usan grafos para recomendar y para detectar fraudes, como varias cuentas conectadas a la misma tarjeta.
> Parte 8 de 10 de la serie "Estructuras de Datos y Algoritmos". Ejemplo simplificado.
**#:** #cienciadedatos #grafos #algoritmos #python #shorts

## Parte 9: Camino más corto
**Título:** Camino más corto | Estructuras y algoritmos #9
**Miniatura:** `MiniAlgo9` → "18 MIN vs 13 MIN"
**Descripción:**
> Las calles son un grafo y cada tramo tiene un tiempo. La ruta que parece directa toma 18 minutos; el algoritmo de Dijkstra explora siempre lo más cercano primero y encuentra una de 13. Se usa en logística: rutas de reparto, tiempos de entrega y cadenas de suministro. Las apps de mapas usan versiones más avanzadas con tráfico en vivo.
> Parte 9 de 10 de la serie "Estructuras de Datos y Algoritmos". Ejemplo simplificado.
**#:** #cienciadedatos #algoritmos #grafos #python #shorts

## Parte 10: Programación dinámica
**Título:** Programación dinámica | Estructuras y algoritmos #10
**Miniatura:** `MiniAlgo10` → "¿GATP = GATO?"
**Descripción:**
> ¿Cómo saber que "gatp" era "gato"? Con la distancia de edición: cuántos cambios separan dos palabras. En vez de probar todo, se llena una tabla guardando respuestas pequeñas: eso es programación dinámica. Los científicos de datos la usan para limpiar datos, como saber que "José Pérez" y "Jose Perez" son la misma persona.
> Parte 10 de 10 de la serie "Estructuras de Datos y Algoritmos". Final de la serie. Ejemplo simplificado.
**#:** #cienciadedatos #programacion #algoritmos #python #shorts

---

# Serie: Programación en Ciencia de Datos (10 partes)

Caso ficticio en toda la serie: Café Datos. Plantilla `SERIE_PRACTICA` (verde). Título: `[Tema] | Ciencia de datos en práctica #N`.
Plan: 1 Ciclo · 2 Pregunta · 3 Recolección · 4 Datos ordenados · 5 Limpieza · 6 Atípicos · 7 Transformar · 8 EDA · 9 Los 4 tipos de análisis · 10 Comunicar y decidir.

## Parte 1: Ciclo de un proyecto
**Título:** Ciclo de un proyecto | Ciencia de datos en práctica #1
**Miniatura:** `MiniPrac1` → "NO SON MODELOS"
**Descripción:**
> Un dicho entre científicos de datos: la mayor parte del trabajo no son los modelos. El ciclo de un proyecto: pregunta, datos, limpieza, exploración, análisis y comunicar para decidir… y casi nunca es una línea recta. Seguiremos a Café Datos, un café ficticio que quiere vender más, durante las 10 partes.
> Parte 1 de 10 de la serie "Programación en Ciencia de Datos". Café Datos es un caso ficticio.
**#:** #cienciadedatos #analisisdedatos #python #datascience #shorts

## Parte 2: La pregunta correcta
**Título:** La pregunta correcta | Ciencia de datos en práctica #2
**Miniatura:** `MiniPrac2` → "¿VENDER MÁS?"
**Descripción:**
> "Quiero vender más" no es una pregunta de datos: es un deseo. Una buena pregunta dice qué se mide, en qué grupo y en qué tiempo: ¿qué producto se vende menos por las tardes, entre semana, en el último mes? Así sabes qué datos pedir y cuándo terminaste.
> Parte 2 de 10 de la serie "Programación en Ciencia de Datos". Café Datos es un caso ficticio.
**#:** #cienciadedatos #analisisdedatos #datascience #negocios #shorts

## Parte 3: Recolección de datos
**Título:** Recolección de datos | Ciencia de datos en práctica #3
**Miniatura:** `MiniPrac3` → "¿DE DÓNDE SALEN?"
**Descripción:**
> Cada vez que pagas, generas una fila de datos. Café Datos tiene caja registradora, inventario y reseñas; los datos viven en bases de datos (SQL), archivos Excel/CSV o llegan por una API, y con pandas se cargan en una línea (pd.read_csv). Siempre con permiso: los datos personales se protegen.
> Parte 3 de 10 de la serie "Programación en Ciencia de Datos". Café Datos es un caso ficticio.
**#:** #cienciadedatos #python #pandas #datascience #shorts

## Parte 4: Datos ordenados
**Título:** Datos ordenados | Ciencia de datos en práctica #4
**Miniatura:** `MiniPrac4` → "TABLA MAL HECHA"
**Descripción:**
> Una tabla con un mes por columna se ve bonita pero es difícil de analizar. En datos ordenados (tidy), cada fila es una observación y cada columna una variable, y cada variable tiene su tipo: número, categoría, fecha o texto. Con melt, pandas convierte la tabla ancha en larga.
> Parte 4 de 10 de la serie "Programación en Ciencia de Datos". Café Datos es un caso ficticio.
**#:** #cienciadedatos #python #pandas #datascience #shorts

## Parte 5: Limpieza de datos
**Título:** Limpieza de datos | Ciencia de datos en práctica #5
**Miniatura:** `MiniPrac5` → "CDMX ≠ cdmx"
**Descripción:**
> "CDMX", "Ciudad de México" y "cdmx" son el mismo lugar, pero para la computadora son tres. Limpiar datos es revisar faltantes, duplicados, formatos distintos y errores de captura (como un pan dulce de $250). Con pandas: drop_duplicates, replace y str.strip.
> Parte 5 de 10 de la serie "Programación en Ciencia de Datos". Café Datos es un caso ficticio.
**#:** #cienciadedatos #python #pandas #limpiezadedatos #shorts

---

## Semana tipo (20–30 h)

Basado en `yt-plan`: un video principal, uno sencillo, y Shorts. Con la plantilla de Remotion ya
hecha, cada Short nuevo cuesta unas **2–3 h** (idea + verificar datos + adaptar escenas + render).

| Día | Formato | Qué | Horas |
| --- | --- | --- | --- |
| Lun | Short | Paradoja del cumpleaños (listo) | 0,5 |
| Mar | Short | Nuevo Short (plantilla) | 3 |
| Mié | Short | Paradoja de Simpson (listo) | 0,5 |
| Jue | Short | Nuevo Short (plantilla) | 3 |
| Sáb | Video largo | Sistemas de recomendación con Python (sin cara: animación + pantalla) | 12–15 |
| Sáb | Short | ¿Cómo sabe Netflix…? (listo, enlazado al largo) | 0,5 |
| Dom | — | Responder comentarios + ver qué Short retuvo más | 1–2 |

**Total:** ~21–25 h. **Si la semana se complica:** quita primero el video largo y deja los Shorts.

Ideas propias para próximos Shorts: temas explicados desde cero con ejemplos originales (cómo funciona una IA, qué datos genera tu celular en un día, cómo se predice el clima).

**Antes de publicar:** revisa en YouTube Analytics el día y la hora en que tu audiencia está más
activa. No asumas un día fijo.
