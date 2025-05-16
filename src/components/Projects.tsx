import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Github, ExternalLink, Code } from 'lucide-react';
import { useRevealAnimation } from '@/hooks/useRevealAnimation';

const Projects = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const sectionRef = useRevealAnimation({
    threshold: 0.1,
    rootMargin: '-50px 0px',
    staggerChildren: true,
    staggerDelay: 0.2
  });

  type Project = {
    id: number;
    title: string;
    description: string;
    technologies: string[];
    image: string;
    detailedDescription: string;
    githubLink?: string;
    demoLink?: string;
    color?: string;
  };

  const projects: Project[] = [
    {
      id: 1,
      title: 'YouTube Transcript Extraction & Summarization',
      description: 'Web app that extracts transcripts and uses Gemini AI to create concise summaries.',
      technologies: ['Python', 'Flask', 'JavaScript', 'HTML/CSS', 'Google Gemini API', 'YouTube Transcript API'],
      image: 'https://podcastle.ai/blog/content/images/2024/05/Video-transcription.webp',
      detailedDescription: 'This web application leverages the YouTube Transcript API to extract complete transcripts from YouTube videos. It then processes the content using Google\'s Gemini AI to generate concise, accurate summaries. The app features a clean interface with support for various video formats and languages.',
      githubLink: 'https://github.com/RamaduguSaikiran/AI-Video-Summarizer',
      demoLink: 'https://example.com',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      id: 2,
      title: 'Crop Disease Detection',
      description: 'Deep‑learning model integrated in a web app for identifying crop diseases, supports image uploads and audio feedback.',
      technologies: ['TensorFlow/Keras', 'Python', 'Web Development', 'Machine Learning'],
      image: 'https://bitrefine.group/images/780x520/leaf_desease_780x520.jpg',
      detailedDescription: 'A comprehensive crop disease detection application built with TensorFlow and Keras. The system uses a deep learning model to identify diseases in crops from uploaded images. Features include a multilingual user interface, audio output for accessibility, and an integrated chatbot for assistance.',
      githubLink: 'https://github.com/RamaduguSaikiran/Crop-Disease-Detection',
      color: 'from-green-500 to-emerald-600'
    },
  ];

  const openProjectModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  return (
    <section id="projects" className="py-20 sm:py-32 bg-gradient-to-b from-gray-100 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="section-container" ref={sectionRef}>
        <h2 className="section-title" data-animate>Projects</h2>
        <p className="text-center text-muted-foreground max-w-xl mx-auto mb-16" data-animate>
          Showcasing my recent work and personal projects that demonstrate my skills and passion.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {projects.map((project) => (
            <div 
              key={project.id} 
              data-animate
              className="group opacity-0 translate-y-8"
            >
              <div 
                className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 transform group-hover:-translate-y-2 cursor-pointer border border-gray-100 dark:border-gray-700 h-full flex flex-col"
                onClick={() => openProjectModal(project)}
              >
                {/* Project Image with Overlay */}
                <div className="relative h-56 overflow-hidden">
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.color || 'from-blue-500 to-purple-600'} opacity-0 z-10 transition-opacity group-hover:opacity-60`}></div>
                  
                  {/* Background Image */}
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Project Title Overlay */}
                  <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2 group-hover:translate-y-0 transform transition-transform duration-300">{project.title}</h3>
                    
                    {/* Technology Pills - Only show on hover */}
                    <div className="flex flex-wrap gap-2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {project.technologies.slice(0, 3).map((tech, idx) => (
                        <span key={idx} className="text-xs bg-black/40 backdrop-blur-sm px-2 py-1 rounded-full">
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="text-xs bg-black/40 backdrop-blur-sm px-2 py-1 rounded-full">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Project Details */}
                <div className="p-6 flex-1 flex flex-col">
                  <p className="text-muted-foreground mb-6 flex-grow">{project.description}</p>
                  
                  <div className="flex justify-between items-center mt-auto">
                    <button 
                      className="flex items-center text-sm font-medium text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 transition-colors"
                    >
                      <span>View Details</span>
                      <ExternalLink className="w-4 h-4 ml-1" />
                    </button>
                    
                    {/* GitHub Link If Available */}
                    {project.githubLink && (
                      <a 
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Github className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Project Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden rounded-2xl">
          {selectedProject && (
            <div className="bg-white dark:bg-gray-800">
              {/* Header Image with Gradient Overlay */}
              <div className="relative h-64 sm:h-80 overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${selectedProject.color || 'from-blue-500 to-purple-600'} opacity-0 z-10`}></div>
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 z-20">
                  <button 
                    className="bg-black/20 backdrop-blur-sm text-white rounded-full p-2 hover:bg-black/30 transition-colors"
                    onClick={() => setIsModalOpen(false)}
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-8">
                <DialogHeader>
                  <DialogTitle className="text-3xl font-bold mb-4">{selectedProject.title}</DialogTitle>
                  <DialogDescription className="mb-8 text-muted-foreground">{selectedProject.detailedDescription}</DialogDescription>
                </DialogHeader>
                
                <div className="mb-8">
                  <h4 className="font-semibold mb-4 flex items-center">
                    <Code className="w-5 h-5 mr-2 text-blue-500" />
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech, index) => (
                      <span key={index} className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-sm px-3 py-1 rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  {selectedProject.githubLink && (
                    <a 
                      href={selectedProject.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black text-white py-3 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      <Github className="w-5 h-5 mr-2" />
                      View Code
                    </a>
                  )}
                  
                  {selectedProject.demoLink && (
                    <a 
                      href={selectedProject.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      <ExternalLink className="w-5 h-5 mr-2" />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Projects;
