/** Cifre che scorrono verticalmente come un contachilometri. */
const Odometer = ({ value, animate = true }: { value: number; animate?: boolean }) => {
  const text = value.toLocaleString("it-IT");
  if (!animate) return <span>{text}</span>;
  return (
    <span className="inline-flex" aria-label={text}>
      {text.split("").map((ch, i) =>
        /\d/.test(ch) ? (
          <span key={`${text.length}-${i}`} aria-hidden className="relative inline-block h-[1em] overflow-hidden leading-none">
            <span
              className="block transition-transform duration-700 ease-[cubic-bezier(.2,.8,.2,1)]"
              style={{ transform: `translateY(-${Number(ch) * 10}%)` }}
            >
              {"0123456789".split("").map((d) => (
                <span key={d} className="block h-[1em]">{d}</span>
              ))}
            </span>
          </span>
        ) : (
          <span key={`${text.length}-${i}`} aria-hidden className="leading-none">{ch}</span>
        ),
      )}
    </span>
  );
};

export default Odometer;
