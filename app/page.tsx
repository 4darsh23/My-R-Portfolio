'use client'

import { useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Github, Linkedin, Mail, Twitter, ExternalLink } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Navbar } from '@/components/Navbar'
import { containerVariants, itemVariants } from '@/lib/animations'
import { projects, skills } from '@/lib/data'

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
      <Navbar />
      <main className="container mx-auto px-4 py-16" ref={targetRef}>
        {/* Hero Section */}
        <motion.section 
          className="h-screen flex items-center justify-center mb-32"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div className="text-center" variants={itemVariants}>
            <Avatar className="w-40 h-40 mx-auto mb-6 border-4 border-white/10">
              <AvatarImage src="brad poster.jpg" alt="Adarsh Das" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <h1 className="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
              Adarsh Das
            </h1>
            <p className="text-2xl text-gray-300 mb-8">Full Stack Developer & Software Engineer</p>
            <motion.div className="flex justify-center gap-4" variants={containerVariants}>
              <Button size="lg" className="bg-black" variant= "outline">
                View Projects
              </Button>
              <Button size="lg" className="bg-black" variant="outline">
                Download CV
              </Button>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Projects Section */}
        <motion.section 
          id="Projects"
          className="mb-32"
          style={{ opacity, scale }}
        >
          <h2 className="text-4xl font-semibold mb-12 text-center">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                whileHover={{ scale: 1.03 }}
                onHoverStart={() => setHoveredProject(project.id)}
                onHoverEnd={() => setHoveredProject(null)}
              >
                <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700 overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                      {hoveredProject === project.id && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="absolute inset-0 bg-black/60 flex items-center justify-center"
                        >
                          <Button 
                            variant="secondary" 
                            size="lg"
                            asChild
                          >
                            <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                              View Project <ExternalLink size={16} />
                            </a>
                          </Button>
                        </motion.div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className=" text-gray-300 text-2xl font-semibold mb-2">{project.title}</h3>
                      <p className="text-gray-300 mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="bg-blue-900/30">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
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
          <h2 className="text-4xl font-semibold mb-12 text-center">Skills & Expertise</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-900 backdrop-blur-sm rounded-lg p-6 text-center"
              >
                <h3 className="text-xl font-semibold mb-2">{skill.name}</h3>
                <Badge variant="secondary" className="bg-slate-700">
                  {skill.level}
                </Badge>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Social Links Section */}
        <motion.section 
          className="mb-32"
          style={{ opacity, scale }}
        >
          <h2 className="text-4xl font-semibold mb-12 text-center">Let's Connect</h2>
          <div className="flex justify-center space-x-12">
            {[
              { icon: Github, href: 'https://github.com/4darsh23', label: 'GitHub' },
              { icon: Linkedin, href: 'https://www.linkedin.com/in/adarsh-das-41a354272/', label: 'LinkedIn' },
              { icon: Twitter, href: 'https://twitter.com/', label: 'Twitter' },
              { icon: Mail, href: 'adarshrajdas23@gmail.com', label: 'Email' }
            ].map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="flex flex-col items-center gap-2 text-gray-300 hover:text-white transition-colors"
              >
                <Icon size={40} />
                <span className="text-sm">{label}</span>
              </motion.a>
            ))}
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section 
          id="contact"
          className="text-center mb-16"
          style={{ opacity, scale }}
        >
          <h2 className="text-4xl font-semibold mb-12">Get in Touch</h2>
          <motion.div
            whileHover={{ scale: 1.05 }}
          >
            <Button 
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-xl px-10 py-6"
            >
              <Mail className="mr-2 h-6 w-6" /> Contact Me
            </Button>
          </motion.div>
        </motion.section>
      </main>
    </div>
  )
}