import Reveal from "./Reveal";

/** Inner-page masthead in the v2 style: huge condensed stencil head with the
 *  extruded shadow, a label beside it, and an optional intro. */
export default function PageHeader(props: {
  index: string;
  label: string;
  title: string;
  accent?: string;
  intro?: string;
}) {
  const { label, title, accent, intro } = props;
  return (
    <Reveal>
      <div className="mb-14">
        <div className="flex flex-wrap items-baseline gap-x-8 gap-y-3">
          <h1 className="font-display cond-x ext text-[clamp(44px,8vw,130px)] leading-[0.88] text-bone">
            {title}{" "}
            {accent && <span className="italic text-ember">{accent}</span>}
          </h1>
          <span className="label">{label}</span>
        </div>
        {intro && (
          <p className="mt-8 max-w-[62ch] font-[family-name:var(--font-archivo)] text-[clamp(17px,1.6vw,22px)] leading-[1.45] text-ash">
            {intro}
          </p>
        )}
      </div>
    </Reveal>
  );
}
