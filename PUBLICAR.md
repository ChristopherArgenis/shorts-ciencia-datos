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
