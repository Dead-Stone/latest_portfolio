'use client'

import { motion } from 'framer-motion'

export default function About() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-8"
        >
          About me
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed"
        >
          <div className="mb-6 p-6 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Education</h3>
            <p className="mb-1 text-gray-700 dark:text-gray-300">
              <strong className="text-gray-900 dark:text-white">Master of Science in Software Engineering</strong> - August 2023 - May 2025
            </p>
            <p className="mb-1 text-gray-600 dark:text-gray-400">San Jose State University | GPA: 3.6/4.0</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Instructional Student Assistant - CMPE 132 (Information Security), CMPE 148 (Networking), CMPE 257 (Machine Learning)
            </p>
            <p className="mb-1 text-gray-700 dark:text-gray-300">
              <strong className="text-gray-900 dark:text-white">Bachelor of Engineering</strong>
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Osmania University, Hyderabad</p>
          </div>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            Hey there, I'm Mohana Satyanarayana Moganti, a software engineer and AI engineer based in San Jose, CA. I'm currently pursuing my Master's in Software Engineering at San Jose State University while working as a Founding Engineer.
          </p>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            I specialize in building scalable full-stack applications, developing AI/ML systems with RAG architectures, and deploying cloud-native solutions. My experience spans from developing fintech applications at Deloitte to building multimodal AI systems and progressive web applications.
          </p>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            I'm passionate about leveraging cutting-edge technologies like FastAPI, React, vector databases, and cloud infrastructure to create solutions that solve real-world problems. Whether it's optimizing CI/CD pipelines, implementing RAG systems, or architecting microservices, I thrive on building systems that are both performant and scalable.
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            Would you like to work together or just chat? Feel free to reach out to me.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

