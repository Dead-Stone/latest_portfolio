export interface Experience {
  company: string
  role: string
  location: string
  period: string
  description: string[]
  logo?: string
}

export const experiences: Experience[] = [
  {
    company: 'Gembizz LLC',
    role: 'Founding Engineer',
    location: 'San Jose, CA',
    period: 'Aug 2025 – Present',
    logo: '/exp/Gemizz Brand identity-18.png',
    description: [
      'Built LLM-driven workflows that convert raw user input into structured business profiles and narrative-style stories, powering personalized discovery and community engagement for 1,000+ active users.',
      'Developed recommendation workflows leveraging user interaction signals and embedding-based similarity to customize content and profile ranking.',
      'Designed service APIs using Python (FastAPI) and TypeScript, integrated with MongoDB Atlas and AWS to support inference, context assembly, and response orchestration.',
      'Operated containerized services with production-grade observability, telemetry, and cost-aware scaling through CI/CD pipelines supporting frequent deployments.',
    ],
  },
  {
    company: 'San José State University',
    role: 'Teaching Assistant',
    location: 'San Jose, CA',
    period: 'Aug 2024 – May 2025',
    logo: '/exp/sjsu.png',
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
    description: [
      'Implemented JVM-based backend services in Scala supporting data-centric workflows for EdTech and media streaming applications.',
      'Created RESTful interfaces enabling analytics ingestion, personalization logic, and multi-client content delivery.',
      'Improved AWS DynamoDB performance through optimized key design and query patterns, reducing API response times by roughly 30%.',
    ],
  },
]
