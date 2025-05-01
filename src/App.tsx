import { Toaster } from "@/components/ui/sonner";
import { ControlPanel } from "./components/features/ControlPanel";
import { Footer } from "./components/features/Footer";
import { Header } from "./components/features/Header";
import { PresetManager } from "./components/features/PresetManager";
import { AppProvider } from "./context/app-context";

function App() {
  return (
    <AppProvider>
      <div className="flex flex-col h-screen">
        <Header />

        <main className="flex-1 container mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-3 gap-6 overflow-hidden">
          <div className="flex flex-col px-2 gap-4 overflow-auto py-6 [scrollbar-gutter:stable]">
            <PresetManager />
            <div className="flex-1">
              <ControlPanel />
            </div>
          </div>
        </main>

        <Footer />
      </div>
      <Toaster closeButton />
    </AppProvider>
  );
}

export default App;
