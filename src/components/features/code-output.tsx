import { Button } from "@/components/ui/button";
import { useAppContext } from "@/context/app-context";
import { generateTextShadow } from "@/utils/generate-text-shadow";
import { CheckIcon, CopyIcon } from "lucide-react";
import React, { useMemo } from "react";

export function CodeOutput() {
  const [copied, setCopied] = React.useState(false);
  const { state } = useAppContext();
  const { shadowSettings, textSettings } = state;

  const textShadowValue = useMemo(() => {
    return generateTextShadow({
      baseWidth: shadowSettings.strokeWidth,
      color: shadowSettings.color,
      directionCount: shadowSettings.strokeWidth * 10,
      radiusStep: Math.max(1, Math.trunc(textSettings.fontSize / 10)),
      digits: 1,
      shadowOffset: 0,
    });
  }, [shadowSettings, textSettings]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(`text-shadow: ${textShadowValue};`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-sm">Generated Code</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={copyToClipboard}
          disabled={copied}
          className="h-8 gap-1"
        >
          {copied ? (
            <>
              <CheckIcon className="h-4 w-4" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <CopyIcon className="h-4 w-4" />
              <span>Copy</span>
            </>
          )}
        </Button>
      </div>

      <pre className="overflow-x-auto rounded-md bg-muted p-4 font-mono text-sm">
        <code>
          text-shadow: {textShadowValue}
          {";"}
        </code>
      </pre>
      <p className="text-right text-sm">
        <code>{new Blob([textShadowValue]).size.toLocaleString()} bytes</code>
      </p>
    </div>
  );
}
