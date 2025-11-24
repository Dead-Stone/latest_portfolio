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
    period: 'Aug 2025 - Present',
    logo: '/exp/Gemizz Brand identity-18.png',
    description: [
      'Designed and developed a modern progressive web app using FastAPI and React with Vite, leveraging asynchronous APIs and hot module reloading to accelerate development and optimize user experience.',
      'Built scalable backend microservices deployed on AWS EC2 with Docker and integrated MongoDB Atlas, automating CI/CD pipelines to reduce deployment time by 50% and ensure reliable, performant data interactions.',
      'Implemented secure system networking and IAM configurations to enable real-time communication features for business districts and merchants, increasing user engagement by 25%.',
    ],
  },
  {
    company: 'San José State University',
    role: 'Instructional Student Assistant',
    location: 'San Jose, CA',
    period: 'Aug 2024 - May 2025',
    logo: '/exp/sjsu.png', // Will need to add this logo
    description: [
      'Assisted in teaching and mentoring students in software engineering courses including CMPE 132 (Information Security), CMPE 148 (Networking), and CMPE 257 (Machine Learning).',
      'Provided academic support, graded assignments, and facilitated learning through hands-on guidance and technical assistance.',
    ],
  },
  {
    company: 'Astranetix Corporation',
    role: 'AI Engineer',
    location: 'San Jose, CA',
    period: 'Sept 2024 - Nov 2024',
    logo: '/exp/astranetix.png', // Update extension if different
    description: [
      'Developed multimodal Retrieval-Augmented Generation (RAG) systems using Python, Django, Weaviate, GraphQL and OpenAI, deploying serverless architectures with AWS Lambda to boost scalability and accuracy.',
      'Integrated Apollo Router to optimize federated GraphQL query performance and improve cross-service communication by 40%.',
      'Improved response times by using optimized recommendation algorithms, HNSW indexing, and efficient data pipelines.',
    ],
  },
  {
    company: 'Flatirons AI LLC',
    role: 'AI Product Manager',
    location: 'San Jose, CA',
    period: 'May 2024 - Aug 2024',
    logo: '/exp/FlatironsAILogo.001-325560603.jpeg',
    description: [
      'Led the design and deployment of scalable ETL pipelines with AWS Glue and PySpark for generative AI and recommendation systems, utilizing Neo4j and Microsoft GraphRAG for advanced graph analytics.',
      'Oversaw cross-functional teams, architecting model solutions and leveraging Azure and AWS for production AI model management and deployment.',
    ],
  },
  {
    company: 'Alter Domus',
    role: 'Officer 1 - Associate Developer',
    location: 'Hyderabad, TS',
    period: 'May 2023 - June 2023',
    logo: '/exp/alterDomus_Logotype-568053331.png',
    description: [
      'Architected and implemented solutions for database and server issues, optimizing performance of ASP files and procedures.',
      'Collaborated with cross-functional teams to resolve technical challenges and improve system efficiency.',
    ],
  },
  {
    company: 'Deloitte Touche Tohmatsu India LLP',
    role: 'Associate Software Engineer',
    location: 'Hyderabad, TS',
    period: 'Aug 2021 - May 2023',
    logo: '/exp/Deloitte-Logo-PNG-Cutout-1845527513.png',
    description: [
      'Developed and optimized fintech web applications using React and TypeScript within a large-scale, enterprise environment focused on security, performance, and user experience.',
      'Designed and implemented GraphQL API integrations to enhance data access efficiency and enable responsive real-time functionality across distributed systems.',
      'Implemented and maintained automated CI/CD pipelines using Harness, supporting continuous delivery and compliance across multiple client engagements, improving deployment velocity by 40%.',
      'Collaborated across global, cross-disciplinary Agile teams to align software development with complex business requirements, regulatory standards, and client objectives.',
      'Delivered high-quality solutions through automated testing frameworks and rigorous QA processes, reducing post-production defects by 25% and ensuring enterprise-grade software reliability.',
    ],
  },
  {
    company: 'Turito Pvt. Ltd.',
    role: 'Software Developer',
    location: 'Hyderabad, TS',
    period: 'Jan 2021 - Jul 2021',
    logo: '/exp/turito.png',
    description: [
      'Designed and developed a RESTful API using Scala and SQL for a high-traffic educational platform, ensuring scalability to support 100,000+ monthly users.',
      'Optimized backend processes by integrating with AWS DynamoDB for low-latency data storage.',
      'Crafted SQL queries, designed database schema, and programmed procedures to execute essential functionalities.',
    ],
  },
  {
    company: 'YuppTV Inc.',
    role: 'Software Developer',
    location: 'Hyderabad, TS',
    period: 'Oct 2020 - Dec 2020',
    logo: '/exp/yupptv-dark-logo-1974195674.png',
    description: [
      'Worked on streaming service applications, improving user experience and platform performance.',
      'Developed and maintained features for video streaming platform with focus on scalability and reliability.',
    ],
  },
  {
    company: 'YuppTV Inc.',
    role: 'Job Intern',
    location: 'Hyderabad, TS',
    period: 'Jan 2020 - Sep 2020',
    logo: '/exp/yupptv-dark-logo-1974195674.png',
    description: [
      'Gained hands-on experience in software development and testing within a production environment.',
      'Contributed to development tasks and learned industry best practices for software engineering.',
    ],
  },
  {
    company: 'CDAC Centre for Development of Advanced Computing',
    role: 'Summer Intern',
    location: 'Hyderabad, TS',
    period: 'June 2019 - July 2019',
    logo: '/exp/c-dac-hyderabad-c-dac-thiruvananthapuram-centre-for-development-of-advanced-computing-logo-png-favpng-uP3K0bczqGPSE2yaA2BsiEDsm-37927330.jpg',
    description: [
      'Engaged in research and development projects, enhancing technical skills in advanced computing technologies.',
      'Worked on cutting-edge projects and gained exposure to industry-standard development practices.',
    ],
  },
]

