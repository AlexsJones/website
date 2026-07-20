import Reveal from "./Reveal";

/** Standard inner-page masthead: bracket label + big serif title. */
export default function PageHeader({
  index,
  label,
  title,
  accent,
  intro,
}: {
  index: string;
  label: string;
  title: string;
  accent?: string;
  intro?: string;
}) {
  return (
    <Reveal>
      <div className="mb-14">
        <div className="label mb-4">
          [ {index} / {label} ]
        </div>
        <h1 className="font-display text-5xl sm:text-7xl text-bone leading-[0.95]">
          {title}{" "}
          {accent && <span className="italic text-ember">{accent}</span>}
        </h1>
        {intro && (
          <p className="mt-6 text-sm text-bone-dark/80 leading-relaxed max-w-xl">
            {intro}
          </p>
        )}
      </div>
    </Reveal>
  );
}
