import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { useAppContext } from "../../context/app-context";

export function ControlPanel() {
  const { state, setShadowSettings, setTextSettings } = useAppContext();
  const { shadowSettings, textSettings } = state;

  const handleStrokeWidthChange = (value: number[]) => {
    setShadowSettings({ strokeWidth: value[0] });
  };

  const handleGlowIntensityChange = (value: number[]) => {
    setShadowSettings({ glowIntensity: value[0] });
  };

  const handleFontSizeChange = (value: number[]) => {
    setTextSettings({ fontSize: value[0] });
  };

  const handleFontWeightChange = (value: number[]) => {
    setTextSettings({ fontWeight: value[0] });
  };

  return (
    <div className="flex flex-col gap-6">
      <Accordion
        type="multiple"
        defaultValue={["text-settings", "shadow-settings"]}
      >
        <AccordionItem value="text-settings">
          <AccordionTrigger className="text-lg font-medium">
            Text Settings
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 pt-2">
              <div className="space-y-2">
                <Label htmlFor="text-content">Text Content</Label>
                <Input
                  id="text-content"
                  value={textSettings.content}
                  onChange={(e) => setTextSettings({ content: e.target.value })}
                  placeholder="Enter text to preview"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="font-size">
                    Font Size: {textSettings.fontSize}px
                  </Label>
                </div>
                <Slider
                  id="font-size"
                  min={12}
                  max={96}
                  step={1}
                  value={[textSettings.fontSize]}
                  onValueChange={handleFontSizeChange}
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="font-weight">
                    Font Weight: {textSettings.fontWeight}
                  </Label>
                </div>
                <Slider
                  id="font-weight"
                  min={100}
                  max={900}
                  step={100}
                  value={[textSettings.fontWeight]}
                  onValueChange={handleFontWeightChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="text-color">Text Color</Label>
                <div className="flex gap-2">
                  <Input
                    id="text-color"
                    type="color"
                    value={textSettings.color}
                    onChange={(e) => setTextSettings({ color: e.target.value })}
                    className="w-12 h-10 p-1"
                  />
                  <Input
                    value={textSettings.color}
                    onChange={(e) => setTextSettings({ color: e.target.value })}
                    className="flex-1"
                    spellCheck={false}
                  />
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="shadow-settings">
          <AccordionTrigger className="text-lg font-medium">
            Shadow Settings
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 pt-2">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="stroke-width">
                    Stroke Width: {shadowSettings.strokeWidth}px
                  </Label>
                </div>
                <Slider
                  id="stroke-width"
                  min={1}
                  max={10}
                  step={1}
                  value={[shadowSettings.strokeWidth]}
                  onValueChange={handleStrokeWidthChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="shadow-color">Shadow Color</Label>
                <div className="flex gap-2">
                  <Input
                    id="shadow-color"
                    type="color"
                    value={shadowSettings.color}
                    onChange={(e) =>
                      setShadowSettings({ color: e.target.value })
                    }
                    className="w-12 h-10 p-1"
                  />
                  <Input
                    value={shadowSettings.color}
                    onChange={(e) =>
                      setShadowSettings({ color: e.target.value })
                    }
                    className="flex-1"
                    spellCheck={false}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between space-y-0 py-2">
                <Label htmlFor="inner-shadow">Inner Shadow</Label>
                <Switch
                  id="inner-shadow"
                  checked={shadowSettings.innerShadow}
                  onCheckedChange={(checked) =>
                    setShadowSettings({ innerShadow: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between space-y-0 py-2">
                <Label htmlFor="glow-effect">Glow Effect</Label>
                <Switch
                  id="glow-effect"
                  checked={shadowSettings.glow}
                  onCheckedChange={(checked) =>
                    setShadowSettings({ glow: checked })
                  }
                />
              </div>

              {shadowSettings.glow && (
                <div className="space-y-2 pl-2 border-l-2 border-muted mt-2">
                  <div className="flex justify-between">
                    <Label htmlFor="glow-intensity">
                      Glow Intensity: {shadowSettings.glowIntensity.toFixed(1)}
                    </Label>
                  </div>
                  <Slider
                    id="glow-intensity"
                    min={0.5}
                    max={3}
                    step={0.1}
                    value={[shadowSettings.glowIntensity]}
                    onValueChange={handleGlowIntensityChange}
                  />
                </div>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
