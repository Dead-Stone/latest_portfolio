export interface Project {
  title: string
  description: string
  technologies: string[]
  period: string
  organization: string
  github?: string
  demo?: string
  /** Optional override; otherwise resolved from organization */
  logo?: string
  /** Live site embed on the featured card (ScorePAL only) */
  previewUrl?: string
  /** Static hero screenshot for featured preview (ScorePAL) */
  previewImage?: string
  /** Popup watermark text below logo, e.g. ['LM Link', 'for Android'] */
  modalWatermarkLines?: string[]
  featured?: boolean
}

export const GITHUB_AVATAR_LOGO = '/projects/github-dead-stone.png'
export const GITHUB_BADGE_LIGHT = '/projects/github-badge-light.svg'

/** Personal / OSS → GitHub avatar; school & employer → logos in public/exp */
export const ORG_LOGOS: Record<string, string> = {
  Personal: GITHUB_AVATAR_LOGO,
  'Open Source': GITHUB_AVATAR_LOGO,
  SJSU: '/exp/sjsu.png',
  Astranetix: '/exp/astranetix.png',
}

export function getProjectLogo(project: Project): string | undefined {
  return project.logo ?? ORG_LOGOS[project.organization]
}

export const projects: Project[] = [
  {
    title: 'ScorePAL: Agentic Evaluation Platform',
    organization: 'SJSU',
    period: 'Dec 2024 – May 2025',
    featured: true,
    logo: '/projects/scorepal-logo.svg',
    description:
      'Multi-agent evaluation system using CrewAI where agents autonomously decompose rubrics, retrieve context via Weaviate vector search, and score submissions using Gemini on GCP. Multimodal RAG over text and image inputs reduced manual grading effort by 60%.',
    technologies: ['Python', 'CrewAI', 'Weaviate', 'Gemini', 'GCP', 'PostgreSQL', 'Multimodal RAG'],
    github: 'https://github.com/Dead-Stone/ScorePAL',
    demo: 'https://score-pal.vercel.app',
    previewUrl: 'https://score-pal.vercel.app',
    previewImage: '/projects/scorepal-preview.png',
  },
  {
    title: 'LM Link for Android',
    organization: 'Open Source',
    period: '2025 – Present',
    featured: true,
    logo: '/projects/lm-link-icon.png',
    modalWatermarkLines: ['LM Link', 'for Android'],
    description:
      'Free, open-source Android client for LM Studio. Stream chat from models on your Mac or PC over Wi‑Fi, or run GGUF models on-device via llama.cpp. Expo + React Native app with local model library, LAN discovery, and streaming chat UI.',
    technologies: ['React Native', 'Expo', 'TypeScript', 'Android', 'llama.cpp', 'LM Studio'],
    github: 'https://github.com/Dead-Stone/lm-link',
    demo: 'https://dead-stone.github.io/lm-link/install.html',
  },
  {
    title: 'AI Suspect Sketch Generator',
    organization: 'Personal',
    period: '2024',
    featured: true,
    description:
      'Text-to-image sketch generation using Stable Diffusion + ControlNet for shape and style consistency. End-to-end full-stack with async job handling and serverless image processing on AWS. 45% latency reduction via embedding caching and request batching.',
    technologies: ['React', 'FastAPI', 'Stable Diffusion', 'ControlNet', 'AWS Lambda', 'S3', 'Python'],
    github: 'https://github.com/Dead-Stone/AI-Suspect-Sketch-Generator',
  },
  {
    title: 'Multimodal RAG System',
    organization: 'Astranetix',
    period: 'Sep – Nov 2024',
    description:
      'Production RAG combining text and document embeddings. Weaviate + GraphQL retrieval, tuned HNSW parameters. Scalable inference on AWS Lambda and S3.',
    technologies: ['Python', 'Weaviate', 'GraphQL', 'AWS Lambda', 'OpenAI', 'GCP'],
    github: 'https://github.com/Dead-Stone/aws-agentic-document-assistant',
  },
  {
    title: 'LangChain + Neo4j Knowledge Graph',
    organization: 'Personal',
    period: '2024',
    description:
      'Knowledge graph-powered RAG using LangChain and Neo4j. Hybrid search combining vector similarity and graph traversal for richer LLM responses.',
    technologies: ['LangChain', 'Neo4j', 'Python', 'RAG', 'Vector Search'],
    github: 'https://github.com/Dead-Stone/langchain_neo4j_app',
  },
  {
    title: 'Movie Ticket Booking System',
    organization: 'SJSU',
    period: 'Aug – Nov 2023',
    description:
      'Full-stack booking platform with React, Node.js, and GraphQL for real-time seat selection. Microservice backend with MongoDB, containerized via Docker, deployed with CI/CD.',
    technologies: ['React', 'Node.js', 'GraphQL', 'MongoDB', 'Docker'],
    github: 'https://github.com/Dead-Stone/CMPE281_Project',
  },
  {
    title: 'Expira: ID Expiry Tracker',
    organization: 'Personal',
    period: '2023',
    description:
      'Flutter mobile app scanning ID documents and tracking expiry dates. OCR-based extraction, push notifications, offline-first, cross-platform iOS & Android.',
    technologies: ['Flutter', 'Dart', 'OCR', 'Firebase'],
  },
]
