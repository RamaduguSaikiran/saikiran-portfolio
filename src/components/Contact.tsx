import { useState, useEffect } from 'react';
import { Mail, Phone, Github, Linkedin, Send, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { useRevealAnimation } from '@/hooks/useRevealAnimation';

// EmailJS configuration - DO NOT change these values
const EMAILJS_SERVICE_ID = "service_ae8k3ve"; 
const EMAILJS_TEMPLATE_ID = "template_it6bwdd"; 
const EMAILJS_PUBLIC_KEY = "XalzSxwe72XkSCUMC";

interface EmailJSResponseStatus {
  status: number;
  text: string;
}

// Define EmailJS window type
declare global {
  interface Window {
    emailjs: {
      init: (publicKey: string) => void;
      send: (
        serviceId: string,
        templateId: string, 
        templateParams: Record<string, unknown>,
        publicKey: string
      ) => Promise<EmailJSResponseStatus>;
    };
  }
}

const Contact = () => {
  const { toast } = useToast();
  const sectionRef = useRevealAnimation({
    threshold: 0.1,
    rootMargin: '-50px 0px',
    staggerChildren: true,
    staggerDelay: 0.15
  });
  const [emailJSLoaded, setEmailJSLoaded] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  useEffect(() => {
    // Load EmailJS script dynamically
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
    script.async = true;
    script.onload = () => {
      // Initialize EmailJS only once when the script is loaded
      try {
        window.emailjs.init(EMAILJS_PUBLIC_KEY);
        setEmailJSLoaded(true);
        console.log('EmailJS initialized successfully');
      } catch (error) {
        console.error('EmailJS initialization error:', error);
      }
    };
    
    // Add script only if it doesn't exist
    if (!document.querySelector('script[src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"]')) {
      document.body.appendChild(script);
    } else {
      setEmailJSLoaded(true);
    }
    
    return () => {
      // Clean up only if we added the script
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);
  
  const [formData, setFormData] = useState({
    from_name: '',
    reply_to: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.from_name.trim()) {
      newErrors.from_name = 'Name is required';
    }
    
    if (!formData.reply_to.trim()) {
      newErrors.reply_to = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.reply_to)) {
      newErrors.reply_to = 'Please enter a valid email address';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      if (emailJSLoaded) {
        console.log('Submitting form with EmailJS', formData);
        
        // Use send method with template parameters
        const response = await window.emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          {
            from_name: formData.from_name,
            reply_to: formData.reply_to,
            subject: formData.subject,
            message: formData.message
          },
          EMAILJS_PUBLIC_KEY
        );
        
        console.log('EmailJS response:', response);
        
        if (response.status === 200) {
          toast({
            title: "Message sent successfully!",
            description: "Thank you for your message. I'll get back to you soon.",
          });
          
          setFormData({ from_name: '', reply_to: '', subject: '', message: '' });
          setFormSubmitted(true);
        } else {
          throw new Error(`Failed to send message: ${response.text}`);
        }
      } else {
        throw new Error('EmailJS not loaded');
      }
    } catch (error) {
      console.error("Email sending error:", error);
      
      toast({
        title: "Failed to send message",
        description: "There was an error sending your message. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactLinks = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: 'Email',
      value: 'ramadugusaikiran2@gmail.com',
      href: 'mailto:ramadugusaikiran2@gmail.com',
      color: 'bg-blue-500',
      hoverColor: 'group-hover:bg-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: 'Phone',
      value: '+91 8179690526',
      href: 'tel:+918179690526',
      color: 'bg-green-500',
      hoverColor: 'group-hover:bg-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      label: 'LinkedIn',
      value: 'saikiran-ramadugu',
      href: 'https://www.linkedin.com/in/ramadugusaikiran/',
      color: 'bg-[#0077B5]',
      hoverColor: 'group-hover:bg-[#005e8d]',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    },
    {
      icon: <Github className="w-5 h-5" />,
      label: 'GitHub',
      value: 'saikiran-ramadugu',
      href: 'https://github.com/RamaduguSaikiran',
      color: 'bg-gray-800',
      hoverColor: 'group-hover:bg-gray-900',
      bgColor: 'bg-gray-100 dark:bg-gray-800/40',
    },
  ];

  return (
    <section id="contact" className="py-20 sm:py-32 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="section-container" ref={sectionRef}>
        <h2 className="section-title" data-animate>Get In Touch</h2>
        <p className="text-center text-muted-foreground max-w-xl mx-auto mb-16" data-animate>
          Feel free to reach out for collaborations, job opportunities, or just to say hello. 
          I'll get back to you as soon as possible.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Contact Links */}
          <div className="lg:col-span-2 space-y-6 order-2 lg:order-1">
            {contactLinks.map((contact, index) => (
              <a
                key={index}
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex items-start gap-5 p-5 rounded-xl hover:bg-white hover:shadow-xl dark:hover:bg-gray-800 transition-all duration-300 border border-transparent hover:border-gray-100 dark:hover:border-gray-700 ${contact.bgColor}`}
                data-animate
              >
                <div className={`${contact.color} text-white p-3 rounded-full transition-all ${contact.hoverColor} shadow-md`}>
                  {contact.icon}
                </div>
                
                <div>
                  <h4 className="font-medium text-lg mb-1">{contact.label}</h4>
                  <p className="text-muted-foreground group-hover:text-blue-500 transition-colors duration-300">
                    {contact.value}
                  </p>
                </div>
                
                <ArrowRight className="w-5 h-5 ml-auto self-center opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
              </a>
            ))}
            
            {/* Additional Info */}
            <div className="p-6 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-900/10 mt-8 shadow-sm border border-blue-100 dark:border-blue-900/50" data-animate>
              <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-2">Looking for Opportunities</h4>
              <p className="text-blue-700 dark:text-blue-400 text-sm">
                Currently open to internships, freelance projects, and full-time positions in web development and software engineering.
              </p>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="lg:col-span-3 order-1 lg:order-2" data-animate>
            {!formSubmitted ? (
              <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 border border-gray-100 dark:border-gray-700 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700">
                <h3 className="text-xl font-semibold mb-6 flex items-center">
                  <Send className="w-5 h-5 mr-2 text-blue-500" />
                  Send a Message
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div data-animate>
                      <label htmlFor="from_name" className="block text-sm font-medium mb-1">
                        Your Name
                      </label>
                      <Input
                        id="from_name"
                        name="from_name" 
                        value={formData.from_name}
                        onChange={handleChange}
                        required
                        placeholder="Enter Your Name"
                        className={`bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 focus:ring-blue-500 rounded-lg ${errors.from_name ? 'border-red-500 dark:border-red-500' : ''}`}
                      />
                      {errors.from_name && <p className="text-red-500 text-xs mt-1">{errors.from_name}</p>}
                    </div>
                    
                    <div data-animate>
                      <label htmlFor="reply_to" className="block text-sm font-medium mb-1">
                        Your Email
                      </label>
                      <Input
                        id="reply_to"
                        name="reply_to"
                        type="email"
                        value={formData.reply_to}
                        onChange={handleChange}
                        required
                        placeholder="Enter Your Mail Address"
                        className={`bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 focus:ring-blue-500 rounded-lg ${errors.reply_to ? 'border-red-500 dark:border-red-500' : ''}`}
                      />
                      {errors.reply_to && <p className="text-red-500 text-xs mt-1">{errors.reply_to}</p>}
                    </div>
                  </div>
                  
                  <div data-animate>
                    <label htmlFor="subject" className="block text-sm font-medium mb-1">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder="How can I help you?"
                      className={`bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 focus:ring-blue-500 rounded-lg ${errors.subject ? 'border-red-500 dark:border-red-500' : ''}`}
                    />
                    {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
                  </div>
                  
                  <div data-animate>
                    <label htmlFor="message" className="block text-sm font-medium mb-1">
                      Your Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Hello, I'd like to talk about..."
                      className={`bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 focus:ring-blue-500 resize-none rounded-lg ${errors.message ? 'border-red-500 dark:border-red-500' : ''}`}
                    />
                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                  </div>
                  
                  <div data-animate>
                    <Button 
                      type="submit" 
                      className="w-full py-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          <span>Send Message</span>
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 border border-gray-100 dark:border-gray-700 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 flex flex-col items-center justify-center text-center h-full">
                <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-full mb-6">
                  <CheckCircle className="w-16 h-16 text-green-500 dark:text-green-400" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Message Sent Successfully!</h3>
                <p className="text-muted-foreground mb-6">Thank you for reaching out. I'll get back to you as soon as possible.</p>
                <Button 
                  onClick={() => setFormSubmitted(false)}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Send Another Message
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
