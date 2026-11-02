import Reveal from "./Reveal";

/** Inner-page masthead, formatted like the v2 home page's Findings section:
 *  condensed stencil head with a label beside it, then an Archivo lede. */
export default function PageHeader(props: {
  index: string;
  label: string;
  title: string;
  accent?: string;
  intro?: React.ReactNode;
}) {
  const { label, title, accent, intro } = props;
  return (
    <Reveal>
      <div className="v2-sec-head">
        <h1>
          {title}{" "}
          {accent && <span className="italic">{accent}</span>}
        </h1>
        <span className="label">{label}</span>
      </div>
      {intro && <p className="v2-lede">{intro}</p>}
    </Reveal>
  );
}
