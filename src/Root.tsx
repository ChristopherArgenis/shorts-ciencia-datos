import { Composition, Folder } from "remotion";
import { Cumpleanos } from "./shorts/Cumpleanos";
import { Simpson } from "./shorts/Simpson";
import { Recomendador } from "./shorts/Recomendador";
import { F1 } from "./shorts/F1";
import { Aviones } from "./shorts/Aviones";

export const RemotionRoot: React.FC = () => {
  return (
    <Folder name="Shorts">
      <Composition id="Short1-Cumpleanos" component={Cumpleanos} durationInFrames={900} fps={30} width={1080} height={1920} />
      <Composition id="Short2-Simpson" component={Simpson} durationInFrames={910} fps={30} width={1080} height={1920} />
      <Composition id="Short3-Recomendador" component={Recomendador} durationInFrames={900} fps={30} width={1080} height={1920} />
      <Composition id="Short4-F1" component={F1} durationInFrames={935} fps={30} width={1080} height={1920} />
      <Composition id="Short5-Aviones" component={Aviones} durationInFrames={860} fps={30} width={1080} height={1920} />
    </Folder>
  );
};
