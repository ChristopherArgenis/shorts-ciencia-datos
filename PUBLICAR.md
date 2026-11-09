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

## Parte 6: Datos atípicos
**Título:** Datos atípicos | Ciencia de datos en práctica #6
**Miniatura:** `MiniPrac6` → "¿CAFÉ DE $15,000?"
**Descripción:**
> Un ticket de $15,000 en un café: ¿error o el cliente del año? Un dato atípico queda muy lejos de los demás. Con la regla del rango intercuartílico (IQR = Q3 − Q1) todo lo que pase de Q3 + 1.5·IQR (aquí $144.5) se revisa. Revisar no es borrar: un cero de más se corrige; un pedido real para una boda es un hallazgo.
> Parte 6 de 10 de la serie "Programación en Ciencia de Datos". Café Datos es un caso ficticio.
**#:** #cienciadedatos #estadistica #python #pandas #shorts

## Parte 7: Transformar datos
**Título:** Transformar datos | Ciencia de datos en práctica #7
**Miniatura:** `MiniPrac7` → "3 COMANDOS"
**Descripción:**
> ¿Qué día vende más Café Datos? Con 3 comandos de pandas: filtrar (solo este mes), agrupar por día y sumar (groupby: gana el sábado) y unir con el inventario (merge: el fin de semana se acaba el pan). Filtrar, agrupar y unir: el día a día de un científico de datos.
> Parte 7 de 10 de la serie "Programación en Ciencia de Datos". Café Datos es un caso ficticio.
**#:** #cienciadedatos #python #pandas #datascience #shorts

## Parte 8: Análisis exploratorio
**Título:** Análisis exploratorio | Ciencia de datos en práctica #8
**Miniatura:** `MiniPrac8` → "¿POR QUÉ LUNES?"
**Descripción:**
> Antes de concluir, mira tus datos. El análisis exploratorio (EDA) es hacerle preguntas a los datos con gráficas: un histograma muestra que la mayoría de los tickets están entre $50 y $100, y al cruzar producto y día aparece algo: los lunes casi no se vende pan dulce. Explorar no da respuestas finales, da buenas preguntas.
> Parte 8 de 10 de la serie "Programación en Ciencia de Datos". Café Datos es un caso ficticio.
**#:** #cienciadedatos #analisisdedatos #python #visualizacion #shorts

## Parte 9: Los 4 tipos de análisis
**Título:** Los 4 tipos de análisis | Ciencia de datos en práctica #9
**Miniatura:** `MiniPrac9` → "4 ANÁLISIS"
**Descripción:**
> Un café, cuatro preguntas. Descriptivo: ¿qué pasó? (ventas −15%). Diagnóstico: ¿por qué? (llovió 5 días). Predictivo: ¿qué pasará? (más lluvia). Prescriptivo: ¿qué hago? (promo de chocolate caliente y más envíos). Cada tipo es más difícil y aporta más valor.
> Parte 9 de 10 de la serie "Programación en Ciencia de Datos". Café Datos es un caso ficticio.
**#:** #cienciadedatos #analisisdedatos #datascience #negocios #shorts

## Parte 10: Comunicar y decidir
**Título:** Comunicar y decidir | Ciencia de datos en práctica #10
**Miniatura:** `MiniPrac10` → "¿SE DISPARARON?"
**Descripción:**
> Un análisis que nadie entiende no sirve. Una gráfica con el eje empezando en 4,000 hace ver enorme un cambio de +6.5%. Para comunicar: una idea por gráfica, la gráfica correcta y una recomendación clara; y que sea repetible con un notebook y Git. Así Café Datos decide: más pan los fines de semana. Próxima serie: Aprendizaje Automático.
> Parte 10 de 10 de la serie "Programación en Ciencia de Datos". Final de la serie. Café Datos es un caso ficticio.
**#:** #cienciadedatos #visualizacion #datascience #storytelling #shorts

---

# Serie: Aprendizaje Automático (20 partes)

Tronco común (4, dorado) → rama Supervisado (8, naranja) y rama No supervisado (7, morado) → Gran Final (1).
Cada capítulo: reto "Tú vs. el modelo" + mapa de metro al final. Números reales: `python3 scripts/ml/tronco.py` (scikit-learn).
Playlist principal "Aprendizaje Automático" + una por rama.

## Tronco 0: ¿Qué es aprender?
**Título:** ¿Qué es aprender? | Aprendizaje automático #0
**Miniatura:** `MiniML0` → "¿LO APRENDIÓ?"
**Descripción:**
> Nadie le escribió a tu correo qué es spam: lo aprendió. Con reglas ("si dice GRATIS, es spam") todo se rompe; el aprendizaje automático no recibe reglas, recibe ejemplos y encuentra el patrón solo. Hay dos caminos: supervisado (con respuestas) y no supervisado (sin respuestas). Arranca la serie: 20 partes en forma de mapa de metro.
> Tronco común, parte 0 de la serie "Aprendizaje Automático". Café Datos es un caso ficticio; los modelos se entrenaron de verdad.
**#:** #machinelearning #inteligenciaartificial #cienciadedatos #python #shorts

## Tronco 1: Entrenamiento y prueba
**Título:** Entrenamiento y prueba | Aprendizaje automático #1
**Miniatura:** `MiniML1` → "¿HICISTE TRAMPA?"
**Descripción:**
> Si estudias con el examen, sacas 10 y no aprendiste nada. Por eso los datos se separan: 160 días de Café Datos para entrenar y 40 que el modelo nunca ve, como examen (train_test_split). Resultado real: se equivoca por unas 8.1 tazas al día. Ese número sí es creíble.
> Tronco común, parte 1 de la serie "Aprendizaje Automático". Café Datos es un caso ficticio; los modelos se entrenaron de verdad.
**#:** #machinelearning #cienciadedatos #python #scikitlearn #shorts

## Tronco 2: Sobreajuste
**Título:** Sobreajuste | Aprendizaje automático #2
**Miniatura:** `MiniML2` → "100% = PÉSIMO"
**Descripción:**
> Tres modelos, mismos datos. La recta es muy simple (subajuste). La curva loca pasa por todos los puntos: error 0.0 en entrenamiento… y 59.7 en datos nuevos: memorizó (sobreajuste). La curva suave gana: 4.0 y 6.9. Para elegirla se usa validación cruzada.
> Tronco común, parte 2 de la serie "Aprendizaje Automático". Café Datos es un caso ficticio; los modelos se entrenaron de verdad.
**#:** #machinelearning #cienciadedatos #python #scikitlearn #shorts

## Tronco 3: Variables
**Título:** Variables | Aprendizaje automático #3
**Miniatura:** `MiniML3` → "¿Y LA LLUVIA?"
**Descripción:**
> El modelo no ve la lluvia a menos que se la des. Con temperatura y fin de semana, se equivoca por 19.1 tazas al día; al agregar "¿llovió?", el error baja a 8.1. Elegir y crear buenas variables (features) es uno de los trabajos más importantes. Siguiente: aprendizaje supervisado.
> Tronco común, parte 3 de la serie "Aprendizaje Automático". Café Datos es un caso ficticio; los modelos se entrenaron de verdad.
**#:** #machinelearning #cienciadedatos #python #featureengineering #shorts

### Rama Supervisado (8, naranja) — playlist "Aprendizaje supervisado"
Números reales: `python3 scripts/ml/supervisado.py` (scikit-learn + palmerpenguins).

## Supervisado 1: Regresión vs clasificación
**Título:** Regresión vs clasificación | Aprendizaje supervisado #1
**Miniatura:** `MiniSup1` → "¿NÚMERO O ESPECIE?"
**Descripción:**
> ¿Cuánto pesa este pingüino? ¿De qué especie es? Si la respuesta es un número, es regresión (el modelo falla por ±280 g); si es una categoría, es clasificación (acierta 98.8%). En los dos casos aprendió con respuestas conocidas: eso es aprendizaje supervisado.
> Datos reales: pingüinos de Palmer (Gorman, Williams & Fraser 2014, Palmer Station LTER). Parte 1 de 8 de la rama Supervisado (serie "Aprendizaje Automático").
**#:** #machinelearning #cienciadedatos #python #scikitlearn #shorts

## Supervisado 2: K vecinos más cercanos
**Título:** K vecinos más cercanos | Aprendizaje supervisado #2
**Miniatura:** `MiniSup2` → "¿CON QUIÉN ANDAS?"
**Descripción:**
> Dime con quién andas y te diré qué pingüino eres. K vecinos más cercanos (KNN) busca los 5 pingüinos más parecidos por su pico y los pone a votar: los 5 dicen Barbijo. Con k=1 acierta 94.0%; con k=5, 98.8%.
> Datos reales: pingüinos de Palmer (Gorman, Williams & Fraser 2014, Palmer Station LTER). Parte 2 de 8 de la rama Supervisado (serie "Aprendizaje Automático").
**#:** #machinelearning #cienciadedatos #knn #python #shorts

## Supervisado 3: Regresión logística
**Título:** Regresión logística | Aprendizaje supervisado #3
**Miniatura:** `MiniSup3` → "¿VUELVE? 93%"
**Descripción:**
> ¿Este cliente va a regresar? La regresión logística convierte los datos en una probabilidad: Ana (8 visitas) 93%, Luis (2 visitas) 13%. Con un corte de 50% se decide quién recibe la promoción.
> Café Datos es un caso ficticio. Modelo entrenado de verdad. Parte 3 de 8 de la rama Supervisado (serie "Aprendizaje Automático").
**#:** #machinelearning #cienciadedatos #python #regresionlogistica #shorts

## Supervisado 4: Bosques aleatorios
**Título:** Bosques aleatorios | Aprendizaje supervisado #4
**Miniatura:** `MiniSup4` → "100 ÁRBOLES"
**Descripción:**
> Un árbol de decisión falla en 4 de 84 pingüinos; un bosque aleatorio de 100 árboles que votan falla solo en 2. Además dice qué importa más: el largo del pico (42%) y la aleta (32%).
> Datos reales: pingüinos de Palmer (Gorman, Williams & Fraser 2014, Palmer Station LTER). Parte 4 de 8 de la rama Supervisado (serie "Aprendizaje Automático").
**#:** #machinelearning #cienciadedatos #randomforest #python #shorts

## Supervisado 5: Matriz de confusión
**Título:** Matriz de confusión | Aprendizaje supervisado #5
**Miniatura:** `MiniSup5` → "99% INÚTIL"
**Descripción:**
> Un detector de fraude que siempre dice "no es fraude" acierta 98.9%… y no atrapa ningún fraude. La matriz de confusión lo revela: este modelo atrapa 30 de 33 fraudes (exhaustividad 91%), pero de 213 alarmas solo 30 son reales (precisión 14%).
> Pagos ficticios; modelos entrenados de verdad. Parte 5 de 8 de la rama Supervisado (serie "Aprendizaje Automático").
**#:** #machinelearning #cienciadedatos #python #metricas #shorts

## Supervisado 6: Boosting
**Título:** Boosting | Aprendizaje supervisado #6
**Miniatura:** `MiniSup6` → "¿MÁS ES MEJOR?"
**Descripción:**
> Boosting entrena árboles pequeños en cadena: cada uno corrige los errores del anterior. El primero falla por ±27.2 tazas; con 20 árboles, ±10.4; con 100, ±9.5… y con 200 empeora a ±9.8. Más no siempre es mejor.
> Café Datos es un caso ficticio. Modelo entrenado de verdad. Parte 6 de 8 de la rama Supervisado (serie "Aprendizaje Automático").
**#:** #machinelearning #cienciadedatos #boosting #python #shorts

## Supervisado 7: Redes neuronales
**Título:** Redes neuronales | Aprendizaje supervisado #7
**Miniatura:** `MiniSup7` → "243 PERILLAS"
**Descripción:**
> Una red neuronal con capas 4 → 16 → 8 → 3: entran cuatro medidas de un pingüino y salen tres especies. Sus 243 "perillas" se ajustan solas con descenso de gradiente durante 440 rondas. Resultado: 98.8% de aciertos. Los modelos de lenguaje funcionan igual, con miles de millones de perillas.
> Datos reales: pingüinos de Palmer (Gorman, Williams & Fraser 2014, Palmer Station LTER). Parte 7 de 8 de la rama Supervisado (serie "Aprendizaje Automático").
**#:** #machinelearning #redesneuronales #inteligenciaartificial #python #shorts

## Supervisado 8: Proyecto completo
**Título:** Proyecto completo | Aprendizaje supervisado #8
**Miniatura:** `MiniSup8` → "DATOS → PREDICCIÓN"
**Descripción:**
> De datos crudos a una predicción: cargar 344 pingüinos, limpiar (quedan 333), separar, escalar, entrenar un bosque aleatorio y evaluar: 97.6% en el examen. ¿Y el pingüino que nadie había visto? Papúa. Final de la rama supervisada.
> Datos reales: pingüinos de Palmer (Gorman, Williams & Fraser 2014, Palmer Station LTER). Parte 8 de 8 de la rama Supervisado (serie "Aprendizaje Automático").
**#:** #machinelearning #cienciadedatos #python #scikitlearn #shorts

### Rama No supervisado (7, morado) — playlist "Aprendizaje no supervisado" + Gran Final
Números reales: `python3 scripts/ml/nosupervisado.py`.

## No supervisado 1: Aprender sin respuestas
**Título:** Aprender sin respuestas | Aprendizaje no supervisado #1
**Miniatura:** `MiniNos1` → "SIN RESPUESTAS"
**Descripción:**
> Nadie le dijo qué buscar y encontró 3 grupos. En el aprendizaje no supervisado no hay respuestas, solo datos: el modelo agrupa lo que se parece. ¿Coinciden los grupos con las especies reales de pingüinos? Lo revelamos en el Gran Final.
> Datos reales: pingüinos de Palmer (Gorman, Williams & Fraser 2014, Palmer Station LTER). Parte 1 de 7 de la rama No supervisado (serie "Aprendizaje Automático").
**#:** #machinelearning #cienciadedatos #clustering #python #shorts

## No supervisado 2: K-means
**Título:** K-means | Aprendizaje no supervisado #2
**Miniatura:** `MiniNos2` → "¿QUÉ TIPO DE CLIENTE?"
**Descripción:**
> ¿Cuántos tipos de cliente tiene tu café? K-means pone 3 centros, cada cliente se une al más cercano y los centros se mueven al promedio de su grupo hasta que ya no cambian. Resultado: frecuentes (~12 visitas/mes), ocasionales (~3) y de ticket alto (~$140).
> Clientes ficticios de Café Datos; modelo entrenado de verdad. Parte 2 de 7 de la rama No supervisado (serie "Aprendizaje Automático").
**#:** #machinelearning #kmeans #cienciadedatos #python #shorts

## No supervisado 3: Método del codo
**Título:** Método del codo | Aprendizaje no supervisado #3
**Miniatura:** `MiniNos3` → "¿CUÁNTOS GRUPOS?"
**Descripción:**
> Con más grupos el error siempre baja, pero un grupo por cliente no sirve. El método del codo busca dónde la curva deja de bajar rápido: aquí en 3. La silueta lo confirma: 0.77 con 3 grupos, la mejor separación.
> Clientes ficticios de Café Datos; modelos entrenados de verdad. Parte 3 de 7 de la rama No supervisado (serie "Aprendizaje Automático").
**#:** #machinelearning #kmeans #cienciadedatos #python #shorts

## No supervisado 4: DBSCAN vs K-means
**Título:** DBSCAN vs K-means | Aprendizaje no supervisado #4
**Miniatura:** `MiniNos4` → "K-MEANS FALLA"
**Descripción:**
> Dos lunas: K-means busca grupos redondos y las corta a la mitad (23% de acierto). DBSCAN agrupa por densidad, conecta puntos con muchos vecinos cerca y separa las dos lunas perfectamente (100%). Cada algoritmo ve una forma distinta.
> Datos sintéticos (make_moons); modelos entrenados de verdad. Parte 4 de 7 de la rama No supervisado (serie "Aprendizaje Automático").
**#:** #machinelearning #clustering #dbscan #python #shorts

## No supervisado 5: PCA
**Título:** PCA | Aprendizaje no supervisado #5
**Miniatura:** `MiniNos5` → "4D → 2D"
**Descripción:**
> Cada pingüino tiene 4 medidas, imposible de dibujar. PCA busca las direcciones donde los datos cambian más y proyecta todo ahí, como una sombra bien elegida: con 2 ejes conserva el 88% de la información (69% + 19%) y las especies se ven separadas.
> Datos reales: pingüinos de Palmer (Gorman, Williams & Fraser 2014, Palmer Station LTER). Parte 5 de 7 de la rama No supervisado (serie "Aprendizaje Automático").
**#:** #machinelearning #pca #cienciadedatos #python #shorts

## No supervisado 6: Detectar anomalías
**Título:** Detectar anomalías | Aprendizaje no supervisado #6
**Miniatura:** `MiniNos6` → "12/12 RARAS"
**Descripción:**
> ¿Se pueden encontrar fraudes sin ejemplos de fraude? Sí: el bosque de aislamiento hace cortes al azar y lo raro queda solo rápido. Escondimos 12 compras extrañas entre 2,000 (montos enormes de madrugada): el modelo marcó 20 sospechosas y ahí estaban las 12.
> Transacciones ficticias; modelo entrenado de verdad. Parte 6 de 7 de la rama No supervisado (serie "Aprendizaje Automático").
**#:** #machinelearning #deteccionanomalias #cienciadedatos #python #shorts

## No supervisado 7: Reglas de asociación
**Título:** Reglas de asociación | Aprendizaje no supervisado #7
**Miniatura:** `MiniNos7` → "LATTE + ¿QUÉ?"
**Descripción:**
> Quien compra latte, ¿qué más compra? En 1,000 tickets, latte y pan dulce salen juntos en el 21.8% (soporte) y el 49% de quienes piden latte piden pan (confianza): 1.57× más de lo esperado por azar (lift). Así nacen los combos.
> Tickets ficticios de Café Datos; reglas calculadas de verdad. Parte 7 de 7 de la rama No supervisado (serie "Aprendizaje Automático").
**#:** #machinelearning #cienciadedatos #analisisdecanasta #python #shorts

## Gran Final: Gran Final
**Título:** Gran Final | Aprendizaje automático
**Miniatura:** `MiniFinal` → "GRAN FINAL"
**Descripción:**
> Los mismos pingüinos, dos mundos: supervisado (aprendió con la especie) vs no supervisado (nunca la vio). Al comparar los grupos con las especies reales, Papúa queda perfecto y Adelia y Barbijo se mezclan un poco. Sin ver ni una etiqueta coincidió en 91.9%; con etiquetas, 97.6%. Fin de la serie.
> Datos reales: pingüinos de Palmer (Gorman, Williams & Fraser 2014, Palmer Station LTER). Gran Final de la serie "Aprendizaje Automático".
**#:** #machinelearning #inteligenciaartificial #cienciadedatos #python #shorts

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
