import { Toaster } from "@/components/ui/sonner";
import { CodeOutput } from "./components/features/code-output";
import { ControlPanel } from "./components/features/control-panel";
import { Footer } from "./components/features/footer";
import { Header } from "./components/features/header";
import { Preview } from "./components/features/preview";
import { AppProvider } from "./context/app-context";

function App() {
  return (
    <AppProvider>
      <div className="flex h-screen flex-col">
        <Header />

        <main className="container mx-auto grid flex-1 grid-cols-1 gap-6 overflow-hidden px-4 md:px-6 lg:grid-cols-3 lg:gap-0">
          <div className="flex flex-col gap-4 overflow-auto px-2 py-6 [scrollbar-gutter:stable]">
            <ControlPanel />
          </div>
          <div className="grid grid-cols-1 content-start gap-6 overflow-auto px-4 py-6 lg:col-span-2">
            <div className="grid gap-4 rounded-lg bg-card p-4 shadow-sm">
              <h2 className="font-medium text-lg">Preview</h2>
              <Preview />
            </div>

            <div className="rounded-lg bg-card p-4 shadow-sm">
              <CodeOutput />
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
