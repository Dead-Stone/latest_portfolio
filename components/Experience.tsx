'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { experiences } from '@/data/experiences'

export default function Experience() {
  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center"
        >
          My experience
        </motion.h2>
        <div className="relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gray-300 via-gray-400 to-gray-300 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 transform md:-translate-x-1/2"></div>
          
          <div className="space-y-8 md:space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                {/* Timeline Dot with Company Logo */}
                <div className="absolute left-4 md:left-1/2 w-16 h-16 bg-white rounded-full border-4 border-gray-900 dark:border-gray-100 transform -translate-x-1/2 z-10 shadow-lg flex items-center justify-center overflow-hidden">
                  {exp.logo ? (
                    <Image
                      src={exp.logo}
                      alt={`${exp.company} logo`}
                      width={48}
                      height={48}
                      className="object-contain p-1"
                      onError={(e) => {
                        // Fallback to default dot if image fails to load
                        const target = e.target as HTMLImageElement
                        target.style.display = 'none'
                        if (target.parentElement) {
                          target.parentElement.className = 'absolute left-4 md:left-1/2 w-4 h-4 bg-gray-900 rounded-full border-4 border-white transform -translate-x-1/2 z-10 shadow-lg'
                        }
                      }}
                    />
                  ) : (
                    <div className="w-4 h-4 bg-gray-900 rounded-full"></div>
                  )}
                </div>
                
                {/* Content Card - Alternating sides on desktop */}
                <div className={`ml-12 md:ml-0 md:w-[45%] ${index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'}`}>
                  <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-900/50 p-6 hover:shadow-xl dark:hover:shadow-gray-900 transition-all duration-300 border-l-4 border-gray-900 dark:border-blue-500">
                    {/* Chat bubble tail */}
                    <div 
                      className={`absolute top-8 hidden md:block w-0 h-0 z-0 ${
                        index % 2 === 0 
                          ? 'right-0 translate-x-full border-t-[12px] border-b-[12px] border-l-[16px] border-t-transparent border-b-transparent border-l-white dark:border-l-gray-800 drop-shadow-[2px_0_2px_rgba(0,0,0,0.1)] dark:drop-shadow-[2px_0_2px_rgba(0,0,0,0.3)]' 
                          : 'left-0 -translate-x-full border-t-[12px] border-b-[12px] border-r-[16px] border-t-transparent border-b-transparent border-r-white dark:border-r-gray-800 drop-shadow-[-2px_0_2px_rgba(0,0,0,0.1)] dark:drop-shadow-[-2px_0_2px_rgba(0,0,0,0.3)]'
                      }`}
                    />
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{exp.company}</h3>
                      <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mt-1">{exp.role}</h4>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3 mt-2">
                        <p className="text-gray-600 dark:text-gray-400 text-sm">{exp.location}</p>
                        <span className="hidden sm:inline text-gray-400 dark:text-gray-600">•</span>
                        <p className="text-gray-500 dark:text-gray-400 font-medium text-sm">{exp.period}</p>
                      </div>
                    </div>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                      {exp.description.map((item, itemIndex) => (
                        <li key={itemIndex} className="leading-relaxed">{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

