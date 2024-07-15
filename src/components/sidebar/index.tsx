import type { FontWeight } from "@/App";
import Header from "@/components/header";
import CustomSelect from "@/components/sidebar/custom-select";
import { generateTextShadow } from "@/components/stroke-text/generate-text-shadow";
import { Slider } from "@/components/ui/slider";
import { Clipboard, ClipboardCheck } from "lucide-react";
import { useRef, useState } from "react";

type Props = {
  fontWeight: FontWeight;
  textColor: string;
  strokeWidth: number;
  directionCount: number;
  strokeColor: string;
  onChangeFontWeight: (value: FontWeight) => void;
  onChangeTextColor: (value: string) => void;
  onChangeStrokeWidth: (value: number) => void;
  onChangeDirectionCount: (value: number) => void;
  onChangeStrokeColor: (value: string) => void;
};

const validateFontWeight = (value: number): value is FontWeight => {
  return [100, 200, 300, 400, 500, 600, 700, 800, 900].includes(value);
};

export default function Sidebar({
  fontWeight,
  textColor,
  strokeWidth,
  directionCount,
  strokeColor,
  onChangeFontWeight,
  onChangeTextColor,
  onChangeStrokeWidth,
  onChangeDirectionCount,
  onChangeStrokeColor,
}: Props) {
  const [copyed, setCopyed] = useState(false);
  const copyedTimerId = useRef<number>(0);

  const code = `text-shadow: ${generateTextShadow(strokeWidth, directionCount, 2)};\n--stroke-color: ${strokeColor};`;

  const handleChangeFontWeight = (value: string) => {
    const num = Number(value);
    if (validateFontWeight(num)) {
      onChangeFontWeight(num);
    }
  };

  const copyTextShadow = () => {
    clearTimeout(copyedTimerId.current);
    navigator.clipboard.writeText(code);
    setCopyed(true);
    copyedTimerId.current = window.setTimeout(() => {
      setCopyed(false);
    }, 1000);
  };

  return (
    <div className="bg-sidebar text-sidebar-foreground grid h-full place-content-start gap-10 overflow-y-auto rounded-e-3xl px-4 py-8">
      <Header />

      <div className="grid gap-8">
        <div className="grid gap-2">
          <label htmlFor="font-weight-select">
            文字の太さ: <code>{fontWeight}</code>
          </label>
          <CustomSelect
            defaultValue={String(fontWeight)}
            options={[
              { label: "100", value: "100" },
              { label: "200", value: "200" },
              { label: "300", value: "300" },
              { label: "400", value: "400" },
              { label: "500", value: "500" },
              { label: "600", value: "600" },
              { label: "700", value: "700" },
              { label: "800", value: "800" },
              { label: "900", value: "900" },
            ]}
            onChange={handleChangeFontWeight}
          />
        </div>

        <label htmlFor="text-color-input" className="relative grid gap-2">
          <span>
            文字の色: <code>{textColor}</code>
          </span>
          <span
            aria-hidden="true"
            className="block h-6 rounded border border-input"
            style={{ backgroundColor: textColor }}
          />
          <input
            id="text-color-input"
            type="color"
            value={textColor}
            className="sr-only bottom-0"
            onChange={(e) => onChangeTextColor(e.target.value)}
            aria-label="文字の色"
          />
        </label>

        <div className="grid gap-2">
          <label htmlFor="stroke-width-slider">
            枠線の太さ: <code>{strokeWidth}px</code>
          </label>
          <Slider
            id="stroke-width-slider"
            defaultValue={[strokeWidth]}
            min={1}
            max={40}
            step={1}
            onValueChange={([value]) => onChangeStrokeWidth(value)}
            aria-labelledby="stroke-width-slider"
          />
        </div>

        <div className="grid gap-2">
          <label htmlFor="direction-count-slider">
            <code>text-shadow</code>の方向の数: <code>{directionCount}</code>
          </label>
          <Slider
            id="direction-count-slider"
            defaultValue={[directionCount]}
            min={4}
            max={200}
            step={1}
            onValueChange={([value]) => onChangeDirectionCount(value)}
            aria-labelledby="direction-count-slider"
          />
        </div>

        <label htmlFor="stroke-color-input" className="relative grid gap-2">
          <span>
            枠線の色: <code>{strokeColor}</code>
          </span>
          <span
            aria-hidden="true"
            className="block h-6 rounded border border-input"
            style={{ backgroundColor: strokeColor }}
          />
          <input
            id="stroke-color-input"
            type="color"
            value={strokeColor}
            className="sr-only bottom-0"
            onChange={(e) => onChangeStrokeColor(e.target.value)}
            aria-label="枠線の色"
          />
        </label>

        <div className="grid gap-2">
          <p>コード</p>
          <div className="relative">
            <button
              data-clipboard
              className="bg-sidebar absolute right-1 top-1 rounded p-1 hover:opacity-80"
              aria-label="クリップボードにコピーする"
              onClick={copyTextShadow}
            >
              {copyed ? <ClipboardCheck size={20} /> : <Clipboard size={20} />}
            </button>
            <pre className="grid">
              <code className="block overflow-auto rounded border border-input bg-gray-800 p-4 pr-8">
                {code}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
