'use client'

import { motion } from 'framer-motion'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'

interface Project {
  title: string
  description: string
  technologies: string[]
  period: string
  organization: string
  github?: string
  demo?: string
}

const projects: Project[] = [
  {
    title: 'Agentic Grading System',
    organization: 'SJSU',
    period: 'Dec 2024 – May 2025',
    description: 'Built an automated agentic grading platform using CrewAI, Weaviate, and Gemini to evaluate text and image submissions. The system uses multimodal RAG, rubric-based reasoning, and multi-agent workflows to produce consistent grading decisions. Designed vector search pipelines and fine-grained retrieval logic to map student answers to rubric criteria, reducing manual grading workload by 60% and improving scoring consistency across evaluators.',
    technologies: ['CrewAI', 'Weaviate', 'Gemini', 'Multimodal RAG', 'Python', 'Vector DB', 'Multi-agent Workflows'],
    github: 'https://github.com/Dead-Stone',
  },
  {
    title: 'Movie Ticket Booking System',
    organization: 'SJSU',
    period: 'Aug 2023 – Nov 2023',
    description: 'Developed a full-stack movie ticket booking platform using React, Node.js, and GraphQL for real-time seat selection and dynamic showtime updates. Implemented optimized resolvers and schema design to eliminate over-fetching and improve query performance. Built microservice-based backend services with MongoDB, containerized using Docker, and deployed via a CI/CD pipeline inspired by Harness automation. Added caching and rate-limiting to ensure responsiveness under high concurrent user load.',
    technologies: ['React', 'Node.js', 'GraphQL', 'MongoDB', 'Docker', 'CI/CD', 'Microservices', 'Harness'],
    github: 'https://github.com/Dead-Stone',
  },
  {
    title: 'Remote Joystick',
    organization: 'Osmania University',
    period: 'Nov 2019 – Jan 2020',
    description: 'Built a real-time remote joystick system using React and Python with optimized TCP socket communication. The architecture achieved sub-10ms input latency, enabling responsive gameplay even on low-end client devices. Implemented client-side prediction and real-time state synchronization to avoid lag spikes during gameplay, improving usability and reducing input jitter under fluctuating network conditions.',
    technologies: ['React', 'Python', 'TCP', 'Socket Programming', 'Real-time Systems', 'Network Optimization'],
    github: 'https://github.com/Dead-Stone',
  },
  {
    title: 'Expira',
    organization: '',
    period: '',
    description: 'Flutter mobile application that scans ID documents and tracks expiry dates. Features OCR-based ID scanning, automatic expiry date extraction, and notification system to alert users before documents expire. Built with Flutter for cross-platform compatibility and integrated with camera and image processing capabilities for seamless document scanning.',
    technologies: ['Flutter', 'Dart', 'OCR', 'Camera', 'Image Processing', 'Mobile Development'],
    github: 'https://github.com/Dead-Stone',
  },
  {
    title: 'Multimodal RAG System',
    organization: '',
    period: '',
    description: 'Developed a Retrieval-Augmented Generation system for AI applications using Python, Django, Weaviate, and GraphQL. Deployed serverless architecture with AWS Lambda, optimized with Apollo Router for improved query performance.',
    technologies: ['Python', 'Django', 'Weaviate', 'GraphQL', 'Apollo Router', 'AWS Lambda', 'OpenAI'],
    github: 'https://github.com/Dead-Stone',
  },
  {
    title: 'Fintech Web Application',
    organization: '',
    period: '',
    description: 'Enterprise-grade fintech web application built with React and TypeScript. Features GraphQL API integrations, real-time functionality, automated CI/CD with Harness, and comprehensive testing frameworks for high reliability.',
    technologies: ['React', 'TypeScript', 'GraphQL', 'Harness', 'Jest', 'Testing'],
    github: 'https://github.com/Dead-Stone',
  },
]

export default function Projects() {
  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center"
        >
          My projects
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-900/50 p-6 hover:shadow-xl dark:hover:shadow-gray-900 transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400"
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{project.title}</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-4">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    <FaGithub /> Github
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    <FaExternalLinkAlt /> Demo
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

