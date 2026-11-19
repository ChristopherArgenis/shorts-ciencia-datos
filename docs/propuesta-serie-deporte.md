# Propuesta: serie "El marcador miente" (deporte con datos)

Misma fórmula que la serie de visión:
- 10 Shorts de 20 a 30 s, sin número ni nombre en pantalla.
- El orden lo da la lista de reproducción.
- Cada uno sigue la plantilla de `CLAUDE.md`: paradoja en la primera frase, giro a mitad del video y cierre en bucle.

**Por qué deporte:** el Short que más retuvo fue StatsBomb (57.8 %). Abría con un número grande y una cancha llenándose desde el primer cuadro.

**Regla de datos:** antes de producir cada video, verifico la cifra en la fuente original o la calculo en este repo con datos abiertos y gratis:
- StatsBomb Open Data (GitHub).
- football-data.co.uk (CSV gratis).
- La base de F1 de Jolpica, la sucesora gratuita de Ergast.

Las cifras marcadas "≈" salen de memoria y **falta verificarlas**.

## Orden propuesto

| # | Título (curiosidad) | Primera frase (premisa + dato que la contradice) | Dato y fuente | Giro |
|---|---|---|---|---|
| 1 | Federer ganó más puntos… y perdió la final | "Ganó más puntos que su rival. Y perdió." | Wimbledon 2019: Federer 218 puntos, Djokovic 204 | No todos los puntos valen igual: el tenis premia los puntos clave |
| 2 | El portero que no se mueve ataja más | "Casi todos los porteros se lanzan. Quedarse quieto ataja más del doble." | ≈ 286 penaltis, 94 % se lanzan; al centro se atajan ≈ 33 % (Bar-Eli et al., 2007) | Se lanzan porque fallar quieto "se ve peor" |
| 3 | Nacer en enero te hace futbolista | "El talento no tiene fecha… pero las selecciones juveniles sí." | Efecto de edad relativa: sobran los nacidos en enero a marzo (Helsen et al., 2005) | No son mejores: son meses más grandes cuando los eligen |
| 4 | La mano caliente sí existe (y la ciencia se equivocó 30 años) | "Durante 30 años, la ciencia dijo que la racha era un mito." | Gilovich et al., 1985 frente a Miller y Sanjurjo, 2018 | Había un sesgo escondido en cómo se contaban las rachas |
| 5 | Por qué tantos maratonistas llegan en 3:59 | "Llegar en 3:59 o en 4:01 no debería importar… pero miles corren por ese minuto." | Tiempos amontonados antes de las horas redondas (Allen et al., 2017, ≈ 9 millones de tiempos) | Las metas redondas cambian cómo corres |
| 6 | Sin público, el local dejó de ganar | "Jugar en casa es ventaja… hasta que se vaciaron los estadios." | 2020 sin público: lo calculo con football-data.co.uk | La ventaja era el público y el árbitro, no la cancha |
| 7 | Un penal vale 0.76 goles | "Un penal parece gol seguro. Para los datos, vale tres cuartos." | xG del penal ≈ 0.76–0.79: lo calculo con StatsBomb Open Data | Así se mide si un delantero tuvo suerte o talento |
| 8 | El mejor equipo de la temporada casi siempre empeora | "El campeón se refuerza… y aun así suele bajar." | Regresión a la media: lo calculo con football-data.co.uk | Parte del récord era suerte, y la suerte no se ficha |
| 9 | Salir primero en F1 no es ganar | "La pole es la mejor posición. Y aun así pierde la mitad de las veces." | % de victorias desde la pole: lo calculo con la base de Jolpica | Depende del circuito: en Mónaco casi se gana; en otros, no |
| 10 | El favorito casi nunca gana el Mundial | "Hay un favorito cada Mundial… y casi nunca levanta la copa." | Simulación Monte Carlo con ratings Elo (ejemplo marcado como simulación) | Siete partidos a eliminación: el azar se multiplica |

## Notas
- **Enlaces con videos que ya tienes**, mejor en la descripción que dentro del video:
  - El #7 con StatsBomb.
  - El #8 con Mates (regresión).
  - El #10 con Algoritmos (simulación).
- **Imágenes:** ilustraciones propias, sin logos, fotos de jugadores ni escudos. Solo nombres y datos públicos.
- **Prioridad de producción:**
  - El **#1** y el **#2**: los ganchos más fuertes.
  - Luego el **#7**: sus datos los calculo yo, igual que en StatsBomb.
  - Al final el **#6**, el **#8** y el **#9**: hay que bajar CSV, así que primero confirmo que la red del entorno lo permite.
