# Plan: serie suelta "Cómo leemos el universo" (astronomía con datos)

Misma fórmula que "cómo ve una computadora":
- 10 Shorts de 20 a 30 s, sin número ni nombre en pantalla. El orden lo da la lista.
- Una sola idea por video, de lo básico a lo más avanzado.
- Hilo común: **todo lo que sabemos del universo sale de leer su luz como datos**. Arranca en "la luz tarda en llegar" y termina con la foto de un agujero negro, que conecta con la serie de imágenes.
- Plantilla de `CLAUDE.md`: paradoja en la primera frase, giro a mitad del video, cambio visual cada 4 s o menos y cierre en bucle.
- **Cálculo en código** siempre que se pueda (como la convolución o el 4:2:0), y los datos de misiones con su fuente en pantalla.
- **Imágenes:** ilustraciones propias generadas en código (cielo, estrellas, espectros, curvas). Sin fotos de NASA/ESA aunque sean de dominio público, para mantener el estilo.

Las cifras con ✔ ya las calculé aquí. Las marcadas "≈" las tengo de memoria y **falta verificarlas** antes de producir cada video.

## Orden de la lista

| # | Título | Primera frase (premisa + dato que la contradice) | Dato y cómo se obtiene | Giro |
|---|---|---|---|---|
| 1 | El Sol que ves es de hace 8 minutos | "Ese Sol que ves no es el de ahora. Es el de hace ocho minutos." | ✔ 149.6 millones de km ÷ velocidad de la luz = 499 s | La galaxia de Andrómeda la ves como era hace ≈ 2.5 millones de años |
| 2 | Las estrellas rojas son las más frías | "El rojo parece caliente y el azul, frío. En el cielo es al revés." | ✔ Ley de Wien: el Sol (5,772 K) brilla más en 502 nm. Espectro de cuerpo negro calculado en código | El Sol "es" verde… pero lo ves blanco |
| 3 | Hallamos helio en el Sol antes que en la Tierra | "Nadie ha tocado el Sol. Y sabemos de qué está hecho." | Rayas del espectro: huella de cada elemento. ≈ Helio visto en el Sol en 1868 y aislado en la Tierra en 1895 | Su nombre viene de *Helios*, el Sol |
| 4 | Puedes medir una estrella con tu pulgar | "La estrella más cercana está a 40 billones de km… y la medimos con un truco de tu pulgar." | Paralaje: guiña un ojo y el pulgar "salta". ≈ Próxima Centauri: 0.768″ ≈ 4.24 años luz. ✔ Es como ver una moneda de 2 cm a 5.4 km | La misión Gaia ya midió así ≈ 1,800 millones de estrellas |
| 5 | La Tierra apaga al Sol solo un 0.008 % | "Para encontrar planetas no hay que verlos: basta con que la estrella se apague un poquito." | ✔ (radio de la Tierra ÷ radio del Sol)² = 84 partes por millón. Júpiter: ✔ 1 %. Curva de luz simulada | Así encontró Kepler más de 2,600 planetas (NASA) sin ver ninguno |
| 6 | Este telescopio guarda 20 TB cada noche | "Mirar el cielo parece calma… este telescopio genera más datos que Netflix en un día." *(revisar la comparación)* | ≈ Observatorio Vera Rubin: ≈ 20 TB por noche y ≈ 10 millones de alertas | Ningún humano puede revisarlo: filtran algoritmos |
| 7 | Una IA encontró un planeta que nadie vio | "Kepler buscó planetas durante años. Una IA encontró uno que se le había escapado a los humanos." | ≈ Kepler-90i (2017, red neuronal de Shallue y Vanderburg) | Con él, Kepler-90 empata a nuestro Sistema Solar: 8 planetas |
| 8 | Las galaxias giran demasiado rápido | "Lo de afuera de una galaxia debería girar más lento… y gira igual de rápido." | Curva de rotación esperada contra la medida (Vera Rubin, años 70). Gráfica calculada en código | Falta masa que no vemos: ≈ 85 % de la materia es oscura |
| 9 | Hubble falló por 7× (y aun así tenía razón) | "Casi todas las galaxias se alejan de ti… y no eres el centro del universo." | Corrimiento al rojo. ≈ Hubble (1929) calculó ≈ 500 km/s/Mpc; hoy ≈ 70 | Acertó la idea (el universo se expande) aunque falló el número |
| 10 | La foto del agujero negro viajó en avión | "La primera foto de un agujero negro no se mandó por internet… se mandó en avión." | ≈ Event Horizon Telescope (2019): 8 radiotelescopios y ≈ 5 petabytes en discos duros | La imagen se reconstruyó con algoritmos que llenan huecos: retoma la idea de que una imagen son números |

## Cómo se engancha la lista
Cada video deja una pregunta que el siguiente responde, sin anunciarlo:
- #1 la luz tarda → #2 qué dice su color → #3 qué dicen sus rayas.
- #4 cómo medimos la distancia → #5 cómo vemos planetas por la luz → #6 son demasiados datos → #7 una IA los revisa.
- #8 la luz muestra que falta masa → #9 la luz muestra que todo se aleja → #10 una "foto" armada con datos.

## Visuales que se hacen en código (como en la serie de imágenes)
- #2: espectro de cuerpo negro de verdad (fórmula de Planck) para 3,000 K, 5,800 K y 12,000 K, y su color resultante.
- #3: espectro del Sol con sus rayas oscuras. Las del helio se iluminan.
- #4: animación del pulgar que salta, y luego la Tierra en dos puntos de su órbita.
- #5: curva de luz con el bache del tránsito, a escala para Júpiter y para la Tierra.
- #8: dos curvas, la esperada (cae) y la medida (plana).
- #9: galaxias en pixel art alejándose de cualquier punto que elijas, como un pan de pasas.

## Antes de producir cada uno
- Verificar las cifras marcadas "≈" en la fuente original: NASA, ESA, el artículo, la misión.
- Cerrar cada guion con su bucle y revisar título y miniatura con el linter.
