import { Award, Calendar, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const Certifications = () => {
  const sectionRef = useScrollAnimation();

  const certificates = [
    {
      title: 'SQL and Relational Databases 101',
      issuer: 'IBM Developer Skills Network',
      date: 'May 11 2025',
      description: 'Foundational specialization covering SQL queries, relational database concepts, and practical data management techniques.',
      credentialLink: 'https://courses.cognitiveclass.ai/certificates/7a8a7e9a4f1b48fea5f6f273c6158332',
      badgeColor: 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-600 border-blue-200',
      iconColor: 'text-blue-500'
    },
    {
      title: 'Microsoft Certified: Azure AI Fundamentals',
      issuer: 'Microsoft',
      date: 'May 2024',
      description: 'Foundational specialization covering AI concepts, Azure AI services, and practical applications of AI on the Microsoft Azure platform.',
      credentialLink: 'https://learn.microsoft.com/api/credentials/share/en-us/ramadugusaikiran/5A1C32176B3220F8?sharingId=EAB35756894353FB',
      badgeColor: 'bg-gradient-to-r from-purple-50 to-purple-100 text-purple-600 border-purple-200',
      iconColor: 'text-purple-500'
    },
    {
      title: 'Oracle certified foundations associate',
      issuer: 'Oracle',
      date: 'December 2023',
      description: 'Entry-level certification validating foundational knowledge of Oracle technologies, cloud infrastructure, and core database concepts, designed to demonstrate essential skills for working with Oracle Cloud and related services.',
      credentialLink: 'https://drive.google.com/file/d/1t1FSyBJZqT0wUHyiC0cDVZKSxtFu0Yb6/view?usp=sharing',
      badgeColor: 'bg-gradient-to-r from-yellow-50 to-yellow-100 text-yellow-600 border-yellow-200',
      iconColor: 'text-yellow-500'
    },
    {
      title: 'Career Essentials in Generative AI',
      issuer: 'LinkedIn Learning and Microsoft',
      date: 'May 2024',
      description: 'Introductory course covering the fundamentals of generative AI, including key concepts, ethical considerations, and practical applications, designed to equip learners with the essential skills to begin a career in AI-driven innovation.',
      credentialLink: 'https://www.linkedin.com/learning/certificates/6e0a02d9fe3af35cd2a37cda8af6b439cd6b253e98b09176b7cc19e53ded1b02?trk=share_certificate',
      badgeColor: 'bg-gradient-to-r from-purple-50 to-purple-100 text-purple-600 border-purple-200',
      iconColor: 'text-purple-500'
    },
    {
      title: 'Postman API Fundamentals Student Expert',
      issuer: 'POSTMAN',
      date: 'September 2024',
      description: 'Credential recognizing foundational proficiency in APIs using Postman, covering core concepts such as API requests, responses, collections, and testing, aimed at students building practical skills in API development and collaboration.',
      credentialLink: 'https://drive.google.com/file/d/1HmvR0Wnm15vOKVzFUxOMULendxklsDTF/view',
      badgeColor: 'bg-gradient-to-r from-purple-50 to-purple-100 text-purple-600 border-purple-200',
      iconColor: 'text-purple-500'
    },
  ];

  return (
    <section id="certifications" className="py-20 sm:py-32 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
      <div className="section-container" ref={sectionRef}>
        <h2 className="section-title animate-on-scroll opacity-0">Certifications</h2>
        <p className="text-center text-muted-foreground max-w-xl mx-auto mb-16 animate-on-scroll opacity-0 delay-100">
          Professional certifications I've earned to validate my skills and knowledge.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {certificates.map((cert, index) => (
            <Card 
              key={index} 
              className="animate-on-scroll opacity-0 h-full flex flex-col border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardContent className="p-8 flex flex-col h-full">
                <div className="mb-5">
                  <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${cert.badgeColor} border`}>
                    <Award className={`w-4 h-4 mr-1.5 ${cert.iconColor}`} />
                    {cert.issuer}
                  </span>
                </div>
                
                <h3 className="text-xl font-semibold mb-3">{cert.title}</h3>
                
                <div className="flex items-center mb-4 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{cert.date}</span>
                </div>
                
                <p className="text-muted-foreground mb-6 flex-grow">{cert.description}</p>
                
                <a 
                  href={cert.credentialLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-500 font-medium mt-auto group bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all"
                >
                  View Certificate
                  <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
