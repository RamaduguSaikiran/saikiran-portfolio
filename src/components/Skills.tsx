import { useEffect, useRef } from 'react';
import { useRevealAnimation } from '@/hooks/useRevealAnimation';

// Define skill level type
type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced';

interface SkillData {
  name: string;
  level: SkillLevel;
  color?: string;
}

// Function to get color class based on level
const getLevelColor = (level: SkillLevel): string => {
  switch (level) {
    case 'Advanced': return 'from-blue-500 to-blue-600';
    case 'Intermediate': return 'from-blue-400 to-blue-500';
    case 'Beginner': return 'from-blue-300 to-blue-400';
    default: return 'from-blue-300 to-blue-400';
  }
};

// Function to get width percentage based on level
const getLevelWidth = (level: SkillLevel): string => {
  switch (level) {
    case 'Advanced': return '90%';
    case 'Intermediate': return '65%';
    case 'Beginner': return '40%';
    default: return '40%';
  }
};

const Skills = () => {
  const sectionRef = useRevealAnimation({
    threshold: 0.1,
    rootMargin: '-50px 0px',
    staggerChildren: true,
    staggerDelay: 0.15
  });
  const skillBarsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const animateSkillBars = () => {
      const skillBars = document.querySelectorAll('[data-skill-level]');
      
      skillBars.forEach((bar) => {
        const level = (bar as HTMLElement).dataset.skillLevel as SkillLevel;
        const width = getLevelWidth(level);
        
        setTimeout(() => {
          (bar as HTMLElement).style.width = width;
        }, 300);
      });
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateSkillBars();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    
    if (skillBarsRef.current) {
      observer.observe(skillBarsRef.current);
    }
    
    return () => {
      if (skillBarsRef.current) {
        observer.unobserve(skillBarsRef.current);
      }
    };
  }, []);

  const technicalSkills: SkillData[] = [
    { name: 'Java', level: 'Intermediate' },
    { name: 'Python', level: 'Intermediate' },
    { name: 'SQL/MySQL', level: 'Intermediate' },
    { name: 'HTML/CSS', level: 'Advanced' },
    { name: 'JavaScript', level: 'Intermediate' },
    { name: 'Git/GitHub', level: 'Intermediate' },
    { name: 'Postman API', level: 'Intermediate' },
  ];

  const softSkills: SkillData[] = [
    { name: 'Adaptability', level: 'Advanced' },
    { name: 'Communication', level: 'Advanced' },
    { name: 'Team Management', level: 'Advanced' },
    { name: 'Teamwork', level: 'Advanced' },
    { name: 'Time Management', level: 'Intermediate' },
    { name: 'Leadership', level: 'Advanced' },
    { name: 'Problem Solving', level: 'Advanced' },
  ];

  return (
    <section id="skills" className="bg-white py-16 sm:py-24 dark:bg-gray-800">
      <div className="section-container" ref={sectionRef}>
        <h2 className="section-title" data-animate>Skills</h2>
        <p className="text-center text-muted-foreground max-w-xl mx-auto mb-16" data-animate>
          My technical and soft skills that I've developed through education and experience.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12" ref={skillBarsRef}>
          {/* Technical Skills */}
          <div data-animate className="bg-gray-50 dark:bg-gray-700 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-600">
            <h3 className="text-xl font-semibold mb-8 text-center">Technical Skills</h3>
            <div className="space-y-8">
              {technicalSkills.map((skill, index) => (
                <div key={index} className="space-y-3" data-animate>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-lg">{skill.name}</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      skill.level === 'Advanced' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300' : 
                      skill.level === 'Intermediate' ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' : 
                      'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                    }`}>
                      {skill.level}
                    </span>
                  </div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${getLevelColor(skill.level)} rounded-full transition-all duration-1500 ease-out`}
                      style={{ width: '0%' }}
                      data-skill-level={skill.level}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Soft Skills */}
          <div data-animate className="bg-gray-50 dark:bg-gray-700 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-600">
            <h3 className="text-xl font-semibold mb-8 text-center">Soft Skills</h3>
            <div className="space-y-8">
              {softSkills.map((skill, index) => (
                <div key={index} className="space-y-3" data-animate>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-lg">{skill.name}</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      skill.level === 'Advanced' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300' : 
                      skill.level === 'Intermediate' ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' : 
                      'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                    }`}>
                      {skill.level}
                    </span>
                  </div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${getLevelColor(skill.level)} rounded-full transition-all duration-1500 ease-out`}
                      style={{ width: '0%' }}
                      data-skill-level={skill.level}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
