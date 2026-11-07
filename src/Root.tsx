import { Composition, Folder, Still } from "remotion";
import { Cumpleanos } from "./shorts/Cumpleanos";
import { Simpson } from "./shorts/Simpson";
import { Recomendador } from "./shorts/Recomendador";
import { F1 } from "./shorts/F1";
import { ComoFuncionaClaude } from "./shorts/ComoFuncionaClaude";
import {
  MiniCumpleanos,
  MiniSimpson,
  MiniRecomendador,
  MiniF1,
  MiniClaude,
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
      </Folder>
    </>
  );
};
