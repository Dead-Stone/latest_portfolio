'use client'

import { motion } from 'framer-motion'

const skills = [
  // Programming Languages
  'Python',
  'TypeScript',
  'Golang',
  'Scala',
  'C++',
  'Java',
  'JavaScript',
  'SQL',
  // Web Development
  'FastAPI',
  'ReactJS',
  'Svelte',
  'Spring Boot',
  'Apollo Router',
  'Django',
  'Flask',
  'Tailwind',
  'Material UI',
  // Databases
  'MySQL',
  'MongoDB',
  'Neo4j',
  'Weaviate',
  'PostgreSQL',
  'Pinecone',
  'AstraDB',
  'ChromaDB',
  // CI/CD & DevOps
  'Gitlab CI',
  'Github Actions',
  'Harness Pipeline',
  'ArgoCD',
  'Docker',
  'Kubernetes',
  'AWS EKS',
  // Cloud & Big Data
  'AWS',
  'Azure',
  'Databricks',
  'Snowflake',
  'Hadoop',
  'Spark',
  'Flink',
  // QA and Testing
  'Selenium',
  'Postman',
  'JUnit',
  'TestNG',
  'Jira',
]

export default function Skills() {
  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center"
        >
          My skills
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4"
        >
          {skills.map((skill, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 cursor-default shadow-sm dark:shadow-gray-900/50 hover:shadow-md hover:scale-105"
            >
              {skill}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

