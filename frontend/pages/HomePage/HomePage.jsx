import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBuilding, FaUserTie, FaArrowRight, FaEnvelope, FaPhone, FaMapMarkerAlt, FaChevronDown } from 'react-icons/fa';

const HomePage = () => {
  const navigate = useNavigate();
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const slidesRef = useRef(null);
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);
  
  // Add custom keyframes for animations
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      
      @keyframes slideInUp {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
      }
      
      /* Custom Scrollbar */
      ::-webkit-scrollbar {
        width: 8px;
      }
      
      ::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 10px;
      }
      
      ::-webkit-scrollbar-thumb {
        background: #B85D34;
        border-radius: 10px;
      }
      
      ::-webkit-scrollbar-thumb:hover {
        background: #6B3226;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  // Images for carousel
  const slides = [
    {
      id: 1,
      image: '/glenn-carstens-peters-npxXWgQ33ZQ-unsplash.jpg',
      title: 'Connect with Top Talent',
      description: 'Find the perfect professionals for your company needs'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80',
      title: 'Discover Opportunities',
      description: 'Explore job openings that match your skills and aspirations'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      title: 'Grow Your Career',
      description: 'Take the next step in your professional journey'
    }
  ];

  // Auto-scroll carousel
  useEffect(() => {
    // Start with a delay to ensure the first image is visible for a while
    let interval;
    const initialDelay = setTimeout(() => {
      interval = setInterval(() => {
        setActiveSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
    }, 5000);
    
    return () => {
      clearTimeout(initialDelay);
      if (interval) clearInterval(interval);
    };
  }, []);

  // Scroll to slide when activeSlide changes
  useEffect(() => {
    if (slidesRef.current) {
      const scrollPosition = activeSlide * slidesRef.current.offsetWidth;
      slidesRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  }, [activeSlide]);

  const handleNavigation = (path) => {
    navigate(path);
  };

  // Scroll to section with enhanced animation
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      setActiveSection(sectionId);
      window.scrollTo({
        top: section.offsetTop - 80, // Offset for header
        behavior: 'smooth',
      });
    }
  };
  
  // Monitor scroll position to update active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100; // Offset for better detection
      
      // Get positions of sections
      const homePosition = document.getElementById('home')?.offsetTop || 0;
      const aboutPosition = document.getElementById('about')?.offsetTop || 0;
      const contactPosition = document.getElementById('contact')?.offsetTop || 0;
      
      // Determine active section based on scroll position
      if (scrollPosition < aboutPosition) {
        setActiveSection('home');
      } else if (scrollPosition >= aboutPosition && scrollPosition < contactPosition) {
        setActiveSection('about');
      } else if (scrollPosition >= contactPosition) {
        setActiveSection('contact');
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div id="home" ref={homeRef} className="min-h-screen min-w-screen flex flex-col bg-gradient-to-br from-[#FFE8B4] to-[#FF9F4F]">
      {/* Header/Navigation */}
      <header className="bg-white bg-opacity-90 shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-[#6B3226]">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6B3226] to-[#B85D34]">DomaiNetHire</span>
            </h1>
          </div>
           <nav className="flex space-x-4 items-center">
            <button 
              onClick={() => scrollToSection('home')} 
              className="bg-[#6B3226] hover:bg-[#B85D34] text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('about')} 
              className="bg-[#6B3226] hover:bg-[#B85D34] text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
            >
            {/* > */}
              About Us
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
             className="bg-[#6B3226] hover:bg-[#B85D34] text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
            >
            {/* > */}
              Contact Us
            </button>
            <button 
              onClick={() => handleNavigation('/LandingPage')} 
              className="bg-[#6B3226] hover:bg-[#B85D34] text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
            >
              Login
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section with Carousel */}
      <section className="relative overflow-hidden">
        {/* Scroll down indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-[pulse_2s_infinite] cursor-pointer" onClick={() => scrollToSection('about')}>
          <div className="flex flex-col items-center text-white">
            <span className="text-sm font-medium mb-2">Scroll Down</span>
            <FaChevronDown className="text-2xl animate-bounce" />
          </div>
        </div>
        <div 
          ref={slidesRef}
          className="flex overflow-x-hidden snap-x snap-mandatory transition-all duration-500 ease-in-out"
        >
          {slides.map((slide) => (
            <div 
              key={slide.id} 
              className="min-w-full h-[500px] md:h-[600px] snap-center relative"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center" 
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4 text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">{slide.title}</h2>
                <p className="text-xl md:text-2xl max-w-2xl drop-shadow-md">{slide.description}</p>
                <button 
                  onClick={() => handleNavigation('/landing')} 
                  className="mt-8 bg-[#B85D34] hover:bg-[#6B3226] text-white px-8 py-3 rounded-lg font-medium flex items-center gap-2 transition-all duration-300 transform hover:scale-105"
                >
                  Get Started <FaArrowRight />
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Carousel Indicators */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
          {slides.map((_, index) => (
            <button 
              key={index} 
              onClick={() => setActiveSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${activeSlide === index ? 'bg-white scale-125' : 'bg-white bg-opacity-50'}`}
            ></button>
          ))}
        </div>
      </section>

      {/* Features Section */}
  <section className="py-16 px-4 bg-white animate-[fadeIn_1s_ease-in-out]">
    <div className="container mx-auto text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-[#6B3226] mb-12 animate-[slideInUp_0.5s_ease-in-out]">Why Choose DomaiNetHire?</h2>
      
      <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#FFE8B4] bg-opacity-50 p-8 rounded-xl shadow-lg transform hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 bg-[#B85D34] rounded-full flex items-center justify-center mx-auto mb-4">
                <FaBuilding className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-[#6B3226] mb-3">For Companies</h3>
              <p className="text-gray-700">Access a pool of qualified professionals. Post jobs, review applications, and find the perfect match for your team.</p>
            </div>
            
            <div className="bg-[#FFE8B4] bg-opacity-50 p-8 rounded-xl shadow-lg transform hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 bg-[#B85D34] rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUserTie className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-[#6B3226] mb-3">For Professionals</h3>
              <p className="text-gray-700">Showcase your skills, discover opportunities that match your expertise, and take the next step in your career journey.</p>
            </div>
            
            <div className="bg-[#FFE8B4] bg-opacity-50 p-8 rounded-xl shadow-lg transform hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 bg-[#B85D34] rounded-full flex items-center justify-center mx-auto mb-4">
                <FaArrowRight className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-[#6B3226] mb-3">Easy Connection</h3>
              <p className="text-gray-700">Our platform simplifies the hiring process, making it easy for companies and professionals to connect and collaborate.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" ref={aboutRef} className="py-16 px-4 bg-gradient-to-br from-[#FFE8B4] to-[#FF9F4F] scroll-mt-20 animate-[fadeIn_1s_ease-in-out]">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#6B3226] mb-6">About Us</h2>
            <p className="text-lg text-gray-800 mb-8 leading-relaxed">
              DomaiNetHire is a cutting-edge platform designed to bridge the gap between talented professionals and innovative companies. Our mission is to create meaningful connections that drive career growth and business success.
            </p>
            <p className="text-lg text-gray-800 mb-8 leading-relaxed">
              Founded with a vision to transform the hiring landscape, we leverage technology to make the recruitment process more efficient, transparent, and rewarding for all parties involved.
            </p>
            <p className="text-lg text-gray-800 leading-relaxed">
              Whether you're a company looking to expand your team or a professional seeking new opportunities, DomaiNetHire provides the tools and resources you need to achieve your goals.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section id="contact" ref={contactRef} className="py-16 px-4 bg-white scroll-mt-20 animate-[fadeIn_1s_ease-in-out]">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#6B3226] mb-12 text-center animate-[slideInUp_0.5s_ease-in-out]">Contact Us</h2>
          
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div>
              <h3 className="text-2xl font-bold text-[#B85D34] mb-6">Get In Touch</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-[#FFE8B4] p-3 rounded-full">
                    <FaEnvelope className="text-[#6B3226] text-xl" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-[#6B3226]">Email</h4>
                    <p className="text-gray-700">support@domainet.com</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-[#FFE8B4] p-3 rounded-full">
                    <FaPhone className="text-[#6B3226] text-xl" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-[#6B3226]">Phone</h4>
                    <p className="text-gray-700">+1 (555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-[#FFE8B4] p-3 rounded-full">
                    <FaMapMarkerAlt className="text-[#6B3226] text-xl" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-[#6B3226]">Address</h4>
                    <p className="text-gray-700">123 Tech Avenue, Innovation District, CA 94103</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-[#FFE8B4] bg-opacity-50 p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-[#B85D34] mb-6">Send a Message</h3>
              
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-[#6B3226] font-medium mb-2">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B85D34]"
                    placeholder="Your Name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-[#6B3226] font-medium mb-2">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B85D34]"
                    placeholder="Your Email"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-[#6B3226] font-medium mb-2">Message</label>
                  <textarea 
                    id="message" 
                    rows="4" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B85D34]"
                    placeholder="Your Message"
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  className="bg-[#6B3226] hover:bg-[#B85D34] text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 w-full"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      {/* <footer className="bg-[#6B3226] text-white py-12 px-4 animate-[fadeIn_1s_ease-in-out]">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">DomaiNetHire</h3>
              <p className="text-gray-300 mb-4">Connecting talent with opportunity.</p>
              <p className="text-gray-300">© 2023 DomaiNetHire. All rights reserved.</p>
            </div> */}
            
            {/* <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <div className="flex flex-col space-y-3">
                <button 
                  onClick={() => scrollToSection('home')} 
                  className="bg-[#1E1E1E] hover:bg-[#333333] text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 text-center w-32"
                >
                  Home
                </button>
                <button 
                  onClick={() => scrollToSection('about')} 
                  className="bg-[#1E1E1E] hover:bg-[#333333] text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 text-center w-32"
                >
                  About Us
                </button>
                <button 
                  onClick={() => scrollToSection('contact')} 
                  className="bg-[#1E1E1E] hover:bg-[#333333] text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 text-center w-32"
                >
                  Contact Us
                </button>
              </div>
            </div> */}
            
            {/* <div>
              <h3 className="text-xl font-bold mb-4">Get Started</h3>
              <div className="space-y-4">
                <button 
                  onClick={() => handleNavigation('/company/login')} 
                  className="bg-[#B85D34] hover:bg-[#FF9F4F] text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 block w-full text-center"
                >
                  For Companies
                </button>
                <button 
                  onClick={() => handleNavigation('/employee/login')} 
                  className="bg-[#B85D34] hover:bg-[#FF9F4F] text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 block w-full text-center"
                >
                  For Professionals
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer> */}
    </div>
  );
};

export default HomePage;