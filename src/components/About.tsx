import { Briefcase, Calendar, GraduationCap, Award, User } from 'lucide-react';
import { useRevealAnimation } from '@/hooks/useRevealAnimation';

const About = () => {
  const sectionRef = useRevealAnimation({
    threshold: 0.1,
    rootMargin: '-50px 0px',
    staggerChildren: true,
    staggerDelay: 0.15
  });

  return (
    <section id="about" className="py-24 bg-white dark:bg-gray-800">
      <div className="section-container" ref={sectionRef}>
        <h2 className="section-title" data-animate>About Me</h2>
        <p className="text-center text-muted-foreground max-w-xl mx-auto mb-16" data-animate>
          Get to know more about my background, education, and what drives me as a developer.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* About Content */}
          <div className="order-2 lg:order-1" data-animate>
            <div className="bg-gray-50 dark:bg-gray-700 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-600 h-full">
              <div className="flex items-center mb-6">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full mr-4">
                  <User className="w-6 h-6 text-blue-500 dark:text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold">Who I Am</h3>
              </div>
              
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  I'm Sai Kiran, a passionate B.Tech Computer Science student with a strong interest in web development, cloud computing, and software engineering. 
                </p>
                
                <p className="text-muted-foreground">
                  My goal is to build applications that solve real-world problems while providing exceptional user experiences. I'm constantly learning new technologies and methodologies to improve my skills.
                </p>
                
                <div className="pt-4">
                  <h4 className="font-semibold mb-3 text-blue-500 dark:text-blue-400">My Focus Areas</h4>
                  <ul className="grid grid-cols-2 gap-2">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                      Web Development
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                      Software Engineering
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                      Data Structures
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                      Photography and Editing(Photo&Video)
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          {/* Education and Achievements */}
          <div className="order-1 lg:order-2 space-y-6">
            {/* Education */}
            <div data-animate>
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-600">
                <div className="flex items-center mb-5">
                  <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-full mr-4">
                    <GraduationCap className="w-6 h-6 text-indigo-500 dark:text-indigo-400" />
                  </div>
                  <h3 className="text-xl font-bold">Education</h3>
                </div>
                
                <div className="pl-4 border-l-2 border-indigo-300 dark:border-indigo-700 space-y-5">
                  <div>
                    <div className="flex items-center mb-1">
                      <h4 className="font-semibold">B.Tech in Computer Science</h4>
                      <span className="ml-auto text-sm px-2 py-1 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-full">2022-2026</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Kalasalingam Academy of Research and Education</p>
                  </div>
                  
                  <div>
                    <div className="flex items-center mb-1">
                      <h4 className="font-semibold">Higher Secondary Education</h4>
                      <span className="ml-auto text-sm px-2 py-1 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-full">2020-2022</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Sri Chaitanya Junior College</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Achievements */}
            <div data-animate>
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-600">
                <div className="flex items-center mb-5">
                  <div className="bg-amber-100 dark:bg-amber-900/30 p-3 rounded-full mr-4">
                    <Award className="w-6 h-6 text-amber-500 dark:text-amber-400" />
                  </div>
                  <h3 className="text-xl font-bold">Achievements</h3>
                </div>
                
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-amber-500 rounded-full mr-2 mt-2"></span>
                    <div>
                      <p className="font-medium">Event Winner</p>
                      <p className="text-sm text-muted-foreground">3rd prize in Postman API Challenge conducted by
                      Microsoft Learn Student Club(MLSC)</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-amber-500 rounded-full mr-2 mt-2"></span>
                    <div>
                      <p className="font-medium">Publication</p>
                      <p className="text-sm text-muted-foreground">Published the IEEE Paper On YouTube video Transcript
                      Extraction and Summarization Using GoogleGemini</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
