export type SpeakingEvent = {
  title: string;
  event: string;
  date: string;
  location: string;
  link: string;
};

export const speakingEvents: SpeakingEvent[] = [
  {
    title: "Beyond the Clouds: Charting the course for AI in the CloudNative world",
    event: "CNCF-hosted Co-located Events Europe 2024",
    date: "March 2024",
    location: "Paris, France",
    link: "https://sessionize.com/jonesax/"
  },
  {
    title: "K8sGPT: Balancing AI's Productivity Boost with Ethical Considerations in Cloud-Native",
    event: "KubeCon + CloudNativeCon North America 2023",
    date: "November 2023",
    location: "Chicago, Illinois, United States",
    link: "https://sessionize.com/jonesax/"
  },
  {
    title: "Rust Operators For Kubernetes",
    event: "PlatformCon 2023",
    date: "June 2023",
    location: "Online",
    link: "https://sessionize.com/jonesax/"
  },
  {
    title: "Crowdsourcing a Kubernetes distribution: What we learnt with MicroK8s",
    event: "KubeHuddle Sessionize Event",
    date: "October 2022",
    location: "Edinburgh, United Kingdom",
    link: "https://sessionize.com/jonesax/"
  },
  {
    title: "SLO's don't matter: A nihilist's guide to reliability",
    event: "WTF is SRE? A Virtual Conference by SREs for SREs 2022",
    date: "April 2022",
    location: "Online",
    link: "https://sessionize.com/jonesax/"
  },
  {
    title: "Introduction to OpenFeature",
    event: "Various",
    date: "2022-2024",
    location: "Various",
    link: "https://sessionize.com/jonesax/"
  }
]; 