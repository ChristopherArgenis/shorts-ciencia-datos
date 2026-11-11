# Plan: 3 series de bases de datos (formato largo, para después)

Hilo común: **"Liga Datos" ⚽**, una liga de fútbol que crece en tres etapas.

| Serie | La historia | Qué aprende la audiencia |
|---|---|---|
| 1. Bases de Datos | La liga guarda jugadores, clubes y partidos en tablas | SQL: organizar y consultar datos |
| 2. Bases de Datos Avanzadas (NoSQL) | La liga lanza una app con marcador en vivo, fichas y redes de pases | Otros tipos de bases de datos |
| 3. Datos Masivos | Millones de eventos por temporada; una computadora ya no alcanza | Procesar datos enormes |

Cada serie con numeración propia (#1–#10), color y playlist. El último capítulo de cada una anuncia la siguiente.

## Serie 1: Bases de Datos (SQL) — turquesa

| # | Tema | Gancho | Ejemplo de fútbol |
|---|---|---|---|
| 1 | ¿Qué es una base de datos? | "Tu álbum de estampas ya es una base de datos." | Álbum → tabla de jugadores |
| 2 | Tablas y llave primaria | "Hay dos jugadores llamados Hernández. ¿Cuál anotó?" | Cada jugador con un ID único |
| 3 | Relaciones (llave foránea) | "¿En qué club juega? No lo escribas 300 veces." | Jugador → club |
| 4 | SELECT y WHERE | "¿Quién metió más de 20 goles?" | Filtrar goleadores |
| 5 | ORDER BY y LIMIT | "El top 5 de goleadores, en una línea." | Tabla de goleo |
| 6 | GROUP BY | "¿Qué club anota más?" | Goles por club |
| 7 | JOIN | "Un jugador, su club y su estadio en una sola consulta." | Unir tablas |
| 8 | Normalización | "Un fichaje rompió toda la tabla." | Por qué no se repiten datos |
| 9 | Índices | "Encontrar un jugador entre un millón al instante." | Conecta con búsqueda binaria y hash |
| 10 | Transacciones (ACID) | "El dinero salió del club… y nunca llegó." | Un fichaje se hace completo o no se hace |

Consultas reales en SQLite (incluido en Python, gratis).

## Serie 2: Bases de Datos Avanzadas (NoSQL) — magenta

| # | Tema | Gancho | Ejemplo de fútbol |
|---|---|---|---|
| 1 | ¿Por qué NoSQL? | "Las tablas no aguantan un partido en vivo." | App de la liga |
| 2 | Documentos (tipo MongoDB) | "Cada jugador es un documento, no una fila." | Ficha con lesiones y posiciones variables |
| 3 | Consultas a documentos | "Buscar dentro de la ficha." | Jugadores con más de 2 lesiones |
| 4 | Clave-valor (tipo Redis) | "El marcador se actualiza en milisegundos." | Marcador en vivo y caché |
| 5 | Columnas anchas (tipo Cassandra) | "Millones de eventos ordenados por tiempo." | Cada pase y tiro del partido |
| 6 | Grafos (tipo Neo4j) | "¿Quién conecta al equipo?" | Red de pases y de transferencias |
| 7 | Esquema flexible vs rígido | "Agregar un dato nuevo sin romper nada." | Nuevo dato: velocidad máxima |
| 8 | Teorema CAP | "Dos apps: una dice 1-0, la otra 1-1." | Consistencia vs disponibilidad |
| 9 | Replicación y sharding | "Una liga por servidor." | Repartir los datos |
| 10 | ¿SQL o NoSQL? | "La respuesta correcta: los dos." | La app usa varias bases de datos a la vez |

Solo versiones locales gratuitas o librerías de Python; nada de servicios en la nube de pago.

## Serie 3: Datos Masivos — rojo

| # | Tema | Gancho | Ejemplo de fútbol |
|---|---|---|---|
| 1 | ¿Qué es Big Data? Las 5 V | "Un partido tiene unos 3,300 eventos. ¿Y una temporada?" | Conecta con el Short de StatsBomb |
| 2 | ¿Cuándo es "masivo"? | "Excel se rinde en la fila 1,048,576." | Del Excel al clúster |
| 3 | Sistemas distribuidos | "Una computadora tarda horas; mil, segundos." | Repartir el trabajo |
| 4 | Almacenamiento distribuido (HDFS) | "Tus datos guardados en 3 lugares a la vez." | Copias que sobreviven a fallas |
| 5 | MapReduce | "Contar todos los goles de la historia." | Mapear y reducir |
| 6 | Spark | "Lo mismo, pero en memoria." | PySpark local y gratis |
| 7 | Streaming | "Analizar el partido mientras se juega." | Eventos en tiempo real |
| 8 | Formatos: CSV vs Parquet | "El mismo archivo, mucho más ligero." | Tamaño medido de verdad |
| 9 | Pipelines (ETL) | "De la cámara del estadio al dashboard." | El camino de un dato |
| 10 | Proyecto final | "Una temporada entera, analizada." | Datos abiertos de StatsBomb |

## Decisiones pendientes
- **Futbolistas:** recomendado híbrido — liga y jugadores ficticios en SQL/NoSQL ("Datos ficticios" en pantalla); datos reales de StatsBomb en Datos Masivos.
- **StatsBomb open data:** gratis, pero su licencia pide citar a StatsBomb y usar su logo; puede requerir aprobar acceso de red a GitHub.
- **Títulos:** `JOIN | Bases de datos #7`, `Teorema CAP | Bases de datos NoSQL #8`, `MapReduce | Datos masivos #5`.
