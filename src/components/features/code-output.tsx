import { Button } from "@/components/ui/button";
import { useAppContext } from "@/context/app-context";
import { generateTextShadow } from "@/utils/generate-text-shadow";
import { CheckIcon, CopyIcon } from "lucide-react";
import React, { useMemo } from "react";

export function CodeOutput() {
  const [copied, setCopied] = React.useState(false);
  const { state } = useAppContext();
  const { shadowSettings } = state;

  // Generate the text shadow value
  const textShadowValue = useMemo(() => {
    return generateTextShadow(shadowSettings);
  }, [shadowSettings]);

  // Copy to clipboard function
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
        <h3 className="text-sm font-medium">Generated Code</h3>
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

      <div className="relative">
        <pre className="bg-muted rounded-md p-4 overflow-x-auto text-sm font-mono">
          text-shadow: {textShadowValue}
          {";"}
        </pre>
      </div>
    </div>
  );
}
