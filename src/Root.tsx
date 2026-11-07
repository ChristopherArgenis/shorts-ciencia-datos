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
      </Folder>
    </>
  );
};
