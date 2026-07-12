import { Phone } from "lucide-react";
import { openCallModal } from "@/components/CallModal";

type Props = {
  variant?: "solid" | "soft" | "ghost";
  className?: string;
  label?: string;
};

const CallButton = ({ variant = "solid", className = "", label = "Richiedi una chiamata" }: Props) => {
  const base =
    variant === "solid"
      ? "btn-cta"
      : variant === "soft"
      ? "btn-cta-soft"
      : "inline-flex items-center gap-2 text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-primary hover:opacity-80 transition-opacity";
  return (
    <button type="button" onClick={openCallModal} className={`${base} ${className}`}>
      <Phone className="w-4 h-4" /> {label}
    </button>
  );
};

export default CallButton;