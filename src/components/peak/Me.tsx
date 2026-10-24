import { useRef } from "react";
import { useCopy } from "@/config/copy";
import { useInView, useReducedMotion } from "@/hooks/peak";
import SectionHead from "./SectionHead";

// posizioni dei nodi (viewBox 400x480): un percorso che sale, come un'idea che diventa progetto
const NODES = [
  { x: 70, y: 420 }, { x: 250, y: 360 }, { x: 110, y: 270 }, { x: 300, y: 200 }, { x: 150, y: 120 }, { x: 320, y: 50 },
];
const PATH = NODES.map((n, i) => `${i ? "L" : "M"}${n.x} ${n.y}`).join(" ");

/** Rete di nodi: le idee si collegano e salgono fino alla messa online. */
const IdeaNetwork = ({ labels }: { labels: string[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const reduced = useReducedMotion();
  const anim = inView && !reduced;
  return (
    <div ref={ref} className={`idea-net ${anim ? "is-anim" : ""}`} aria-hidden>
      <svg viewBox="0 0 400 480" className="h-auto w-full">
        <defs>
          <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="hsl(0 0% 100% / 0.12)" />
          </pattern>
        </defs>
        <rect width="400" height="480" fill="url(#dots)" />
        {/* collegamenti secondari */}
        {[[0, 2], [1, 3], [2, 4], [3, 5], [0, 1], [4, 5]].map(([a, b], k) => (
          <line key={k} x1={NODES[a].x} y1={NODES[a].y} x2={NODES[b].x} y2={NODES[b].y} className="net-thin" />
        ))}
        <path d={PATH} className="net-path" pathLength={1} />
        {anim && (
          <circle r="5" className="net-spark">
            <animateMotion dur="6s" repeatCount="indefinite" path={PATH} />
          </circle>
        )}
        {NODES.map((n, i) => (
          <g key={i} className="net-node" style={{ animationDelay: `${i * 0.25}s` }}>
            <circle cx={n.x} cy={n.y} r={i === NODES.length - 1 ? 14 : 9} className={i === NODES.length - 1 ? "net-peak" : "net-dot"} />
            <circle cx={n.x} cy={n.y} r="20" className="net-halo" style={{ animationDelay: `${i * 0.5}s` }} />
            <text x={n.x + (n.x > 200 ? -18 : 18)} y={n.y + 5} textAnchor={n.x > 200 ? "end" : "start"} className="net-label">
              {String(i + 1).padStart(2, "0")} {labels[i]}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};

const Me = () => {
  const { c } = useCopy();
  return (
    <section id="chi-sono" aria-labelledby="chi-sono-title" className="zone-deep relative py-24 md:py-32">
      <div className="wrap">
        <SectionHead id="chi-sono" kicker={c.me.kicker} quota={3300} title={c.me.title} />
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="me-lead">{c.me.lead}</p>
            <ol className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2">
              {c.me.chapters.map((ch) => (
                <li key={ch.n} className="me-chapter">
                  <span className="hud text-[hsl(var(--cyan))]">{ch.n}</span>
                  <h3 className="mt-2 font-display text-2xl font-extrabold tracking-tight">{ch.h}</h3>
                  <p className="mt-2 text-muted-foreground">{ch.p}</p>
                </li>
              ))}
            </ol>
            <p className="mt-12 border-l-2 border-[hsl(var(--cyan))] pl-5 text-xl font-semibold md:text-2xl">{c.me.goal}</p>
          </div>
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <IdeaNetwork labels={c.me.nodes} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Me;
