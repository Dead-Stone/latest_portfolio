'use client'

import { motion } from 'framer-motion'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'

interface Project {
  title: string
  description: string
  technologies: string[]
  github?: string
  demo?: string
}

const projects: Project[] = [
  {
    title: 'Agentic Grading System',
    description: 'Built multimodal RAG system with an agentic framework to grade students efficiently. Implemented using Weaviate vector DB, CrewAI, UnstructuredIO, and Gemini models. This system automates the grading process while maintaining accuracy and providing detailed feedback.',
    technologies: ['Python', 'Weaviate', 'CrewAI', 'UnstructuredIO', 'Gemini', 'RAG', 'Vector DB'],
    github: 'https://github.com/Dead-Stone',
  },
  {
    title: 'Remote Joystick',
    description: 'Created a Google Stadia-like TCP system application to play high-end games on a lightweight system with less hardware components. Achieved less than 10ms latency using ReactJS and Python, enabling seamless cloud gaming experiences.',
    technologies: ['ReactJS', 'Python', 'TCP', 'Network Programming'],
    github: 'https://github.com/Dead-Stone',
  },
  {
    title: 'Gembizz Progressive Web App',
    description: 'Modern progressive web application for business districts and merchants. Built with FastAPI backend and React frontend with Vite, featuring real-time communication, scalable microservices architecture, and automated CI/CD pipelines.',
    technologies: ['FastAPI', 'React', 'Vite', 'MongoDB', 'Docker', 'AWS EC2', 'CI/CD'],
    github: 'https://github.com/Dead-Stone',
  },
  {
    title: 'Multimodal RAG System',
    description: 'Developed a Retrieval-Augmented Generation system for AI applications using Python, Django, Weaviate, and GraphQL. Deployed serverless architecture with AWS Lambda, optimized with Apollo Router for improved query performance.',
    technologies: ['Python', 'Django', 'Weaviate', 'GraphQL', 'Apollo Router', 'AWS Lambda', 'OpenAI'],
    github: 'https://github.com/Dead-Stone',
  },
  {
    title: 'Fintech Web Application',
    description: 'Enterprise-grade fintech web application built with React and TypeScript. Features GraphQL API integrations, real-time functionality, automated CI/CD with Harness, and comprehensive testing frameworks for high reliability.',
    technologies: ['React', 'TypeScript', 'GraphQL', 'Harness', 'Jest', 'Testing'],
    github: 'https://github.com/Dead-Stone',
  },
  {
    title: 'Educational Platform API',
    description: 'RESTful API for high-traffic educational platform supporting 100,000+ monthly users. Built with Scala and SQL, optimized with AWS DynamoDB for low-latency data storage and scalable database architecture.',
    technologies: ['Scala', 'SQL', 'AWS DynamoDB', 'REST API', 'Microservices'],
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

