import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "@fontsource-variable/outfit";
import "@fontsource-variable/inter";
import "@fontsource-variable/space-grotesk";

createRoot(document.getElementById("root")!).render(<App />);
