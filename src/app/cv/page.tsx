export default function CVPage() {
  return (
    <main className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-2 text-hacker" style={{textShadow: '0 0 8px #39FF14'}}>Alex Jones</h1>
      <div className="mb-6">
        <span className="block text-lg font-bold">Principal Engineer @ AWS</span>
        <span className="block text-sm">London, United Kingdom</span>
        <div className="flex gap-4 mt-2">
          <a href="mailto:alexsimonjones@gmail.com" className="hover:underline text-hacker">alexsimonjones@gmail.com</a>
          <a href="https://github.com/AlexsJones" className="hover:underline text-hacker" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/jonesax/" className="hover:underline text-hacker" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://sessionize.com/jonesax/" className="hover:underline text-hacker" target="_blank" rel="noopener noreferrer">Sessionize</a>
        </div>
      </div>
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-2 text-hacker">Summary</h2>
        <p className="text-hacker/90">I am an individual contributor. My work is mysterious and important. Outside of work I contribute to open-source. The things I know about are: Distributed systems, Kubernetes (Exotic compute), Systems Design, Applications of Artificial Intelligence in Cloud Environments.</p>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-2 text-hacker">Experience</h2>
        <ul className="space-y-4">
          <li><span className="font-bold">Amazon Web Services (AWS)</span> — Principal Engineer<br/><span className="text-sm">Aug 2023 - Present | London</span></li>
          <li><span className="font-bold">k8sgpt.ai</span> — Founder (Opensource Project)<br/><span className="text-sm">Mar 2023 - Present</span></li>
          <li><span className="font-bold">OpenFeature</span> — Governing Committee<br/><span className="text-sm">Jul 2023 - Feb 2024</span></li>
          <li><span className="font-bold">CNCF [Cloud Native Computing Foundation]</span> — Tech Lead TAG App-Delivery<br/><span className="text-sm">Jun 2021 - Feb 2024</span></li>
          <li><span className="font-bold">Keptn</span> — Advisory Board Member<br/><span className="text-sm">May 2021 - Sep 2023</span></li>
          <li><span className="font-bold">Canonical</span> — Engineering Director, Kubernetes<br/><span className="text-sm">Jan 2022 - Aug 2023</span><br/>Leading the Kubernetes organisation at Canonical. Building out the product and engineering vision. Delivering new functional capabilities for MicroK8s and expanding the community ecosystem.</li>
          <li><span className="font-bold">Ondat</span> — Advisor<br/><span className="text-sm">Jun 2022 - Mar 2023 | UK</span> Advisor until Akamai acquisition</li>
          <li><span className="font-bold">Civo</span> — Principal SRE<br/><span className="text-sm">May 2021 - Jan 2022</span> Building out super-cluster capabilities, observability, recovery, backup and security systems.</li>
          <li><span className="font-bold">JPMorgan Chase & Co.</span> — Vice President Site Reliability Engineering<br/><span className="text-sm">Dec 2020 - May 2021 | London</span></li>
          <li><span className="font-bold">American Express</span> — Engineering Director (Site Reliability Engineering)<br/><span className="text-sm">May 2019 - Dec 2020 | London</span></li>
          <li><span className="font-bold">Beamery</span> — Head of Platform & Infrastructure<br/><span className="text-sm">May 2017 - May 2019 | London</span></li>
          <li><span className="font-bold">Beamery</span> — Director of DevOps<br/><span className="text-sm">May 2017 - Jun 2018 | London</span></li>
          <li><span className="font-bold">Sky</span> — Lead DevOps Engineer<br/><span className="text-sm">Apr 2016 - May 2017 | London</span></li>
          <li><span className="font-bold">Casewise</span> — Lead Technical Architect<br/><span className="text-sm">Oct 2015 - Apr 2016 | Mayfair</span></li>
          <li><span className="font-bold">Casewise</span> — Technical Architect<br/><span className="text-sm">Apr 2015 - Oct 2015 | Mayfair</span></li>
          <li><span className="font-bold">Microsoft</span> — Senior Software Engineer<br/><span className="text-sm">Oct 2014 - Apr 2015</span></li>
          <li><span className="font-bold">Microsoft</span> — Software Development Engineer in Test II<br/><span className="text-sm">Oct 2013 - Oct 2014 | Lionhead Studios</span></li>
          <li><span className="font-bold">Lightlance ltd</span> — Director<br/><span className="text-sm">Mar 2014 - Apr 2014</span></li>
          <li><span className="font-bold">BSkyB</span> — Technical Lead (iOS / Mobile)<br/><span className="text-sm">Mar 2013 - Oct 2013 | Osterley</span></li>
          <li><span className="font-bold">BSkyB</span> — Mobile Engineer<br/><span className="text-sm">Apr 2011 - Mar 2013 | Osterley</span></li>
          <li><span className="font-bold">Grapple Mobile</span> — Frontend Developer<br/><span className="text-sm">Jul 2010 - Apr 2011</span></li>
          <li><span className="font-bold">Freelance</span> — Frontend Developer<br/><span className="text-sm">2007 - 2010</span></li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-2 text-hacker">Certifications</h2>
        <ul className="space-y-2">
          <li>Speaker: KubeCon + CloudNativeCon North America 2021</li>
          <li>Speaker: KubeCon + CloudNativeCon North America 2022</li>
          <li>Speaker: KubeCon + CloudNativeCon Europe 2023</li>
          <li>Speaker: KubeCon + CloudNativeCon Europe 2025</li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-2 text-hacker">Skills</h2>
        <ul className="flex flex-wrap gap-4 text-hacker/90">
          <li>Long-term Vision</li>
          <li>Communication</li>
          <li>Amazon Web Services (AWS)</li>
          <li>Distributed Systems</li>
          <li>Kubernetes</li>
          <li>Systems Design</li>
          <li>Artificial Intelligence in Cloud</li>
          <li>DevOps</li>
          <li>Observability</li>
          <li>Go</li>
          <li>Rust</li>
          <li>Linux</li>
          <li>Open Source</li>
          <li>Platform Engineering</li>
        </ul>
      </section>
      <section>
        <h2 className="text-2xl font-bold mb-2 text-hacker">Education</h2>
        <ul>
          <li>Kingston University — First class BsC with Honors, Computer Science (2007 - 2010)</li>
        </ul>
      </section>
    </main>
  );
} 