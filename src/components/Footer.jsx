import { motion } from 'framer-motion';
import { 
  Github, 
  Linkedin, 
  Heart, 
  Code,
  Sparkles,
  Film
} from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/Hemdan-MK',
      icon: Github,
      color: 'hover:text-gray-300'
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/hemdan-m-k',
      icon: Linkedin,
      color: 'hover:text-blue-400'
    }
  ];

  return (
    <footer className="relative bg-black border-t border-gray-800/50">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent">
        <motion.div 
          className="absolute top-0 left-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute top-0 right-1/4 w-48 h-48 bg-pink-500/5 rounded-full blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 20, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          {/* Logo and Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Film className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">SUMMARIZR</h3>
            </div>
            <p className="text-sm sm:text-base text-gray-400 max-w-md mx-auto px-4 sm:px-0">
              Discover amazing movies with AI-powered insights and authentic reviews
            </p>
          </motion.div>

          {/* Creator Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <div className="relative inline-flex items-center space-x-2 mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-lg"></div>
              <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 text-white px-6 py-3 rounded-full flex items-center space-x-2">
                <motion.div
                  animate={{ 
                    rotate: [0, 360],
                  }}
                  transition={{ 
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  <Code className="w-4 h-4 text-purple-400" />
                </motion.div>
                <span className="text-sm font-medium">Made with</span>
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Heart className="w-4 h-4 text-pink-400 fill-current" />
                </motion.div>
                <span className="text-sm font-medium">by</span>
                <span className="font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Hemdan
                </span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex justify-center space-x-4 sm:space-x-6">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    whileHover={{ 
                      scale: 1.1,
                      y: -2,
                      transition: { type: "spring", stiffness: 400, damping: 25 }
                    }}
                    whileTap={{ scale: 0.95 }}
                    className={`group relative p-3 bg-gray-900/30 backdrop-blur-sm border border-gray-800/50 rounded-xl text-gray-400 ${social.color} transition-colors duration-300 hover:border-purple-500/30`}
                  >
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Icon */}
                    <div className="relative">
                      <Icon className="w-5 h-5" />
                    </div>
                    
                    {/* Tooltip */}
                    <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black/90 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      {social.name}
                    </div>
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Divider */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-6"
          />

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-center justify-between text-sm text-gray-500 space-y-2 sm:space-y-0"
          >
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>© 2024 SUMMARIZR. All rights reserved.</span>
            </div>
            <div className="flex items-center space-x-1">
              <span>Powered by</span>
              <span className="font-semibold text-purple-400">React</span>
              <span>&</span>
              <span className="font-semibold text-pink-400">TMDB API</span>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
