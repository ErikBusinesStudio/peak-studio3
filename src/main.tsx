import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "@fontsource-variable/bricolage-grotesque/wght.css";
import "@fontsource-variable/inter";
import "@fontsource/jetbrains-mono/600.css";

createRoot(document.getElementById("root")!).render(<App />);
