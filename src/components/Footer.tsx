const Footer = () => {
  return (
    <footer className="border-t border-border py-10 px-4">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Peak Studio — Erik Baraca. Tutti i diritti riservati.
        </p>
        <p className="text-xs text-muted-foreground">
          Via Libertà 84, Casalzuigno (VA) 21030 · P.IVA in corso
        </p>
      </div>
    </footer>
  );
};

export default Footer;
