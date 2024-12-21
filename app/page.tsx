'use client'

import { useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Github, Linkedin, Mail, Twitter } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// You can replace these with your actual project data
const projects = [
  { id: 1, title: 'Project 1', description: 'A brief description of Project 1' },
  { id: 2, title: 'Project 2', description: 'A brief description of Project 2' },
  { id: 3, title: 'Project 3', description: 'A brief description of Project 3' },
]

const skills = ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js']

export default function Home() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const targetRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])
  const scale = useTransform(scrollYProgress, [0, 0.3], [0.8, 1])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-blue-900 text-white">
      <main className="container mx-auto px-4 py-16" ref={targetRef}>
        {/* Hero Section */}
        <section className="h-screen flex items-center justify-center mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <Avatar className="w-40 h-40 mx-auto mb-6">
              <AvatarImage src="/placeholder.svg?height=160&width=160" alt="Your Name" />
              <AvatarFallback>YN</AvatarFallback>
            </Avatar>
            <h1 className="text-5xl font-bold mb-4">Your Name</h1>
            <p className="text-2xl text-gray-300">Web Developer & Designer</p>
          </motion.div>
        </section>

        {/* Projects Section */}
        <motion.section 
          className="mb-32"
          style={{ opacity, scale }}
        >
          <h2 className="text-4xl font-semibold mb-12">My Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                whileHover={{ scale: 1.05 }}
                onHoverStart={() => setHoveredProject(project.id)}
                onHoverEnd={() => setHoveredProject(null)}
              >
                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-gray-300">{project.description}</p>
                    {hoveredProject === project.id && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-4"
                      >
                        <Button variant="secondary" size="lg">View Project</Button>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Skills Section */}
        <motion.section 
          className="mb-32"
          style={{ opacity, scale }}
        >
          <h2 className="text-4xl font-semibold mb-12">Skills</h2>
          <div className="flex flex-wrap gap-4">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Button variant="outline" className="bg-gray-800 text-white border-gray-700 text-lg px-6 py-3">
                  {skill}
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Social Links Section */}
        <motion.section 
          className="mb-32"
          style={{ opacity, scale }}
        >
          <h2 className="text-4xl font-semibold mb-12">Connect with Me</h2>
          <div className="flex justify-center space-x-12">
            <motion.a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              className="text-gray-300 hover:text-white"
            >
              <Github size={40} />
            </motion.a>
            <motion.a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              className="text-gray-300 hover:text-white"
            >
              <Linkedin size={40} />
            </motion.a>
            <motion.a
              href="https://twitter.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              className="text-gray-300 hover:text-white"
            >
              <Twitter size={40} />
            </motion.a>
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section 
          className="text-center mb-16"
          style={{ opacity, scale }}
        >
          <h2 className="text-4xl font-semibold mb-12">Get in Touch</h2>
          <motion.div
            whileHover={{ scale: 1.05 }}
          >
            <Button className="bg-white text-gray-900 hover:bg-gray-200 text-xl px-10 py-6">
              <Mail className="mr-2 h-6 w-6" /> Contact Me
            </Button>
          </motion.div>
        </motion.section>
      </main>
    </div>
  )
}
