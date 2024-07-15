import Sidebar from "@/components/sidebar";
import StrokeText from "@/components/stroke-text";
import { useState } from "react";

export type FontWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

const SAMPLE_TEXT = `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vel ab incidunt aliquid atque sit. Natus reiciendis eum in praesentium cumque velit eos expedita, quod odio, illum quaerat, consectetur rerum quos?

あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。`;

function App() {
  const [fontWeight, setFontWeight] = useState<FontWeight>(400);
  const [textColor, setTextColor] = useState("#ffffff");
  const [strokeWidth, setStrokeWidth] = useState(4);
  const [directionCount, setDirectionCount] = useState(20);
  const [strokeColor, setStrokeColor] = useState("#000000");
  const [sampleText, setSampleText] = useState(SAMPLE_TEXT);

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

  const handleSampleTextChange = (value: string) => {
    setSampleText(value);
  };

  return (
    <div>
      <div className="fixed bottom-0 left-0 top-0 w-96">
        <Sidebar
          fontWeight={fontWeight}
          textColor={textColor}
          strokeWidth={strokeWidth}
          directionCount={directionCount}
          strokeColor={strokeColor}
          sampleText={sampleText}
          onChangeFontWeight={handleChangeFontWeight}
          onChangeTextColor={handleChangeTextColor}
          onChangeStrokeWidth={handleChangeStrokeWidth}
          onChangeDirectionCount={handleChangeDirectionCount}
          onChangeStrokeColor={handleChangeStrokeColor}
          onChangeSampleText={handleSampleTextChange}
        />
      </div>

      <div className="pl-96">
        <div
          className="grid flex-1 gap-10 p-8 text-4xl font-bold"
          style={{ fontWeight }}
        >
          <StrokeText
            textColor={textColor}
            strokeColor={strokeColor}
            directionCount={directionCount}
            strokeWidth={strokeWidth}
          >
            {sampleText}
          </StrokeText>
        </div>
      </div>
    </div>
  );
}

export default App;
