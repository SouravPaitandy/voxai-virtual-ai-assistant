/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import {
  Mic,
  Bot,
  Keyboard,
  Moon,
  Sun,
  Settings,
  Code,
  MessageSquare,
  Zap,
  Shield,
  ArrowRight,
  Globe,
  Brain,
  Sparkles,
  Menu,
  ArrowUp,
  AudioWaveform,
  Github,
  // Lock,
  // FileText,
  Play,
  // WholeWord,
  Globe2,
  Linkedin,
  Twitter
} from 'lucide-react';
import { Link } from 'react-router-dom';
import useTheme from "../context/ThemeContext"
import {EnhancedFeatureCard,
       EnhancedUseCaseCard,
       TestimonialCard,
       FAQAccordion
      } from './Components/Landingpage/LandingpageComps'

const LandingPage = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false)
  const { theme, toggleTheme } = useTheme();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVoiceAnimating, setIsVoiceAnimating] = useState(false);

   // Handle scroll progress
   useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.scrollY / totalScroll) * 100;
      setScrollProgress(currentProgress);
      setShowScrollTop(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-50">
        <div 
          className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

       {/* Animated Background */}
       <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
         <div className="absolute w-full h-full">
          {[...Array(5)].map((_, i) => (
             <div 
               key={i}
               className="absolute rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"
               style={{
                 backgroundColor: ['#60A5FA', '#34D399', '#A78BFA'][i % 3],
                 top: `${Math.random() * 100}%`,
                 left: `${Math.random() * 100}%`,
                 width: `${Math.random() * 400 + 200}px`,
                 height: `${Math.random() * 400 + 200}px`,
                 animationDelay: `${i * 2}s`,
               }}
             />
           ))}
        </div>
       </div>

       {/* Floating Action Button  */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-40 p-3 rounded-full dark:border dark:border-gray-500 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 group"
        >
          <ArrowUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform duration-300" />
        </button>
      )}

      {/* Enhanced Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 
        ${scrollProgress > 0 
          ? 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-lg'
          : 'bg-transparent'}`}>
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Enhanced Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-600 rounded-lg blur group-hover:blur-md transition-all duration-300" />
                {/* <Volume2 className="w-8 h-8 text-white relative z-10 transform group-hover:scale-110 transition-transform duration-300" /> */}
                <img src="Designer(2).png" alt="X" className="w-8 h-8 relative z-10 transform group-hover:scale-110 transition-transform duration-300"/>
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent
                transition-all duration-300 group-hover:from-purple-600 group-hover:to-blue-600">
                VoxAI
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600
                  transition-all duration-300 transform hover:scale-105"
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5 text-yellow-500" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-600" />
                )}
              </button>

              {/* <nav className="flex items-center gap-6">
              <Link 
                to="#features" 
                className="text-gray-600 dark:text-gray-300 
                hover:text-blue-600 dark:hover:text-blue-400 
                transition-colors duration-300 
                relative group"
              >
                Features
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 
                  group-hover:w-full transition-all duration-300"/>
              </Link>
              <Link 
                to="#testimonials" 
                className="text-gray-600 dark:text-gray-300 
                hover:text-blue-600 dark:hover:text-blue-400 
                transition-colors duration-300 
                relative group"
              >
                Testimonials
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 
                  group-hover:w-full transition-all duration-300"/>
              </Link>
              <Link 
                to="#faq" 
                className="text-gray-600 dark:text-gray-300 
                hover:text-blue-600 dark:hover:text-blue-400 
                transition-colors duration-300 
                relative group"
              >
                FAQ
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 
                  group-hover:w-full transition-all duration-300"/>
              </Link>
            </nav>  */}

              <Link
                to="/app"
                className="relative group px-6 py-3 overflow-hidden"
                onMouseEnter={() => setIsVoiceAnimating(true)}
                onMouseLeave={() => setIsVoiceAnimating(false)}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg" />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-center gap-2 text-white">
                  <Mic className={`w-5 h-5 ${isVoiceAnimating ? 'animate-pulse' : ''}`} />
                  <span className="font-medium">Get Started</span>
                </div>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Enhanced Mobile Menu */}
        <div className={`md:hidden absolute w-full bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
        }`}>
          <div className="container mx-auto px-6 py-4 space-y-4">
            <button
              onClick={toggleTheme}
              className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600
                transition-all duration-300 flex items-center justify-center gap-2"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-5 h-5 text-yellow-500" />
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="w-5 h-5 text-gray-600" />
                  <span>Dark Mode</span>
                </>
              )}
            </button>

              {/* <Link 
                  to="#features" 
                  className="text-gray-600 dark:text-gray-300 
                  hover:text-blue-600 dark:hover:text-blue-400 
                  transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Features
                </Link>
                <Link 
                  to="#testimonials" 
                  className="text-gray-600 dark:text-gray-300 
                  hover:text-blue-600 dark:hover:text-blue-400 
                  transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Testimonials
                </Link>
                <Link 
                  to="#faq" 
                  className="text-gray-600 dark:text-gray-300 
                  hover:text-blue-600 dark:hover:text-blue-400 
                  transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  FAQ
                </Link>  */}

            <Link
              to="/app"
              className="w-full p-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg
                flex items-center justify-center gap-2 hover:from-purple-600 hover:to-blue-600 transition-all duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              <Mic className="w-5 h-5" />
              <span>Get Started</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Enhanced Hero Section */}
      <header className="container max-w-full mx-auto px-6 pt-32 pb-16 md:pt-40 md:pb-24 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-1/2 relative">
            {/* Animated Badge */}
            <div className="inline-block mb-6 relative group">
              <div className="absolute inset-0 bg-blue-100 dark:bg-blue-900/50 rounded-full blur-sm group-hover:blur-md transition-all duration-300" />
              <span className="relative px-4 py-2 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 
                rounded-full text-sm font-medium inline-flex items-center gap-2">
                <AudioWaveform className="w-4 h-4 animate-pulse" />
                Next-Gen Voice AI
              </span>
            </div>

            {/* Enhanced Heading */}
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Transform Your World with{' '}
              <span className="relative">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Voice Intelligence
                </span>
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 358 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path className="text-blue-300 dark:text-blue-900" d="M1 5.5C71 2.5 143.5 2 214.5 3C285.5 4 356.5 6.5 356.5 6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </span>
            </h1>

            {/* Enhanced Description */}
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Step into the future with VoxAI – where advanced AI meets natural conversation. 
              Experience contextual understanding, real-time learning, and seamless voice interactions 
              that adapt to your unique needs.
            </p>

            {/* Enhanced CTA Buttons */}
            <div className="flex gap-4 flex-col sm:flex-row">
              <Link
                to="/app"
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 
                  rounded-full overflow-hidden transition-all duration-300"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 
                  opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-center justify-center gap-3 text-white font-medium">
                  <Mic className="w-5 h-5 animate-pulse" />
                  <span>Start Speaking</span>
                  <ArrowRight className={`w-5 h-5 transition-transform duration-300 
                    ${isHovered ? 'translate-x-1' : ''}`} />
                </div>
              </Link>

              <a
                href="#features"
                className="px-8 py-4 rounded-full font-medium text-gray-700 dark:text-gray-200
                  bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700
                  transition-all duration-300 flex items-center justify-center gap-3"
              >
                <Bot className="w-5 h-5" />
                <span>Explore Features</span>
              </a>
            </div>
          </div>

          {/* Enhanced Hero Visual */}
          <div className="md:w-1/2 relative">
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              {/* Animated Rings */}
              <div className="absolute inset-0">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute inset-0 rounded-full border-2 border-blue-500/20 dark:border-blue-400/20"
                    style={{
                      animation: `ping ${2 + i}s cubic-bezier(0, 0, 0.2, 1) infinite`,
                      animationDelay: `${i * 0.5}s`,
                      scale: `${0.7 - i * 0.1}`,
                    }}
                  />
                ))}
              </div>

              {/* Central Icon */}
              <div className="relative z-10 w-full h-full flex items-center justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-2xl opacity-50 animate-pulse" />
                  <Bot className="w-48 h-48 text-blue-600 dark:text-blue-400 relative z-10 animate-float" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="py-16 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-600 
              dark:text-blue-300 rounded-full text-sm font-semibold mb-4 inline-block">
              Powerful Features
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white 
              mb-6 pb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Everything You Need
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Discover the powerful features that make VoxAI your perfect AI assistant companion.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              // <EnhancedFeatureCard key={index} {...feature} index={index} />
              <EnhancedFeatureCard key={index} {...feature} index={index}/>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section with Interactive Elements */}
      <section id='demo' className="py-16 bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-lg relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-600 
              dark:text-blue-300 rounded-full text-sm font-semibold mb-4 inline-block">
              Live Demo
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              See VoxAI in Action
            </h2>
          </div>
          <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl 
            bg-gradient-to-r from-blue-600 to-purple-600 p-1">
            <div className="video-div aspect-video relative rounded-xl overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <div className="text-center">
                  <Mic className="w-16 h-16 text-white/50 mx-auto mb-4 animate-pulse" />
                  <p className="text-white text-lg">
                    Interactive Demo Coming Soon!
                  </p>
                  <p className="text-blue-300 text-sm mt-2">
                    Experience the power of voice commands firsthand
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Use Cases Section */}
      <section className="py-16 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-600 
              dark:text-blue-300 rounded-full text-sm font-semibold mb-4 inline-block">
              Use Cases
            </span>
            <h2 className="text-3xl md:text-4xl pb-4 font-bold text-transparent 
              bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
              Perfect For Everyone
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {useCases.map((useCase, index) => (
              <EnhancedUseCaseCard key={index} {...useCase} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-white">
            {statistics.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
                <div className="text-blue-100 text-sm md:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-600 
              dark:text-blue-300 rounded-full text-sm font-semibold mb-4 inline-block">
              How It Works
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-transparent 
              bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
              Explore VoxAI&apos;s Capabilities
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map((step, index) => (
              <div key={index} className="relative">
                {/* {index < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 right-0 w-1/2 h-0.5 
                    bg-gradient-to-r from-blue-600 to-purple-600 transform translate-y-[-50%]"></div>
                )} */}
                <div className="text-center relative">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 
                    flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Section */}
      {/* <section className="py-16 bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-lg relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-600 
              dark:text-blue-300 rounded-full text-sm font-semibold mb-4 inline-block">
              Seamless Integration
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Works With Your Favorite Tools
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {integrations.map((integration, index) => (
              <div key={index} className="p-6 bg-white dark:bg-gray-700 rounded-xl 
                hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <img 
                  src={integration.logo} 
                  alt={integration.name} 
                  className="h-12 w-auto mx-auto mb-4"
                />
                <h3 className="text-center text-gray-900 dark:text-white font-medium">
                  {integration.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Testimonials Section */}
      <section id='testimonials' className="py-16 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-600 
              dark:text-blue-300 rounded-full text-sm font-semibold mb-4 inline-block">
              Testimonials
            </span>
            <h2 className="text-3xl md:text-4xl pb-4 font-bold text-transparent 
              bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
              What Our Users Say
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
               <TestimonialCard key={index} {...testimonial}/>
              // <div key={index} className="p-6 bg-white dark:bg-gray-700 rounded-xl 
              //   hover:shadow-xl transition-all duration-300">
              //   <div className="flex items-center mb-4">
              //     <img 
              //       src={testimonial.avatar} 
              //       alt={testimonial.name} 
              //       className="w-12 h-12 rounded-full mr-4"
              //     />
              //     <div>
              //       <h4 className="font-semibold text-gray-900 dark:text-white">
              //         {testimonial.name}
              //       </h4>
              //       <p className="text-sm text-gray-600 dark:text-gray-300">
              //         {testimonial.role}
              //       </p>
              //     </div>
              //   </div>
              //   <p className="text-gray-600 dark:text-gray-300 italic">
              //     &quot;{testimonial.quote}&quot;
              //   </p>
              // </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-lg relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-600 
              dark:text-blue-300 rounded-full text-sm font-semibold mb-4 inline-block">
              FAQ
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
                <FAQAccordion key={index} {...faq} isActive={activeFaq === index} onClick={()=> toggleFaq(index)}/>
              // <div key={index} className="mb-6">
              //   <button
              //     className="w-full text-left p-4 bg-white dark:bg-gray-700 rounded-xl 
              //       hover:shadow-md transition-all duration-300"
              //     onClick={() => toggleFaq(index)}
              //   >
              //     <div className="flex justify-between items-center">
              //       <h3 className="font-semibold text-gray-900 dark:text-white">
              //         {faq.question}
              //       </h3>
              //       <span className="transform transition-transform duration-300 dark:text-white">
              //         {activeFaq === index ? <X/> : <Plus/>}
              //       </span>
              //     </div>
              //     <div className={`mt-2 text-gray-600 dark:text-gray-300 ${
              //       activeFaq === index ? 'block' : 'hidden'
              //     }`}>
              //       {faq.answer}
              //     </div>
              //   </button>
              // </div>
            ))}
          </div>
        </div>
      </section>

     {/* Modern CTA Section with Audio Wave Animation */}
     <section className="py-24 relative z-10 overflow-hidden bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <AudioWaveform className="w-96 h-96 text-white animate-pulse" />
          </div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center mb-6 bg-blue-500/20 rounded-full p-2">
              <Mic className="w-6 h-6 text-blue-400 animate-pulse" />
              <span className="ml-2 text-blue-200 font-medium px-3">AI-Powered Voice Assistant</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-8 leading-tight">
              Experience the Future of
              <p className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Voice AI</p>
            </h2>
            
            <p className="text-xl text-blue-100 mb-12 leading-relaxed max-w-2xl mx-auto">
              Transform your digital interaction with intelligent voice commands, 
              natural conversations, and seamless integration.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/app"
                className="px-8 py-4 bg-blue-500 text-white rounded-full font-semibold 
                  hover:bg-blue-600 transition-all duration-300 inline-flex items-center 
                  gap-2 transform hover:-translate-y-1 hover:shadow-xl group"
              >
                Start for Free
                <Play className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                to="#demo"
                className="px-8 py-4 bg-white/10 text-white rounded-full font-semibold 
                  backdrop-blur-sm hover:bg-white/20 transition-all duration-300 
                  inline-flex items-center gap-2"
              >
                Watch Demo
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Footer with Enhanced Layout */}
      <footer className="bg-gray-900 text-gray-400 py-16 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
            {/* Brand Section */}
            <div className="md:col-span-4">
              <div className="flex items-center gap-2 mb-4">
                {/* <Mic className="w-8 h-8 text-blue-500" /> */}
                <img src="Designer(2).png" alt="V" className='w-8 h-8' />
                <h3 className="text-white text-2xl font-bold">VoxAI</h3>
              </div>
              <p className="text-gray-400 mb-6 pr-4">
                Empowering the future of human-computer interaction through 
                advanced voice AI technology.
              </p>
              <div className="flex space-x-4">
                {socialIcons.map((socialIcon, index) => (
                  <a
                    key={index}
                    href={socialIcon.link}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-gray-800 text-gray-400 
                      hover:bg-blue-500 hover:text-white transition-all duration-300"
                  >
                    <socialIcon.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links Sections */}
            <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
              {/* <div>
                <h4 className="text-white text-lg font-semibold mb-4">Product</h4>
                <ul className="space-y-3">
                  {['Voice Commands', 'Smart Responses', 'Integrations', 'Analytics'].map(item => (
                    <li key={item}>
                      <a href="#" className="hover:text-blue-400 transition-colors duration-300">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div> */}
              
              <div>
                <h4 className="text-white text-lg font-semibold mb-4">Resources</h4>
                <ul className="space-y-3">
                  {resourceLinks.map(item => (
                    <li key={item}>
                      <a href={item.link} target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:text-blue-400 transition-colors duration-300">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* <div>
                <h4 className="text-white text-lg font-semibold mb-4">Company</h4>
                <ul className="space-y-3">
                  {['About Us', 'Blog', 'Careers', 'Contact'].map(item => (
                    <li key={item}>
                      <a href="#" className="hover:text-blue-400 transition-colors duration-300">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div> */}
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-gray-800 pt-8 mt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-sm">
                © {new Date().getFullYear()} VoxAI. All rights reserved.
              </div>
              <div className="flex gap-6 text-sm">
                {['Privacy Policy'].map(item => (
                  <a
                    key={item}
                    href="/privacy-policy"
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-blue-400 transition-colors duration-300"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Enhanced Feature Card Component
// const EnhancedFeatureCard = ({ icon: Icon, title, description, index }) => (
//   <div 
//     className="p-6 rounded-xl bg-white dark:bg-gray-700 hover:shadow-xl 
//       transition-all duration-300 transform hover:-translate-y-1 relative 
//       overflow-hidden group"
//     style={{ animationDelay: `${index * 100}ms` }}
//   >
//     <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 
//       transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
//     <div className="relative z-10">
//       <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 
//         flex items-center justify-center mb-4 transform group-hover:scale-110 
//         transition-transform duration-300">
//         <Icon className="w-6 h-6 text-white" />
//       </div>
//       <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{title}</h3>
//       <p className="text-gray-600 dark:text-gray-300">{description}</p>
//     </div>
//   </div>
// );

// Enhanced Use Case Card Component
// const EnhancedUseCaseCard = ({ icon: Icon, title, index }) => (
//   <div 
//     className="p-6 rounded-xl bg-white dark:bg-gray-700 hover:shadow-xl 
//       transition-all duration-300 transform hover:-translate-y-1 text-center 
//       relative overflow-hidden group"
//     style={{ animationDelay: `${index * 100}ms` }}
//   >
//     <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 
//       transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
//     <div className="relative z-10">
//       <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 
//         flex items-center justify-center mb-4 mx-auto transform group-hover:scale-110 
//         transition-transform duration-300">
//         <Icon className="w-8 h-8 text-white" />
//       </div>
//       <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
//     </div>
//   </div>
// );

// Data
const features = [
  {
    icon: Mic,
    title: "Voice Commands",
    description: "Natural voice interaction with advanced speech recognition technology."
  },
  {
    icon: MessageSquare,
    title: "Smart Responses",
    description: "Contextual and intelligent responses powered by advanced AI."
  },
  {
    icon: Shield,
    title: "Privacy Focused",
    description: "Your data is encrypted and never shared with third parties."
  },
  {
    icon: Keyboard,
    title: "Keyboard Support",
    description: "Full keyboard navigation and shortcuts for power users."
  },
  {
    icon: Moon,
    title: "Dark Mode",
    description: "Easy on the eyes with automatic dark mode support."
  },
  {
    icon: Zap,
    title: "Fast & Reliable",
    description: "Lightning-fast responses and reliable performance."
  },
  {
    icon: Globe,
    title: "Multi-language Support",
    description: "Communicate in 30+ languages with automatic language detection."
  },
  {
    icon: Brain,
    title: "Context Awareness",
    description: "AI that understands and remembers conversation context for better responses."
  },
  {
    icon: Sparkles,
    title: "Custom Commands",
    description: "Create and customize your own voice commands for specific tasks."
  },
  // {
  //   icon: Lock,
  //   title: "Enterprise Security",
  //   description: "Bank-grade encryption and compliance with major security standards."
  // }
];

const useCases = [
  {
    icon: Code,
    title: "Developers"
  },
  {
    icon: MessageSquare,
    title: "Content Creators"
  },
  {
    icon: Settings,
    title: "Power Users"
  },
  {
    icon: Bot,
    title: "AI Enthusiasts"
  }
];

const statistics = [
  { value: '99.9%', label: 'Uptime' },
  { value: '5K+', label: 'Voice Commands Processed' },
  { value: '10+', label: 'Cities' },
  { value: '4.9/5', label: 'User Rating' }
];

const howItWorks = [
  {
    title: 'Speak Naturally',
    description: 'Just speak to VoxAI as you would to a human assistant. No special commands needed.'
  },
  {
    title: 'AI Processing',
    description: 'Our advanced AI understands context and processes your request in real-time.'
  },
  {
    title: 'Instant Results',
    description: 'Get immediate, accurate responses and actions based on your commands.'
  }
];

// const integrations = [
//   { name: 'Slack', logo: '/path/to/slack-logo.png' },
//   { name: 'Microsoft Teams', logo: '/path/to/teams-logo.png' },
//   { name: 'Google Workspace', logo: '/path/to/google-logo.png' },
//   { name: 'Zoom', logo: '/path/to/zoom-logo.png' }
// ];

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Product Manager',
    avatar: 'https://www.pngarts.com/files/5/User-Avatar-PNG-Transparent-Image.png',
    quote: 'VoxAI has transformed how I manage my daily tasks. The voice commands are incredibly accurate!'
  },
  {
    name: 'David Chen',
    role: 'Software Developer',
    avatar: 'https://www.pngarts.com/files/5/User-Avatar-PNG-Transparent-Image.png',
    quote: 'The API integration is seamless, and the response time is impressive. A game-changer for our team.'
  },
  {
    name: 'Emily Rodriguez',
    role: 'Content Creator',
    avatar: 'https://www.pngarts.com/files/5/User-Avatar-PNG-Transparent-Image.png',
    quote: 'As a content creator, VoxAI helps me stay focused and productive. The natural language processing is spot-on!'
  }
];

const faqs = [
  {
    question: 'How accurate is the voice recognition?',
    answer: 'VoxAI uses state-of-the-art speech recognition technology with 90%+ accuracy across multiple languages and accents.'
  },
  {
    question: 'Is my data secure?',
    answer: 'Yes, we follow strict privacy guidelines. Your data is never shared with third parties.'
  },
  {
    question: 'What languages are supported?',
    answer: 'Currently, VoxAI supports only one language, English. We are working hard to support you with your favorite language.'
  }
];

const socialIcons = [
  {
    icon: Github,
    link: 'https://github.com/SouravPaitandy'
  },
  {
    icon: Globe2,
    link: 'https://portfolio-sourav-paitandy.vercel.app/'
  },
  {
    icon: Linkedin,
    link: 'https://www.linkedin.com/in/sourav-paitandy/'
  },
  {
    icon: Twitter,
    link: 'https://x.com/PaitandySourav'
  },
];

const resourceLinks = [
  {
    name: 'Documentation',
    link: 'https://ai.google.dev/gemini-api/docs'
  },
  {
    name: 'Community',
    link: 'https://portfolio-sourav-paitandy.vercel.app/'
  },
  {
    name: 'Support Center',
    link: 'mailto:souravpaitandy.work.gmail.com?subject=Support%20Query%20for%20VoxAI%20Assistant'
  }
];

export default LandingPage;