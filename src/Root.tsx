import { Composition, Folder, Still } from "remotion";
import { Cumpleanos } from "./shorts/Cumpleanos";
import { Simpson } from "./shorts/Simpson";
import { Recomendador } from "./shorts/Recomendador";
import { F1 } from "./shorts/F1";
import { ComoFuncionaClaude } from "./shorts/ComoFuncionaClaude";
import { StatsBomb } from "./shorts/StatsBomb";
import { Mates1Mediana, TOTAL_M1 } from "./shorts/serie/Mates1Mediana";
import { Mates2Desviacion, TOTAL_M2 } from "./shorts/serie/Mates2Desviacion";
import { Mates3Normal, TOTAL_M3 } from "./shorts/serie/Mates3Normal";
import { Mates4Bayes, TOTAL_M4 } from "./shorts/serie/Mates4Bayes";
import { Mates5Correlacion, TOTAL_M5 } from "./shorts/serie/Mates5Correlacion";
import { Mates6Regresion, TOTAL_M6 } from "./shorts/serie/Mates6Regresion";
import { Mates7Vectores, TOTAL_M7 } from "./shorts/serie/Mates7Vectores";
import { Mates8Gradiente, TOTAL_M8 } from "./shorts/serie/Mates8Gradiente";
import { Algo1Arreglos, TOTAL_A1 } from "./shorts/algoritmos/Algo1Arreglos";
import { Algo2BigO, TOTAL_A2 } from "./shorts/algoritmos/Algo2BigO";
import { Algo3Binaria, TOTAL_A3 } from "./shorts/algoritmos/Algo3Binaria";
import { Algo4Hash, TOTAL_A4 } from "./shorts/algoritmos/Algo4Hash";
import { Algo5PilasColas, TOTAL_A5 } from "./shorts/algoritmos/Algo5PilasColas";
import {
  Algo6Ordenamiento,
  TOTAL_A6,
} from "./shorts/algoritmos/Algo6Ordenamiento";
import { Algo7Arboles, TOTAL_A7 } from "./shorts/algoritmos/Algo7Arboles";
import { Algo8Grafos, TOTAL_A8 } from "./shorts/algoritmos/Algo8Grafos";
import { Algo9Rutas, TOTAL_A9 } from "./shorts/algoritmos/Algo9Rutas";
import { Algo10Dinamica, TOTAL_A10 } from "./shorts/algoritmos/Algo10Dinamica";
import { Prac1Ciclo, TOTAL_P1 } from "./shorts/practica/Prac1Ciclo";
import { Prac2Pregunta, TOTAL_P2 } from "./shorts/practica/Prac2Pregunta";
import { Prac3Recoleccion, TOTAL_P3 } from "./shorts/practica/Prac3Recoleccion";
import { Prac4Ordenados, TOTAL_P4 } from "./shorts/practica/Prac4Ordenados";
import { Prac5Limpieza, TOTAL_P5 } from "./shorts/practica/Prac5Limpieza";
import { Prac6Atipicos, TOTAL_P6 } from "./shorts/practica/Prac6Atipicos";
import { Prac7Transformar, TOTAL_P7 } from "./shorts/practica/Prac7Transformar";
import { Prac8EDA, TOTAL_P8 } from "./shorts/practica/Prac8EDA";
import { Prac9Analisis, TOTAL_P9 } from "./shorts/practica/Prac9Analisis";
import { Prac10Comunicar, TOTAL_P10 } from "./shorts/practica/Prac10Comunicar";
import { ML0Aprender, TOTAL_ML0 } from "./shorts/ml/ML0Aprender";
import { ML1Entrenar, TOTAL_ML1 } from "./shorts/ml/ML1Entrenar";
import { ML2Sobreajuste, TOTAL_ML2 } from "./shorts/ml/ML2Sobreajuste";
import { ML3Variables, TOTAL_ML3 } from "./shorts/ml/ML3Variables";
import { Sup1Tipos, TOTAL_SUP1 } from "./shorts/sup/Sup1Tipos";
import { Sup2KNN, TOTAL_SUP2 } from "./shorts/sup/Sup2KNN";
import { Sup3Logistica, TOTAL_SUP3 } from "./shorts/sup/Sup3Logistica";
import { Sup4Bosque, TOTAL_SUP4 } from "./shorts/sup/Sup4Bosque";
import { Sup5Metricas, TOTAL_SUP5 } from "./shorts/sup/Sup5Metricas";
import { Sup6Boosting, TOTAL_SUP6 } from "./shorts/sup/Sup6Boosting";
import { Sup7Red, TOTAL_SUP7 } from "./shorts/sup/Sup7Red";
import { Sup8Proyecto, TOTAL_SUP8 } from "./shorts/sup/Sup8Proyecto";
import { Nos1Grupos, TOTAL_NOS1 } from "./shorts/nos/Nos1Grupos";
import { Nos2KMeans, TOTAL_NOS2 } from "./shorts/nos/Nos2KMeans";
import { Nos3Codo, TOTAL_NOS3 } from "./shorts/nos/Nos3Codo";
import { Nos4DBSCAN, TOTAL_NOS4 } from "./shorts/nos/Nos4DBSCAN";
import { Nos5PCA, TOTAL_NOS5 } from "./shorts/nos/Nos5PCA";
import { Nos6Anomalias, TOTAL_NOS6 } from "./shorts/nos/Nos6Anomalias";
import { Nos7Asociacion, TOTAL_NOS7 } from "./shorts/nos/Nos7Asociacion";
import { GranFinal, TOTAL_FINAL } from "./shorts/nos/GranFinal";
import { SimpsonFutbol, TOTAL_SIMFUT } from "./shorts/sueltos/SimpsonFutbol";
import { ParadaF1, TOTAL_PITF1 } from "./shorts/sueltos/ParadaF1";
import { ImagenNumeros, TOTAL_IMG } from "./shorts/sueltos/ImagenNumeros";
import {
  AmarilloNoExiste,
  TOTAL_COLOR,
} from "./shorts/vision/AmarilloNoExiste";
import { BrilloBorra, TOTAL_BRILLO } from "./shorts/vision/BrilloBorra";
import {
  MatrizRecomienda,
  TOTAL_MATRIZ,
} from "./shorts/sueltos/MatrizRecomienda";
import {
  MiniCumpleanos,
  MiniSimpson,
  MiniRecomendador,
  MiniF1,
  MiniClaude,
  MiniStatsBomb,
  MiniMates1,
  MiniMates2,
  MiniMates3,
  MiniMates4,
  MiniMates5,
  MiniMates6,
  MiniMates7,
  MiniMates8,
  MiniAlgo1,
  MiniAlgo2,
  MiniAlgo3,
  MiniAlgo4,
  MiniAlgo5,
  MiniAlgo6,
  MiniAlgo7,
  MiniAlgo8,
  MiniAlgo9,
  MiniAlgo10,
  MiniPrac1,
  MiniPrac2,
  MiniPrac3,
  MiniPrac4,
  MiniPrac5,
  MiniPrac6,
  MiniPrac7,
  MiniPrac8,
  MiniPrac9,
  MiniPrac10,
  MiniML0,
  MiniML1,
  MiniML2,
  MiniML3,
  MiniSup1,
  MiniSup2,
  MiniSup3,
  MiniSup4,
  MiniSup5,
  MiniSup6,
  MiniSup7,
  MiniSup8,
  MiniNos1,
  MiniNos2,
  MiniNos3,
  MiniNos4,
  MiniNos5,
  MiniNos6,
  MiniNos7,
  MiniFinal,
  Mini7SimpsonFutbol,
  Mini8ParadaF1,
  Mini9Matriz,
  Mini10Imagen,
  MiniVision2,
  MiniVision3,
} from "./miniaturas/Miniaturas";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Folder name="Shorts">
        <Composition
          id="Short1-Cumpleanos"
          component={Cumpleanos}
          durationInFrames={900}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="Short2-Simpson"
          component={Simpson}
          durationInFrames={910}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="Short3-Recomendador"
          component={Recomendador}
          durationInFrames={900}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="Short4-F1"
          component={F1}
          durationInFrames={935}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="Short5-ComoFuncionaClaude"
          component={ComoFuncionaClaude}
          durationInFrames={1202}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="Short6-StatsBomb"
          component={StatsBomb}
          durationInFrames={1137}
          fps={30}
          width={1080}
          height={1920}
        />
      </Folder>
      <Folder name="Serie-Mates">
        <Composition
          id="Mates1-Mediana"
          component={Mates1Mediana}
          durationInFrames={TOTAL_M1}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="Mates2-Desviacion"
          component={Mates2Desviacion}
          durationInFrames={TOTAL_M2}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="Mates3-Normal"
          component={Mates3Normal}
          durationInFrames={TOTAL_M3}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="Mates4-Bayes"
          component={Mates4Bayes}
          durationInFrames={TOTAL_M4}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="Mates5-Correlacion"
          component={Mates5Correlacion}
          durationInFrames={TOTAL_M5}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="Mates6-Regresion"
          component={Mates6Regresion}
          durationInFrames={TOTAL_M6}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="Mates7-Vectores"
          component={Mates7Vectores}
          durationInFrames={TOTAL_M7}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="Mates8-Gradiente"
          component={Mates8Gradiente}
          durationInFrames={TOTAL_M8}
          fps={30}
          width={1080}
          height={1920}
        />
      </Folder>
      <Folder name="Serie-Algoritmos">
        <Composition
          id="Algo1-Arreglos"
          component={Algo1Arreglos}
          durationInFrames={TOTAL_A1}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="Algo2-BigO"
          component={Algo2BigO}
          durationInFrames={TOTAL_A2}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="Algo3-Binaria"
          component={Algo3Binaria}
          durationInFrames={TOTAL_A3}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="Algo4-Hash"
          component={Algo4Hash}
          durationInFrames={TOTAL_A4}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="Algo5-PilasColas"
          component={Algo5PilasColas}
          durationInFrames={TOTAL_A5}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="Algo6-Ordenamiento"
          component={Algo6Ordenamiento}
          durationInFrames={TOTAL_A6}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="Algo7-Arboles"
          component={Algo7Arboles}
          durationInFrames={TOTAL_A7}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="Algo8-Grafos"
          component={Algo8Grafos}
          durationInFrames={TOTAL_A8}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="Algo9-Rutas"
          component={Algo9Rutas}
          durationInFrames={TOTAL_A9}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="Algo10-Dinamica"
          component={Algo10Dinamica}
          durationInFrames={TOTAL_A10}
          fps={30}
          width={1080}
          height={1920}
        />
      </Folder>
      <Folder name="Serie-Practica">
        <Composition
          id="Prac1-Ciclo"
          component={Prac1Ciclo}
          durationInFrames={TOTAL_P1}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="Prac2-Pregunta"
          component={Prac2Pregunta}
          durationInFrames={TOTAL_P2}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="Prac3-Recoleccion"
          component={Prac3Recoleccion}
          durationInFrames={TOTAL_P3}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="Prac4-Ordenados"
          component={Prac4Ordenados}
          durationInFrames={TOTAL_P4}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="Prac5-Limpieza"
          component={Prac5Limpieza}
          durationInFrames={TOTAL_P5}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="Prac6-Atipicos"
          component={Prac6Atipicos}
          durationInFrames={TOTAL_P6}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="Prac7-Transformar"
          component={Prac7Transformar}
          durationInFrames={TOTAL_P7}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="Prac8-EDA"
          component={Prac8EDA}
          durationInFrames={TOTAL_P8}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="Prac9-Analisis"
          component={Prac9Analisis}
          durationInFrames={TOTAL_P9}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="Prac10-Comunicar"
          component={Prac10Comunicar}
          durationInFrames={TOTAL_P10}
          fps={30}
          width={1080}
          height={1920}
        />
      </Folder>
      <Folder name="Serie-ML">
        <Composition
          id="ML0-Aprender"
          component={ML0Aprender}
          durationInFrames={TOTAL_ML0}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="ML1-Entrenar"
          component={ML1Entrenar}
          durationInFrames={TOTAL_ML1}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="ML2-Sobreajuste"
          component={ML2Sobreajuste}
          durationInFrames={TOTAL_ML2}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="ML3-Variables"
          component={ML3Variables}
          durationInFrames={TOTAL_ML3}
          fps={30}
          width={1080}
          height={1920}
        />
      </Folder>
      <Folder name="Serie-ML-Supervisado">
        <Composition
          id="SUP1-Tipos"
          component={Sup1Tipos}
          durationInFrames={TOTAL_SUP1}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="SUP2-KNN"
          component={Sup2KNN}
          durationInFrames={TOTAL_SUP2}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="SUP3-Logistica"
          component={Sup3Logistica}
          durationInFrames={TOTAL_SUP3}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="SUP4-Bosque"
          component={Sup4Bosque}
          durationInFrames={TOTAL_SUP4}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="SUP5-Metricas"
          component={Sup5Metricas}
          durationInFrames={TOTAL_SUP5}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="SUP6-Boosting"
          component={Sup6Boosting}
          durationInFrames={TOTAL_SUP6}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="SUP7-Red"
          component={Sup7Red}
          durationInFrames={TOTAL_SUP7}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="SUP8-Proyecto"
          component={Sup8Proyecto}
          durationInFrames={TOTAL_SUP8}
          fps={30}
          width={1080}
          height={1920}
        />
      </Folder>
      <Folder name="Serie-ML-NoSupervisado">
        <Composition
          id="NOS1-Grupos"
          component={Nos1Grupos}
          durationInFrames={TOTAL_NOS1}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="NOS2-KMeans"
          component={Nos2KMeans}
          durationInFrames={TOTAL_NOS2}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="NOS3-Codo"
          component={Nos3Codo}
          durationInFrames={TOTAL_NOS3}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="NOS4-DBSCAN"
          component={Nos4DBSCAN}
          durationInFrames={TOTAL_NOS4}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="NOS5-PCA"
          component={Nos5PCA}
          durationInFrames={TOTAL_NOS5}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="NOS6-Anomalias"
          component={Nos6Anomalias}
          durationInFrames={TOTAL_NOS6}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="NOS7-Asociacion"
          component={Nos7Asociacion}
          durationInFrames={TOTAL_NOS7}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="ML-GranFinal"
          component={GranFinal}
          durationInFrames={TOTAL_FINAL}
          fps={30}
          width={1080}
          height={1920}
        />
      </Folder>
      <Folder name="Sueltos-2">
        <Composition
          id="Short7-SimpsonFutbol"
          component={SimpsonFutbol}
          durationInFrames={TOTAL_SIMFUT}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="Short8-ParadaF1"
          component={ParadaF1}
          durationInFrames={TOTAL_PITF1}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="Short9-Matriz"
          component={MatrizRecomienda}
          durationInFrames={TOTAL_MATRIZ}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="Short10-ImagenNumeros"
          component={ImagenNumeros}
          durationInFrames={TOTAL_IMG}
          fps={30}
          width={1080}
          height={1920}
        />
      </Folder>
      <Folder name="Vision">
        <Composition
          id="Vision2-Amarillo"
          component={AmarilloNoExiste}
          durationInFrames={TOTAL_COLOR}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="Vision3-Brillo"
          component={BrilloBorra}
          durationInFrames={TOTAL_BRILLO}
          fps={30}
          width={1080}
          height={1920}
        />
      </Folder>
      <Folder name="Miniaturas">
        <Still
          id="Mini1-Cumpleanos"
          component={MiniCumpleanos}
          width={1080}
          height={1920}
        />
        <Still
          id="Mini2-Simpson"
          component={MiniSimpson}
          width={1080}
          height={1920}
        />
        <Still
          id="Mini3-Recomendador"
          component={MiniRecomendador}
          width={1080}
          height={1920}
        />
        <Still id="Mini4-F1" component={MiniF1} width={1080} height={1920} />
        <Still
          id="Mini5-ComoFuncionaClaude"
          component={MiniClaude}
          width={1080}
          height={1920}
        />
        <Still
          id="Mini6-StatsBomb"
          component={MiniStatsBomb}
          width={1080}
          height={1920}
        />
        <Still
          id="MiniMates1"
          component={MiniMates1}
          width={1080}
          height={1920}
        />
        <Still
          id="MiniMates2"
          component={MiniMates2}
          width={1080}
          height={1920}
        />
        <Still
          id="MiniMates3"
          component={MiniMates3}
          width={1080}
          height={1920}
        />
        <Still
          id="MiniMates4"
          component={MiniMates4}
          width={1080}
          height={1920}
        />
        <Still
          id="MiniMates5"
          component={MiniMates5}
          width={1080}
          height={1920}
        />
        <Still
          id="MiniMates6"
          component={MiniMates6}
          width={1080}
          height={1920}
        />
        <Still
          id="MiniMates7"
          component={MiniMates7}
          width={1080}
          height={1920}
        />
        <Still
          id="MiniMates8"
          component={MiniMates8}
          width={1080}
          height={1920}
        />
        <Still
          id="MiniAlgo1"
          component={MiniAlgo1}
          width={1080}
          height={1920}
        />
        <Still
          id="MiniAlgo2"
          component={MiniAlgo2}
          width={1080}
          height={1920}
        />
        <Still
          id="MiniAlgo3"
          component={MiniAlgo3}
          width={1080}
          height={1920}
        />
        <Still
          id="MiniAlgo4"
          component={MiniAlgo4}
          width={1080}
          height={1920}
        />
        <Still
          id="MiniAlgo5"
          component={MiniAlgo5}
          width={1080}
          height={1920}
        />
        <Still
          id="MiniAlgo6"
          component={MiniAlgo6}
          width={1080}
          height={1920}
        />
        <Still
          id="MiniAlgo7"
          component={MiniAlgo7}
          width={1080}
          height={1920}
        />
        <Still
          id="MiniAlgo8"
          component={MiniAlgo8}
          width={1080}
          height={1920}
        />
        <Still
          id="MiniAlgo9"
          component={MiniAlgo9}
          width={1080}
          height={1920}
        />
        <Still
          id="MiniAlgo10"
          component={MiniAlgo10}
          width={1080}
          height={1920}
        />
        <Still
          id="MiniPrac1"
          component={MiniPrac1}
          width={1080}
          height={1920}
        />
        <Still
          id="MiniPrac2"
          component={MiniPrac2}
          width={1080}
          height={1920}
        />
        <Still
          id="MiniPrac3"
          component={MiniPrac3}
          width={1080}
          height={1920}
        />
        <Still
          id="MiniPrac4"
          component={MiniPrac4}
          width={1080}
          height={1920}
        />
        <Still
          id="MiniPrac5"
          component={MiniPrac5}
          width={1080}
          height={1920}
        />
        <Still
          id="MiniPrac6"
          component={MiniPrac6}
          width={1080}
          height={1920}
        />
        <Still
          id="MiniPrac7"
          component={MiniPrac7}
          width={1080}
          height={1920}
        />
        <Still
          id="MiniPrac8"
          component={MiniPrac8}
          width={1080}
          height={1920}
        />
        <Still
          id="MiniPrac9"
          component={MiniPrac9}
          width={1080}
          height={1920}
        />
        <Still
          id="MiniPrac10"
          component={MiniPrac10}
          width={1080}
          height={1920}
        />
        <Still id="MiniML0" component={MiniML0} width={1080} height={1920} />
        <Still id="MiniML1" component={MiniML1} width={1080} height={1920} />
        <Still id="MiniML2" component={MiniML2} width={1080} height={1920} />
        <Still id="MiniML3" component={MiniML3} width={1080} height={1920} />
        <Still id="MiniSup1" component={MiniSup1} width={1080} height={1920} />
        <Still id="MiniSup2" component={MiniSup2} width={1080} height={1920} />
        <Still id="MiniSup3" component={MiniSup3} width={1080} height={1920} />
        <Still id="MiniSup4" component={MiniSup4} width={1080} height={1920} />
        <Still id="MiniSup5" component={MiniSup5} width={1080} height={1920} />
        <Still id="MiniSup6" component={MiniSup6} width={1080} height={1920} />
        <Still id="MiniSup7" component={MiniSup7} width={1080} height={1920} />
        <Still id="MiniSup8" component={MiniSup8} width={1080} height={1920} />
        <Still id="MiniNos1" component={MiniNos1} width={1080} height={1920} />
        <Still id="MiniNos2" component={MiniNos2} width={1080} height={1920} />
        <Still id="MiniNos3" component={MiniNos3} width={1080} height={1920} />
        <Still id="MiniNos4" component={MiniNos4} width={1080} height={1920} />
        <Still id="MiniNos5" component={MiniNos5} width={1080} height={1920} />
        <Still id="MiniNos6" component={MiniNos6} width={1080} height={1920} />
        <Still id="MiniNos7" component={MiniNos7} width={1080} height={1920} />
        <Still
          id="MiniFinal"
          component={MiniFinal}
          width={1080}
          height={1920}
        />
        <Still
          id="Mini7-SimpsonFutbol"
          component={Mini7SimpsonFutbol}
          width={1080}
          height={1920}
        />
        <Still
          id="Mini8-ParadaF1"
          component={Mini8ParadaF1}
          width={1080}
          height={1920}
        />
        <Still
          id="Mini9-Matriz"
          component={Mini9Matriz}
          width={1080}
          height={1920}
        />
        <Still
          id="Mini10-Imagen"
          component={Mini10Imagen}
          width={1080}
          height={1920}
        />
        <Still
          id="MiniVision2-Amarillo"
          component={MiniVision2}
          width={1080}
          height={1920}
        />
        <Still
          id="MiniVision3-Brillo"
          component={MiniVision3}
          width={1080}
          height={1920}
        />
      </Folder>
    </>
  );
};
