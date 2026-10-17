// Copied from LinkedIn (linkedin.com/in/arnaudrinquin), oct. 2026.
type Job = {
  company: string;
  role: string;
  start: string;
  end: string | null;
  location?: string;
  description: string[]; // paragraphs
  skills?: string[];
};

export const cv = {
  headline: "Product Engineer",
  location: "Tours, France",
  summary: [
    "Product engineer, 15+ years of building products from first prototype to large-scale systems.",
    "These days my center of gravity is AI. I build agents and AI-first features end-to-end (agentic loops, RAG, evals, LLM observability) and the product work around them: analytics, user interviews, endless tinkering.",
    "Working AI-native changed how I engineer: less typing, more architecture and product judgment.",
    "Under that: full-stack roots in the JavaScript/TypeScript ecosystem, Go on the backend, CI/CD and DevOps when the job calls for it. I've led engineering teams too, and I care a lot about tooling, DX and the compound effect of removing friction.",
  ],
  experience: [
    {
      company: "Teetsh",
      role: "Product Engineer",
      start: "Oct 2025",
      end: null,
      location: "Remote",
      description: [
        "Joined as a do-it-all Product Engineer to power-up the small but mighty Teetsh crew: feature delivery across the whole product (director space, Australian launch, localization) with a side mission on tech practices, reliability and DX (monorepo, CI/CD rebuild, AI-assisted dev tooling).",
        "Then AI changed the shape of the job. A prototype AI teaching assistant I built as a secret side project convinced the team to go all-in, and I'm now in charge of everything AI at Teetsh: the agent itself (tools, sub-agents, memory, skills, LLM-agnostic core) and the features built on it — AI document import (10–30% of content creation since day 1), AI onboarding (3x faster activation), generation grounded in the official programmes. Shipping AI means endless iteration, so I also built the measurement stack: tracing, an eval harness with LLM judges, cost and quality dashboards.",
        "Working AI-native compressed the \"how\" down to architecture and keeps pulling me up the stack: product analytics, session replays, user interviews, dogfooding.",
        "There's still so much to do!",
      ],
      skills: ["React.js", "Product Engineering", "AI", "Agents", "TypeScript", "Go"],
    },
    {
      company: "Pigment",
      role: "Software Engineer",
      start: "Nov 2024",
      end: "Oct 2025",
      location: "Paris · Remote",
      description: [
        "Software Engineer on the Ingestion team: the pipes that bring customer data into Pigment, at serious scale.",
        "New territory on purpose: C#, distributed systems way bigger than anything I'd touched, and the engineering maturity that comes with that size.",
        "Pigment had a clean backend/frontend split, and it was never quite settled which side I was hired for. I settled it on day one: \"I'm only interested in doing everything.\" So I went full-stack anyway, built prototypes, poked at the product side. Some of those experiments involved AI; one took 2nd place at the company hackathon, one vote short of winning.",
        "A great chapter of learning among absurdly smart people. It also confirmed where I do my best work: early stage, broad scope, direct impact, lots of room to experiment. That's exactly what I went looking for next.",
      ],
      skills: ["React.js", "TypeScript", "C#"],
    },
    {
      company: "Naboo",
      role: "Director of Engineering",
      start: "Mar 2024",
      end: "Oct 2024",
      location: "Paris · Remote",
      description: [
        "Director of Engineering at Naboo, a rocket ship at full burn. The ambition was crazy, the pace crazier. I loved it.",
        "My job was making the machine faster and more reliable, and every efficiency gain the team made got immediately reinvested into going faster still. Deadlines were non-negotiable, and we hit them.",
        "That intensity teaches you things no calmer company can: how to deliver on time under real pressure, and how the right kind of pressure sharpens a team's focus. I kept all of it.",
        "With my second kid on the way, I chose a pace that fit family life. Naboo kept flying, which tells you everything about that team.",
      ],
      skills: ["React.js", "Engineering Management"],
    },
    {
      company: "Slite",
      role: "Software Engineering Manager",
      start: "Aug 2021",
      end: "Feb 2024",
      location: "Remote",
      description: [
        "I lead a product development team while also actively contributing to individual development efforts.",
        "In my managerial role, I prioritize the growth of my team members' skills, both within and beyond technical domains, enabling them to take ownership of their projects with increasing independence.",
        "As the lead engineer, I serve as a trusted partner to my Product Manager and a strong advocate for my team. This involves tasks like prioritizing missions, coordinating deliveries, reviewing technical designs, and making significant contributions myself.",
        "In this capacity, I've successfully overseen major projects, including the comprehensive overhaul of Slite's public sharing and collections features, and I'm currently driving forward growth-oriented initiatives.",
      ],
      skills: ["Engineering Management", "CI/CD"],
    },
    {
      company: "Slite",
      role: "Senior Developer",
      start: "Nov 2016",
      end: "Aug 2021",
      location: "Remote",
      description: [
        "As one of the pioneering engineers at Slite, I dedicated myself to every facet of its development, adapting and learning to build what was necessary.",
        "Among the numerous projects I undertook, the most formidable and gratifying were those that directly influenced the core of the product: implementing features like document nesting, precise permissions, public sharing, the payment system, and navigation.",
        "I also take great pride in my contributions to infrastructure and tooling. I established the CI/CD pipeline, upheld the GCP infrastructure, and crafted various tools to enhance the Slite development process.",
        "These efforts brought me into close collaboration with product managers and designers, ensuring seamless project deliveries. This, in turn, culminated in my promotion to the role of Software Engineering Manager.",
      ],
      skills: ["React.js", "Node.js", "GraphQL"],
    },
    {
      company: "eFounders",
      role: "Full Stack Developer",
      start: "Nov 2016",
      end: "Dec 2017",
      location: "Remote",
      description: [
        "As the third member of Slite, I contributed at every level of the technical stack. From a quirky Firebase-based MVP to a solid distributed platform handling thousands of daily users.",
        "This led me to setup many projects, build the initial feature-set and the early bits of our infrastructure.",
        "As the product gained traction, we grew out of eFounders, attended Y Combinator (W18) and officially started the company.",
      ],
      skills: ["React.js", "Node.js"],
    },
    { company: "Opinary", role: "Frontend Developer", start: "Apr 2016", end: "Nov 2016", location: "Remote", description: [] },
    { company: "Songkick", role: "Frontend Developer", start: "Jun 2015", end: "Apr 2016", location: "London", description: [], skills: ["AngularJS"] },
    { company: "Qumu", role: "Frontend Developer", start: "Nov 2014", end: "Jun 2015", location: "London", description: [] },
    {
      company: "Wopata",
      role: "Web Developer",
      start: "Jun 2013",
      end: "Nov 2014",
      location: "Bordeaux",
      description: ["Full stack web development. Advanced front end clients with AngularJS, reliable API with Ruby."],
      skills: ["AngularJS", "Ruby"],
    },
    {
      company: "Orange",
      role: "Software Engineer",
      start: "Aug 2011",
      end: "Jun 2013",
      location: "Grenoble",
      description: ["M2M - Home Automation solution architecture and project management."],
    },
  ] satisfies Job[],
  education: [
    { school: "IMT Atlantique", degree: "Engineering degree, IT & networks", start: "2007", end: "2010" },
    { school: "IUT de Vannes", degree: "DUT, Computer Science", start: "2005", end: "2007" },
  ],
  skills: ["Product Engineering", "AI", "Agents", "TypeScript", "Full-Stack Development", "Go", "Node.js", "React", "GraphQL", "C#", "Engineering Management", "CI/CD"],
  languages: [
    { name: "English", level: "bilingual" },
    { name: "French", level: "native" },
    { name: "Spanish", level: "elementary" },
  ],
};
