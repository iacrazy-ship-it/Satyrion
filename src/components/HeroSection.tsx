import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Globe, MapPin } from 'lucide-react';

interface HeroSectionProps {
  onPdfSelect: (pdfPath: string, italian: boolean) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onPdfSelect }) => {
  return (
    <section className="relative h-[80vh] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/Vista_Aerea.jpg" 
          alt="Parco Archeologico di Saturo" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-saturo-secondary/40"></div>
      </div>
      
      {/* Logo integrato sull'immagine */}
      <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center">
        <div className="w-96 h-96 overflow-hidden">
          <img 
            src="/images/Satyrion logo.png" 
            alt="Logo Satyrion" 
            className="w-full h-full object-contain drop-shadow-2xl"
          />
        </div>
      </div>
      
      {/* Leporano, Italia */}
      <div className="absolute bottom-6 right-6 z-10 flex items-center space-x-2 text-saturo-secondary font-bold">
        <MapPin className="w-6 h-6" />
        <span className="text-xl font-serif">Leporano, Italia</span>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8">
        <motion.h1 
          className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Parco Archeologico di Saturo
        </motion.h1>
        
        <motion.p 
          className="text-xl text-white/90 max-w-3xl mb-8 font-sans"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Scopri la storia millenaria di uno dei siti archeologici più importanti della Magna Grecia in Puglia
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.button 
            onClick={() => onPdfSelect('/pdfs/satyrion-it.pdf', true)}
            className="px-8 py-4 bg-saturo-primary text-white rounded-lg font-medium flex items-center justify-center shadow-lg"
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="flex items-center"
              whileHover={{
                x: [0, -4, 0, -4, 0],
                rotateY: [0, 10, 0, 10, 0],
                transition: { duration: 0.5 }
              }}
            >
              <FileText className="w-6 h-6 mr-3" />
              <span>Visualizza PDF Italiano</span>
            </motion.div>
          </motion.button>
          
          <motion.button 
            onClick={() => onPdfSelect('/pdfs/satyrion-en.pdf', false)}
            className="px-8 py-4 bg-saturo-secondary text-white rounded-lg font-medium flex items-center justify-center shadow-lg"
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="flex items-center"
              whileHover={{
                x: [0, -4, 0, -4, 0],
                rotateY: [0, 10, 0, 10, 0],
                transition: { duration: 0.5 }
              }}
            >
              <FileText className="w-6 h-6 mr-3" />
              <span>View PDF English</span>
            </motion.div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;