import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, BookOpen } from 'lucide-react';
import { useRevealAnimation } from '@/hooks/useRevealAnimation';

const Hero = () => {
  const sectionRef = useRevealAnimation({
    threshold: 0.1,
    rootMargin: '-50px 0px',
    staggerChildren: true,
    staggerDelay: 0.15
  });
  const [displayText, setDisplayText] = useState('Sai Kiran');
  
  // Text animation effect for "I'm Sai Kiran"
  useEffect(() => {
    const phrases = [
      'Sai Kiran',
      'Sai Kiran',
      'Sai Kiran'
    ];
    
    let currentIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 150;
    
    const typeEffect = () => {
      const currentPhrase = phrases[currentIndex];
      
      if (isDeleting) {
        // Deleting text
        setDisplayText(currentPhrase.substring(0, charIndex - 1));
        charIndex--;
        typingSpeed = 100;
      } else {
        // Typing text
        setDisplayText(currentPhrase.substring(0, charIndex + 1));
        charIndex++;
        typingSpeed = 150;
      }
      
      // Change direction or phrase
      if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typingSpeed = 1500; // Pause at the end
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        currentIndex = (currentIndex + 1) % phrases.length;
      }
      
      setTimeout(typeEffect, typingSpeed);
    };
    
    const typingTimer = setTimeout(typeEffect, 1000);
    return () => clearTimeout(typingTimer);
  }, []);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll('.animate-on-scroll');
    if (elements) {
      elements.forEach((el) => observer.observe(el));
    }

    return () => {
      if (elements) {
        elements.forEach((el) => observer.unobserve(el));
      }
    };
  }, []);

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      window.scrollTo({
        top: projectsSection.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  const socialLinks = [
    {
      icon: <Github className="w-5 h-5" />,
      href: 'https://github.com/RamaduguSaikiran',
      label: 'GitHub',
      color: 'bg-gray-800 hover:bg-gray-900',
      hoverText: 'GitHub Profile'
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      href: 'https://www.linkedin.com/in/ramadugusaikiran/',
      label: 'LinkedIn',
      color: 'bg-[#0077B5] hover:bg-[#005e8d]',
      hoverText: 'LinkedIn Profile'
    },
    {
      icon: <BookOpen className="w-5 h-5" />,
      href: 'https://medium.com/',
      label: 'Medium',
      color: 'bg-black hover:bg-gray-800',
      hoverText: 'Medium Blog'
    }
  ];

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-50 dark:from-gray-900 dark:to-blue-950 overflow-hidden py-20"
    >
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute w-full h-full bg-[url('https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')] bg-cover opacity-30"></div>
      </div>

      {/* Hero Content */}
      <div className="section-container relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">
        {/* Left image content */}
        <div className="w-full md:w-1/2 flex flex-col items-center" data-animate>
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full opacity-75 blur-sm group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
            
            <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-full border-4 border-white dark:border-gray-800 overflow-hidden relative bg-white dark:bg-gray-800 shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 z-10"></div>
              <img
                src="https://i.postimg.cc/prtFvj7P/Whats-App-Image-2025-01-26-at-15-21-05-f40ba065.jpg"
                alt="Ramadugu Sai Kiran"
                className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-700"
              />
            </div>
          </div>
          
          {/* Social Media Links */}
          <div className="flex justify-center space-x-4 mt-8" data-animate>
            {socialLinks.map((social, index) => (
              <a 
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
                aria-label={social.label}
              >
                <span className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  {social.hoverText}
                </span>
                <div className={`w-12 h-12 flex items-center justify-center rounded-full text-white ${social.color} transition-all duration-300 transform hover:scale-110 hover:shadow-lg group-hover:-translate-y-1`}>
                  {social.icon}
                </div>
              </a>
            ))}
          </div>
        </div>
        
        {/* Right text content */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4" data-animate>
            Hi, I'm <span className="text-blue-500 dark:text-blue-400">{displayText}</span>
          </h1>
          
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-6" data-animate>
            B.Tech CSE Student 
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8" data-animate>
            Building intelligent web applications and solving real‑time hardware‑software challenges.
          </p>
          
          <Button 
            onClick={scrollToProjects}
            className="px-8 py-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-full transition-all duration-300 shadow-md hover:shadow-xl transform hover:-translate-y-1"
            data-animate
          >
            View My Work
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
