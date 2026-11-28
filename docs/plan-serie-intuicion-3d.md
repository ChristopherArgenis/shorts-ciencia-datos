# Plan: serie suelta en 3D "Tu intuición pierde" (decisiones contra los números)

**Idea:** en cada Short, una **persona en 3D** enfrenta una decisión que parece obvia. El gancho
plantea el dilema y la respuesta va en contra de la intuición, así que es difícil no quedarse a ver
el final.

Misma fórmula que las series anteriores:
- 10 Shorts de 20 a 30 s, sin número ni nombre en pantalla. El orden lo da la lista.
- Plantilla de `CLAUDE.md`: paradoja en la primera frase, giro a mitad del video y cierre en bucle.
- **Escenas en 3D** con el kit `src/kit/three/`: humanoides, poses y objetos. Los números y las gráficas, en 2D.
- **Cálculo o simulación en código** siempre que se pueda (Monte Carlo en Python, como con scikit-learn).

**Personas nuevas que hay que añadir al kit:**
- Multitudes de humanoides (instanciadas, para 1,000 personas).
- 3 o 4 aspectos más de ropa y piel.
- Poses nuevas: caminar, sentarse, señalar una puerta y celebrar.

Las cifras con ✔ las calculé aquí. Las marcadas "≈" son de memoria y **falta verificarlas** antes de producir cada video.

## Orden de la lista (del gancho más fuerte al cierre)

| # | Título | Gancho (primeros 3 s) | En 3D | Respuesta / giro |
|---|---|---|---|---|
| 1 | Diste positivo al 99 %… y casi seguro estás sano | Una persona recibe un resultado "POSITIVO" de una prueba que acierta el 99 % | Una multitud de 1,000 personas; 1 está enferma y se ilumina en rojo | ✔ Si 1 de cada 1,000 tiene la enfermedad, solo **9 %** de los positivos están enfermos (los falsos positivos ganan) |
| 2 | ¿Cambias de puerta? Casi todos eligen mal | La persona elige una de 3 puertas; el presentador abre otra con una cabra | 3 puertas, el presentador y la persona que duda | Cambiar gana **2 de 3** veces. ✔ Simulación de 10,000 juegos en pantalla |
| 3 | Salió negro 26 veces seguidas y todos perdieron | Una ruleta en Montecarlo, 1913, y la multitud que apuesta todo al rojo | Ruleta girando y gente apostando cada vez más | La ruleta no tiene memoria: falacia del jugador. ≈ 26 negros seguidos, Montecarlo 1913 |
| 4 | Blindaron los aviones donde no había balas | Mecánicos en un hangar marcando los agujeros de bala de los aviones que regresaron | Avión 3D con agujeros que se llenan y una persona que señala | Abraham Wald: había que blindar donde **no** había agujeros, porque esos aviones no volvieron. Sesgo del sobreviviente. ≈ Verificar la historia real |
| 5 | Tus amigos tienen más amigos que tú | Una persona en una red de amigos, con el contador "tú: 3 amigos" | Red de humanoides unidos por líneas; las personas populares aparecen en muchas listas | ✔ Simulación en una red: casi todos tienen menos amigos que el promedio de sus amigos (Feld, 1991) |
| 6 | 800 extraños adivinaron el peso de un buey | Feria de 1906: un buey y una fila de personas anotando su apuesta | El buey (hecho de piezas simples) y la multitud | ≈ Galton: el centro de las 787 apuestas quedó a menos del 1 % del peso real. Sabiduría de las masas |
| 7 | Rechaza al primer 37 % de tus citas | Una persona frente a una fila de 10 candidatos que pasan de uno en uno | Fila de humanoides que avanza; los primeros se descartan | ✔ Regla del 37 % (1/e): maximiza la probabilidad de elegir al mejor. Simulación en pantalla |
| 8 | Tu autobús siempre tarda más de lo prometido | Una persona en la parada: "pasa cada 10 min"… y espera mucho más | Parada 3D con autobuses que llegan desordenados | Paradoja de la inspección: llegas más seguido durante los huecos largos. ✔ Simulación |
| 9 | El número 1 delata a los que hacen fraude | Un contador revisa facturas; el "1" aparece por todos lados | Escritorio, persona y montaña de facturas | Ley de Benford: ≈ 30 % de los números reales empieza con 1. ✔ Calculado con datos públicos (poblaciones de países) |
| 10 | Estás a 4 personas de cualquier humano | Una persona y un desconocido al otro lado del mundo | El globo 3D con cadenas de personas que se conectan | ≈ Milgram (1967) contó ~6 pasos; Facebook (2016), ≈ 3.57. Cierra la lista con la red completa |

## Por qué engancha
- **Cada gancho pide una decisión o una apuesta** ("¿cambias de puerta?", "¿a qué color apostarías?"). El espectador elige mentalmente y se queda para ver si acertó.
- **La persona 3D le da a alguien por quién preocuparse:** el paciente asustado, el jugador que lo pierde todo, el mecánico.
- **Cierre en bucle:** la última frase devuelve al dilema del inicio. Por ejemplo, en el #1: "…y por eso, aunque diste positivo," → "casi seguro estás sano".
- **Variedad entre videos:** salud, juegos, guerra, amigos, citas, transporte, fraude y el planeta.

## Para producir (según lo acordado: de uno en uno)
1. Verificar las cifras marcadas "≈" en la fuente original (#3, #4, #6, #9, #10).
2. Añadir al kit las multitudes, la caminata y los aspectos nuevos (una sola vez, sirve para toda la serie).
3. Guion con la tabla de Tiempo | Voz | Pantalla, revisado con el linter de títulos.
4. Revisar cuadros, renderizar y entregar el paquete completo.
