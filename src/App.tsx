import Sidebar from "@/components/sidebar";
import StrokeText from "@/components/stroke-text";
import { useState } from "react";

export type FontWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

function App() {
  const [fontWeight, setFontWeight] = useState<FontWeight>(400);
  const [textColor, setTextColor] = useState("#ffffff");
  const [strokeWidth, setStrokeWidth] = useState(4);
  const [directionCount, setDirectionCount] = useState(20);
  const [strokeColor, setStrokeColor] = useState("#000000");

  const handleChangeFontWeight = (value: FontWeight) => {
    setFontWeight(value);
  };

  const handleChangeTextColor = (value: string) => {
    setTextColor(value);
  };

  const handleChangeStrokeWidth = (value: number) => {
    setStrokeWidth(value);
  };

  const handleChangeDirectionCount = (value: number) => {
    setDirectionCount(value);
  };

  const handleChangeStrokeColor = (value: string) => {
    setStrokeColor(value);
  };

  return (
    <div>
      <div className="fixed bottom-0 left-0 top-0 w-96 overflow-y-auto border-r border-foreground">
        <Sidebar
          fontWeight={fontWeight}
          textColor={textColor}
          strokeWidth={strokeWidth}
          directionCount={directionCount}
          strokeColor={strokeColor}
          onChangeFontWeight={handleChangeFontWeight}
          onChangeTextColor={handleChangeTextColor}
          onChangeStrokeWidth={handleChangeStrokeWidth}
          onChangeDirectionCount={handleChangeDirectionCount}
          onChangeStrokeColor={handleChangeStrokeColor}
        />
      </div>

      <div className="pl-96">
        <div
          className="grid flex-1 gap-10 p-8 text-4xl font-bold text-white"
          style={{ fontWeight }}
        >
          <StrokeText
            textColor={textColor}
            strokeColor={strokeColor}
            directionCount={directionCount}
            strokeWidth={strokeWidth}
          >
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vel ab
            incidunt aliquid atque sit. Natus reiciendis eum in praesentium
            cumque velit eos expedita, quod odio, illum quaerat, consectetur
            rerum quos?
          </StrokeText>
          <StrokeText
            textColor={textColor}
            strokeColor={strokeColor}
            directionCount={directionCount}
            strokeWidth={strokeWidth}
          >
            あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。
          </StrokeText>
        </div>
      </div>
    </div>
  );
}

export default App;
