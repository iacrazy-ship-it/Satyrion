import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Globe, MapPin } from 'lucide-react';
import QRCode from 'qrcode';

interface HeroSectionProps {
  onPdfSelect: (pdfPath: string, italian: boolean) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onPdfSelect }) => {
  const [qrIt, setQrIt] = useState<string>('');
  const [qrEn, setQrEn] = useState<string>('');

  useEffect(() => {
    const origin = window.location.origin;
    const itUrl = `${origin}/flipbook.html?src=${encodeURIComponent('/pdfs/satyrion-it.pdf')}`;
    const enUrl = `${origin}/flipbook.html?src=${encodeURIComponent('/pdfs/satyrion-en.pdf')}`;
    (async () => {
      try {
        const itData = await QRCode.toDataURL(itUrl, { width: 128, margin: 1 });
        const enData = await QRCode.toDataURL(enUrl, { width: 128, margin: 1 });
        setQrIt(itData);
        setQrEn(enData);
      } catch (e) {
        console.error('QR generation error', e);
      }
    })();
  }, []);

  return (
    <section className="relative hero-section min-h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/Vista_Aerea.jpg" 
          alt="Parco Archeologico di Saturo" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-saturo-secondary/40"></div>
      </div>
      
      {/* Logo integrato come parte del contenuto per evitare sovrapposizioni */}
      
      {/* Leporano, Italia - chip responsiva, non interferisce con interazioni */}
      <div className="absolute bottom-2 md:bottom-4 lg:bottom-6 right-2 md:right-4 lg:right-6 z-20 pointer-events-none">
        <div className="flex items-center gap-1 sm:gap-2 bg-black/25 backdrop-blur-sm text-white px-2 sm:px-3 py-1 rounded-full shadow">
          <MapPin className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
          <span className="font-serif text-[10px] sm:text-xs md:text-sm lg:text-base">Leporano, Italia</span>
        </div>
      </div>

      {/* Content centrato orizzontalmente e verticalmente */}
      <div className="relative z-10 min-h-screen hero-content flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 sm:mb-8">
          <img
            src="/images/Satyrion logo.png"
            alt="Logo Satyrion"
            className="mx-auto w-[clamp(6rem,12vw,16rem)] h-auto drop-shadow-2xl pointer-events-none"
          />
        </div>
        <motion.h1 
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif font-bold text-white mb-4 sm:mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Parco Archeologico di Saturo
        </motion.h1>
        
        <motion.p 
          className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 max-w-3xl mb-6 sm:mb-8 font-sans px-2"
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
          {/* Gruppo IT: bottone + QR + label (verticale) */}
          <div className="flex flex-col items-center gap-3">
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
            {qrIt && (
              <img src={qrIt} alt="QR Flipbook IT" className="w-20 h-20 rounded bg-white p-1 shadow" />
            )}
            <span className="mt-1 text-xs text-white/90">Continua sul tuo dispositivo</span>
          </div>

          {/* Gruppo EN: bottone + QR + label (verticale) */}
          <div className="flex flex-col items-center gap-3">
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
            {qrEn && (
              <img src={qrEn} alt="QR Flipbook EN" className="w-20 h-20 rounded bg-white p-1 shadow" />
            )}
            <span className="mt-1 text-xs text-white/90">Continue on your device</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;