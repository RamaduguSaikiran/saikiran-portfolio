import { Briefcase, Calendar } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useEffect, useRef } from 'react';

const Experience = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  // Function to handle animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Reset and play animations for each element
            entry.target.querySelectorAll('.animate-on-scroll').forEach(el => {
              // Remove existing animation classes
              el.classList.remove('animate-fade-in', 'animate-slide-in-left', 'animate-slide-in-right');
              
              // Add opacity-0 initially
              el.classList.add('opacity-0');
              
              // Force reflow
              (el as HTMLElement).offsetWidth;
              
              // Add the appropriate animation class and remove opacity-0
              requestAnimationFrame(() => {
                el.classList.remove('opacity-0');
                if (el.classList.contains('slide-left')) {
                  el.classList.add('animate-slide-in-left');
                } else if (el.classList.contains('slide-right')) {
                  el.classList.add('animate-slide-in-right');
                } else {
                  el.classList.add('animate-fade-in');
                }
              });
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const experiences = [
    {
      title: 'Full‑Stack Developer',
      company: 'Edunet Foundation',
      period: 'Mar 2025 – Apr 2025',
      responsibilities: [
        'Built MERN‑stack web app; boosted backend efficiency & frontend responsiveness by 30%.',
        'Designed RESTful APIs to streamline CRUD and improve data flow.',
      ],
      color: 'bg-gradient-to-br from-blue-500 to-blue-600',
    },
    {
      title: 'Social Media Member',
      company: 'KARE ACM',
      period: 'Jan 2024 – Apr 2024',
      responsibilities: [
        'Created digital campaigns that increased event turnout by 25% and grew followers by 40%.',
      ],
      color: 'bg-gradient-to-br from-indigo-500 to-indigo-600',
    },
    {
      title: 'AI Intern',
      company: 'Edunet Foundation',
      period: 'Jan 2025 – Feb 2025',
      responsibilities: [
        'Developed and implemented a project addressing real-world challenges using COMFY UI and Diffusion Models, guided by industry mentors from Microsoft and SAP. Collaborated with industry mentors and peers to enhance problem-solving and technical skills.',
        'Designed RESTful APIs to streamline CRUD and improve data flow.',
      ],
      color: 'bg-gradient-to-br from-blue-500 to-blue-600',
    }
  ];

  return (
    <section id="experience" className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-16 sm:py-32">
      <div className="section-container" ref={sectionRef}>
        <h2 className="section-title animate-on-scroll opacity-0">Experience</h2>
        <p className="text-center text-muted-foreground max-w-xl mx-auto mb-16 animate-on-scroll opacity-0">
          My journey and the valuable experiences I've gained along the way.
        </p>
        
        <div className="relative mt-12">
          {/* Vertical timeline line with gradient and glow effect */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
          
          {/* Timeline items */}
          <div className="space-y-12 md:space-y-20">
            {experiences.map((exp, index) => (
              <div 
                key={index} 
                className={`relative flex ${
                  isMobile ? 'flex-col items-center' : 
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                } gap-8`}
              >
                {/* Timeline dot with pulse effect */}
                <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                  <div className={`w-10 h-10 rounded-full ${exp.color} flex items-center justify-center shadow-lg p-2 border-4 border-white dark:border-gray-800 relative animate-bounce-in`}>
                    <Briefcase className="w-5 h-5 text-white" />
                    <div className={`absolute inset-0 ${exp.color} rounded-full animate-ping opacity-20`}></div>
                  </div>
                </div>
                
                {/* Content card */}
                <div className={`${
                  isMobile ? 'w-full mt-8 px-4' : 'w-5/12'
                } ${
                  !isMobile && (index % 2 === 0 ? 'pr-12' : 'pl-12')
                }`}>
                  <div className={`animate-on-scroll opacity-0 ${
                    index % 2 === 0 ? 'slide-right' : 'slide-left'
                  }`}>
                    <div className={`group bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100/20 dark:border-gray-700/20 hover:border-blue-500/20 dark:hover:border-blue-500/20 transform hover:-translate-y-1 ${
                      !isMobile && index % 2 === 0 ? 'text-right' : 'text-left'
                    }`}>
                      <h3 className="text-xl font-semibold mb-1 group-hover:text-blue-500 transition-colors">{exp.title}</h3>
                      <p className="text-blue-500 font-medium mb-3 dark:text-blue-400">{exp.company}</p>
                      
                      <div className={`flex items-center mb-4 text-sm text-muted-foreground ${
                        !isMobile && index % 2 === 0 ? 'justify-end' : 'justify-start'
                      }`}>
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>{exp.period}</span>
                      </div>
                      
                      <ul className="space-y-3">
                        {exp.responsibilities.map((item, i) => (
                          <li 
                            key={i} 
                            className={`text-base relative ${
                              !isMobile && index % 2 === 0 
                                ? 'pr-5 before:content-["•"] before:absolute before:right-0 before:text-blue-500 group-hover:before:text-blue-600'
                                : 'pl-5 before:content-["•"] before:absolute before:left-0 before:text-blue-500 group-hover:before:text-blue-600'
                            } transition-colors`}
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                
                {/* Empty space for alternating layout */}
                {!isMobile && <div className={`w-5/12 ${index % 2 === 0 ? 'pl-12' : 'pr-12'}`}></div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
