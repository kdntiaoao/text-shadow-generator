import Sidebar from "@/components/sidebar";
import StrokeText from "@/components/stroke-text";
import { useState } from "react";

export type FontWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

function App() {
  const [fontWeight, setFontWeight] = useState<FontWeight>(400);
  const [strokeWidth, setStrokeWidth] = useState(4);
  const [directionCount, setDirectionCount] = useState(20);
  const [strokeColor, setStrokeColor] = useState("#000");

  const handleChangeFontWeight = (value: FontWeight) => {
    setFontWeight(value);
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
      <div className="fixed bottom-0 left-0 top-0 w-96 overflow-y-auto border-r border-slate-500">
        <Sidebar
          fontWeight={fontWeight}
          strokeWidth={strokeWidth}
          directionCount={directionCount}
          strokeColor={strokeColor}
          onChangeFontWeight={handleChangeFontWeight}
          onChangeStrokeWidth={handleChangeStrokeWidth}
          onChangeDirectionCount={handleChangeDirectionCount}
          onChangeStrokeColor={handleChangeStrokeColor}
        />
      </div>

      <div className="pl-96">
        <div
          className="grid flex-1 gap-8 p-8 text-4xl font-bold text-white"
          style={{ fontWeight }}
        >
          <p>
            <StrokeText
              strokeColor={strokeColor}
              directionCount={directionCount}
              strokeWidth={strokeWidth}
            >
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vel ab
              incidunt aliquid atque sit. Natus reiciendis eum in praesentium
              cumque velit eos expedita, quod odio, illum quaerat, consectetur
              rerum quos?
            </StrokeText>
          </p>
          <p>
            <StrokeText
              strokeColor={strokeColor}
              directionCount={directionCount}
              strokeWidth={strokeWidth}
            >
              あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。
            </StrokeText>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
