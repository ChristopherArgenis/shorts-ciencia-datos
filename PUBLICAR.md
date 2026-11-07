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

## Short 5: Sesgo del superviviente (los aviones de Wald)

**Título:** ¿Dónde blindarías este avión? (94/100)
**Alternativa:** El sesgo del superviviente en 30 segundos (94/100)
**Bucle:** "¿Y ahora dónde lo blindarías?"
**Nota:** historia real (Abraham Wald, Statistical Research Group, 1943). El dibujo de impactos es
ilustrativo y así lo dice en pantalla.

**Descripción:**
> En la Segunda Guerra Mundial, los aviones que volvían tenían impactos en alas, fuselaje y cola. Lo obvio era blindar ahí. El matemático Abraham Wald propuso lo contrario: blindar donde NO había impactos, porque los aviones alcanzados en esas zonas no regresaban. Se llama sesgo del superviviente: los datos que faltan también hablan.
>
> #cienciadedatos #estadistica #sesgodelsuperviviente #historia #shorts

**Comentario fijado:** ¿Dónde lo habrías blindado tú antes de ver el final? 👇

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

Ideas para los próximos Shorts con el mismo patrón: el problema de Monty Hall, la Ley de Benford
(¿por qué hay más números que empiezan con 1?), el sesgo del superviviente (los aviones de la
Segunda Guerra Mundial), el xG en el fútbol, correlación ≠ causalidad (helados y ahogados).

**Antes de publicar:** revisa en YouTube Analytics el día y la hora en que tu audiencia está más
activa. No asumas un día fijo.
