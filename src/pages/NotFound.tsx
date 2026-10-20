import { Link } from "react-router-dom";
import Header from "@/components/peak/Header";
import Footer from "@/components/peak/Footer";
import { useCopy } from "@/config/copy";
import { usePageMeta } from "@/hooks/peak";

const NotFound = () => {
  const { c } = useCopy();
  usePageMeta(`${c.notFound.title} | Peak Studio`, c.notFound.text);
  return (
    <>
      <Header />
      <main id="contenuto" tabIndex={-1} className="zone-ice flex min-h-[80vh] items-center pt-24 outline-none">
        <div className="wrap py-20">
          <p className="kicker mb-6">404 · ? m</p>
          <h1 className="giant ice-text">{c.notFound.title}</h1>
          <p className="mt-8 max-w-xl text-xl">{c.notFound.text}</p>
          <Link to="/" className="btn btn-primary mt-10">{c.notFound.back}</Link>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default NotFound;
