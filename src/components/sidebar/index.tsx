import type { FontWeight } from "@/App";
import Header from "@/components/header";
import CodeSnippet from "@/components/sidebar/code-snippet";
import CustomSelect from "@/components/sidebar/custom-select";
import { generateTextShadow } from "@/components/stroke-text/generate-text-shadow";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  fontWeight: FontWeight;
  textColor: string;
  strokeWidth: number;
  directionCount: number;
  strokeColor: string;
  sampleText: string;
  onChangeFontWeight: (value: FontWeight) => void;
  onChangeTextColor: (value: string) => void;
  onChangeStrokeWidth: (value: number) => void;
  onChangeDirectionCount: (value: number) => void;
  onChangeStrokeColor: (value: string) => void;
  onChangeSampleText: (value: string) => void;
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
  sampleText,
  onChangeFontWeight,
  onChangeTextColor,
  onChangeStrokeWidth,
  onChangeDirectionCount,
  onChangeStrokeColor,
  onChangeSampleText,
}: Props) {
  const code = `color: ${textColor};
font-weight: ${fontWeight};
text-shadow: ${generateTextShadow(strokeWidth, directionCount, 2)};
--stroke-color: ${strokeColor};`;

  const handleChangeFontWeight = (value: string) => {
    const num = Number(value);
    if (validateFontWeight(num)) {
      onChangeFontWeight(num);
    }
  };

  return (
    <div className="grid h-full place-content-start gap-10 overflow-y-auto bg-sidebar px-4 pt-8 text-sidebar-foreground md:min-h-screen">
      <Header />

      <div className="relative">
        <Tabs defaultValue="default">
          <TabsList>
            <TabsTrigger value="default">Default</TabsTrigger>
            <TabsTrigger value="customize">Customize</TabsTrigger>
          </TabsList>
          <TabsContent value="default">
            Make changes to your account here.
          </TabsContent>
          <TabsContent value="customize">
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

              <label
                htmlFor="text-color-input"
                className="relative grid cursor-pointer gap-2"
              >
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
                  <code>text-shadow</code>の方向の数:{" "}
                  <code>{directionCount}</code>
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

              <label
                htmlFor="stroke-color-input"
                className="relative grid cursor-pointer gap-2"
              >
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
                />
              </label>

              <div className="grid gap-2">
                <label htmlFor="sample-text-input">サンプルテキスト</label>
                <Textarea
                  id="sample-text-input"
                  value={sampleText}
                  rows={10}
                  onChange={(e) => onChangeSampleText(e.target.value)}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="sticky bottom-0 left-0">
          <div className="h-10 bg-gradient-to-b from-transparent to-sidebar" />
          <div className="grid gap-2 bg-sidebar pb-8">
            <p>コード</p>
            <CodeSnippet code={code} />
          </div>
        </div>
      </div>
    </div>
  );
}
