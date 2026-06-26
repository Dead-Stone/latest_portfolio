export interface Experience {
  company: string
  role: string
  location: string
  period: string
  description: string[]
  logo?: string
  /** Base filename (no extension) under public/exp/office/ */
  officePhotoKey?: string
  /** Internships and academic roles — omitted from About stats */
  excludeFromCareerStats?: boolean
}

export const experiences: Experience[] = [
  {
    company: 'NextPhase.ai',
    role: 'AI Engineer',
    location: 'San Jose, CA',
    period: 'Apr 2026 – Present',
    logo: '/exp/nextphase-ai.png',
    officePhotoKey: 'nextphase-ai',
    description: [
      'Delivered a complete enterprise AI package covering infra provisioning, model deployment on AWS EKS with ArgoCD, LLM evaluation with RAGAS, observability via OpenTelemetry and Grafana, and per-client usage and cost analytics.',
      'Built a production RAG system for secure document interaction using LangChain, Weaviate, and OpenAI, integrating Microsoft Presidio, GLiNER, and Microsoft Purview for PII redaction, NER, and enterprise data governance before content entered the context window.',
      'Designed agentic workflows with CrewAI and LlamaIndex for multi-step document reasoning, automated report generation, and tool-augmented extraction pipelines across client datasets.',
      'Built an Ansible Playbook Sandbox, a browser-based IDE for storing, composing, and executing Ansible playbooks with a pre-built YAML block library covering common infra tasks, paired with an AI assistant for on-the-go playbook generation, explanation, and debugging in real time.',
    ],
  },
  {
    company: 'Gembizz LLC',
    role: 'Founding Engineer',
    location: 'San Jose, CA',
    period: 'Aug 2025 – Apr 2026',
    logo: '/exp/Gemizz Brand identity-18.png',
    officePhotoKey: 'gembizz',
    description: [
      'Built LLM-driven workflows that convert raw user input into structured business profiles and narrative-style stories, powering personalized discovery and community engagement for 1,000+ active users.',
      'Developed recommendation pipelines leveraging user interaction signals and embedding-based similarity to customize content and profile ranking.',
      'Designed service APIs in Python (FastAPI) and TypeScript, integrated with MongoDB Atlas and AWS for inference, context assembly, and response orchestration.',
      'Operated containerized services with production observability, telemetry, and cost-aware scaling through CI/CD supporting frequent deployments.',
    ],
  },
  {
    company: 'San José State University',
    role: 'Teaching Assistant',
    location: 'San Jose, CA',
    period: 'Aug 2024 – May 2025',
    logo: '/exp/sjsu.png',
    officePhotoKey: 'sjsu',
    excludeFromCareerStats: true,
    description: [
      'Supported courses in Machine Learning, Networking, and Information Security. Mentored students on distributed systems, consistency models, and high-availability design.',
      'Led lab sessions and debugging walkthroughs covering model evaluation, network protocols, and Linux system internals, helping students apply theoretical concepts to practical implementations.',
    ],
  },
  {
    company: 'Astranetix Corporation',
    role: 'AI Engineer',
    location: 'San Jose, CA',
    period: 'Sep 2024 – Nov 2024',
    logo: '/exp/astranetix.png',
    officePhotoKey: 'astranetix',
    description: [
      'Developed and productionized multimodal Retrieval-Augmented Generation solutions combining text and document embeddings to ground large language model outputs.',
      'Established chunking, embedding, and vector retrieval workflows using Weaviate and GraphQL, tuning HNSW parameters to improve semantic recall and reduce inference latency.',
      'Evaluated models from GCP Model Garden to inform production model selection; operated scalable inference services on AWS Lambda and S3 with a focus on throughput control, fault tolerance, and cost efficiency.',
    ],
  },
  {
    company: 'Flatirons AI LLC',
    role: 'AI Intern',
    location: 'San Jose, CA',
    period: 'Apr 2024 – Aug 2024',
    logo: '/exp/FlatironsAILogo.001-325560603.png',
    officePhotoKey: 'flatirons-ai',
    description: [
      'Evaluated advanced RAG techniques including GraphRAG and RAPTOR to enhance multi-hop reasoning and contextual grounding over large document corpora.',
      'Adapted embedding models and task-specific language models using domain datasets; constructed offline evaluation workflows to assess relevance, precision, recall, and latency.',
      'Executed controlled A/B experiments across chunking strategies, embedding choices, and retrieval parameters to inform production-ready configuration decisions.',
    ],
  },
  {
    company: 'Deloitte Touche Tohmatsu India LLP',
    role: 'Associate Software Analyst',
    location: 'Hyderabad, India',
    period: 'Aug 2021 – Jun 2023',
    logo: '/exp/Deloitte-Logo-PNG-Cutout-1845527513.png',
    officePhotoKey: 'deloitte',
    description: [
      'Contributed to data-intensive, compliance-focused fintech platforms by developing Python-based backend services integrated with Angular frontends.',
      'Implemented REST and GraphQL interfaces in Python to enable analytics, reporting, and integration with downstream data-driven and intelligent systems.',
      'Prototyped AI-oriented pipelines for text classification, information extraction, and similarity search on enterprise datasets to assess automation feasibility.',
      'Strengthened automated testing, release validation, and CI/CD processes, improving deployment reliability and reducing post-release defects by ~25%.',
      'Recognized with a Spot Award for delivering high-impact solutions and consistently exceeding performance and quality expectations.',
    ],
  },
  {
    company: 'Turito / YuppTV',
    role: 'Trainee Software Engineer',
    location: 'Hyderabad, India',
    period: 'Jan 2020 – Jul 2021',
    logo: '/exp/turito.png',
    officePhotoKey: 'turito',
    description: [
      'Implemented JVM-based backend services in Scala supporting data-centric workflows for EdTech and media streaming applications.',
      'Created RESTful interfaces enabling analytics ingestion, personalization logic, and multi-client content delivery.',
      'Improved AWS DynamoDB performance through optimized key design and query patterns, reducing API response times by roughly 30%.',
    ],
  },
  {
    company: 'CDAC (Centre for Development of Advanced Computing)',
    role: 'Summer Intern',
    location: 'Hyderabad, India',
    period: 'Jun 2019 – Jul 2019',
    logo: '/exp/Logo_for_the_Centre_for_Development_of_Advanced_Computing.svg',
    officePhotoKey: 'cdac',
    excludeFromCareerStats: true,
    description: [
      'Completed a summer internship focused on cybersecurity fundamentals and Linux system administration at India’s national R&D institution for advanced computing.',
      'Gained hands-on experience with Kali Linux, core Linux commands, and security best practices in lab environments.',
    ],
  },
]
