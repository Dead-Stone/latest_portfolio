'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { FaLinkedin, FaGithub, FaArrowDown } from 'react-icons/fa'

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden bg-white dark:bg-gray-900 md:bg-transparent">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 dark:bg-blue-600 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20 dark:opacity-10 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-400 dark:bg-purple-600 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20 dark:opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-400 dark:bg-pink-600 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20 dark:opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-6xl mx-auto z-10">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
          {/* Photo Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: -50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-shrink-0"
          >
            <div className="relative w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 rounded-full p-1 animate-gradient"></div>
              <div className="relative w-full h-full rounded-full overflow-hidden bg-white dark:bg-gray-800 p-1 shadow-2xl dark:shadow-gray-900/50">
                <Image
                  src="/mohana-pixel.jpeg"
                  alt="Mohana Moganti"
                  fill
                  className="object-cover rounded-full"
                  sizes="(max-width: 768px) 192px, (max-width: 1024px) 256px, 320px"
                  priority
                />
              </div>
            </div>
          </motion.div>

          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-4"
              >
                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 font-medium mb-2">Hi there, I'm</p>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 leading-tight"
              >
                <span className="block text-gray-900 dark:text-white">Mohana</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 animate-gradient">
                  Moganti
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-3 leading-relaxed"
              >
                Software Engineer & AI Engineer
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="text-base md:text-lg text-gray-600 dark:text-gray-400 mb-8"
              >
                Based in San Jose • Specializing in Full-Stack Development, AI/ML Systems, and Cloud Infrastructure
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mb-6"
              >
                <a
                  href="#contact"
                  className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 text-white rounded-full font-semibold text-lg shadow-lg dark:shadow-gray-900/50 hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
                >
                  <span className="relative z-10">Get in Touch</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-500 dark:to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </a>
                <a
                  href="/Resumev1_12082025.pdf"
                  download="Resumev1_12082025.pdf"
                  className="px-8 py-4 border-2 border-gray-900 dark:border-gray-100 text-gray-900 dark:text-gray-100 rounded-full font-semibold text-lg hover:bg-gray-900 dark:hover:bg-gray-100 hover:text-white dark:hover:text-gray-900 transform hover:scale-105 transition-all duration-300"
                >
                  Download CV
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="flex gap-6 justify-center lg:justify-start items-center"
              >
                <a
                  href="https://www.linkedin.com/in/mohana-moganti/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-blue-600 dark:hover:bg-blue-500 text-gray-700 dark:text-gray-300 hover:text-white transition-all duration-300 transform hover:scale-110 hover:rotate-6 shadow-md dark:shadow-gray-900/50"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin size={20} />
                </a>
                <a
                  href="https://github.com/Dead-Stone"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-900 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 hover:text-white transition-all duration-300 transform hover:scale-110 hover:-rotate-6 shadow-md dark:shadow-gray-900/50"
                  aria-label="GitHub"
                >
                  <FaGithub size={20} />
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.a
          href="#about"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
        >
          <span className="text-sm mb-2 font-medium text-gray-600 dark:text-gray-400">Scroll to explore</span>
          <FaArrowDown size={20} className="text-gray-600 dark:text-gray-400" />
        </motion.a>
      </motion.div>
    </section>
  )
}

