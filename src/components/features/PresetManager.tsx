import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusIcon, Save, Share, Trash2 } from "lucide-react";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { useAppContext } from "../../context/app-context";
import { createShareableUrl } from "../../utils/preset-manager";

export function PresetManager() {
  const { state, addPreset, loadPreset, deletePreset, updatePreset } =
    useAppContext();
  const [newPresetName, setNewPresetName] = useState("");
  const [shareUrl, setShareUrl] = useState("");

  const handleSavePreset = useCallback(() => {
    if (newPresetName.trim()) {
      addPreset(newPresetName);
      setNewPresetName("");
    }
  }, [newPresetName, addPreset]);

  const handleLoadPreset = (id: string) => {
    loadPreset(id);
  };

  const handleUpdatePreset = useCallback(() => {
    if (state.currentPresetId) {
      updatePreset(state.currentPresetId);
    }
  }, [state.currentPresetId, updatePreset]);

  const handleShare = useCallback(() => {
    const url = createShareableUrl(state.shadowSettings, state.textSettings);
    setShareUrl(url);
  }, [state.shadowSettings, state.textSettings]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast.success("URL copied to clipboard");
    } catch {
      toast.error("Failed to copy URL");
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <Select
        value={state.currentPresetId || ""}
        onValueChange={handleLoadPreset}
        disabled={state.presets.length === 0}
      >
        <SelectTrigger className="flex-1">
          <SelectValue placeholder="Select a preset" />
        </SelectTrigger>
        <SelectContent>
          {state.presets.map((preset) => (
            <SelectItem key={preset.id} value={preset.id}>
              {preset.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button
        variant="outline"
        size="icon"
        onClick={handleUpdatePreset}
        title="Update preset"
        disabled={!state.currentPresetId}
      >
        <Save className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={() =>
          state.currentPresetId && deletePreset(state.currentPresetId)
        }
        title="Delete preset"
        disabled={!state.currentPresetId}
      >
        <Trash2 className="h-4 w-4" />
      </Button>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="icon" title="Save as new preset">
            <PlusIcon className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Preset</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="preset-name">Preset Name</Label>
              <Input
                id="preset-name"
                value={newPresetName}
                onChange={(e) => setNewPresetName(e.target.value)}
                placeholder="My awesome text shadow"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button onClick={handleSavePreset}>Save</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            onClick={handleShare}
            title="Share settings via URL"
          >
            <Share className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share Settings</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="share-url">Shareable URL</Label>
              <div className="flex space-x-2">
                <Input
                  id="share-url"
                  value={shareUrl}
                  readOnly
                  className="flex-1"
                />
                <DialogClose asChild>
                  <Button onClick={copyToClipboard}>Copy</Button>
                </DialogClose>
              </div>
              <p className="text-sm text-muted-foreground">
                Share this URL to give someone else your exact shadow settings.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
