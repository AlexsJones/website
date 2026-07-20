export type Experience = {
  org: string;
  role: string;
  span: string;
  loc: string;
  detail?: string;
};

export const EXPERIENCE: Experience[] = [
  { org: "Amazon Web Services", role: "Principal Engineer", span: "Aug 2023 — present", loc: "London" },
  { org: "k8sgpt.ai", role: "Founder (open-source project)", span: "Mar 2023 — present", loc: "" },
  { org: "OpenFeature", role: "Governing Committee", span: "Jul 2023 — Feb 2024", loc: "" },
  { org: "CNCF", role: "Tech Lead, TAG App-Delivery", span: "Jun 2021 — Feb 2024", loc: "" },
  { org: "Keptn", role: "Advisory Board Member", span: "May 2021 — Sep 2023", loc: "" },
  {
    org: "Canonical",
    role: "Engineering Director, Kubernetes",
    span: "Jan 2022 — Aug 2023",
    loc: "",
    detail:
      "Led the Kubernetes organisation: product and engineering vision, new MicroK8s capabilities, community ecosystem growth.",
  },
  { org: "Ondat", role: "Advisor (until Akamai acquisition)", span: "Jun 2022 — Mar 2023", loc: "UK" },
  {
    org: "Civo",
    role: "Principal SRE",
    span: "May 2021 — Jan 2022",
    loc: "",
    detail:
      "Built super-cluster capabilities, observability, recovery, backup and security systems.",
  },
  { org: "JPMorgan Chase & Co.", role: "VP, Site Reliability Engineering", span: "Dec 2020 — May 2021", loc: "London" },
  { org: "American Express", role: "Engineering Director, SRE", span: "May 2019 — Dec 2020", loc: "London" },
  { org: "Beamery", role: "Head of Platform & Infrastructure", span: "May 2017 — May 2019", loc: "London" },
  { org: "Sky", role: "Lead DevOps Engineer", span: "Apr 2016 — May 2017", loc: "London" },
  { org: "Casewise", role: "Lead Technical Architect", span: "Apr 2015 — Apr 2016", loc: "Mayfair" },
  { org: "Microsoft", role: "Senior Software Engineer", span: "Oct 2013 — Apr 2015", loc: "Lionhead Studios" },
  { org: "BSkyB", role: "Technical Lead, iOS / Mobile", span: "Apr 2011 — Oct 2013", loc: "Osterley" },
  { org: "Grapple Mobile", role: "Frontend Developer", span: "Jul 2010 — Apr 2011", loc: "" },
];

export const SKILLS = [
  "Distributed Systems",
  "Kubernetes",
  "Systems Design",
  "AI in Cloud",
  "AWS",
  "Observability",
  "DevOps",
  "Platform Engineering",
  "Go",
  "Rust",
  "Linux",
  "Open Source",
  "Long-term Vision",
  "Communication",
];

/** First calendar year in a span string, e.g. "Aug 2023 — present" -> 2023. */
export function startYear(span: string): number {
  const m = span.match(/(\d{4})/);
  return m ? parseInt(m[1], 10) : 2010;
}
