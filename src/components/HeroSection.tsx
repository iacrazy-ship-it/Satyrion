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
      
      {/* Logo integrato sull'immagine - sempre sopra lo sfondo, non collide con i contenuti */}
      <div className="absolute top-4 sm:top-8 md:top-12 lg:top-16 left-1/2 transform -translate-x-1/2 z-20 pointer-events-none flex flex-col items-center">
        <div className="w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 overflow-hidden">
          <img 
            src="/images/Satyrion logo.png" 
            alt="Logo Satyrion" 
            className="w-full h-full object-contain drop-shadow-2xl"
          />
        </div>
      </div>
      
      {/* Leporano, Italia */}
      <div className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 z-10 flex items-center space-x-1 sm:space-x-2 text-saturo-secondary font-bold">
        <MapPin className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
        <span className="text-sm sm:text-base md:text-lg lg:text-xl font-serif">Leporano, Italia</span>
      </div>

      {/* Content - padding top aumentato per evitare sovrapposizioni con il logo */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 pt-40 sm:pt-56 md:pt-64 lg:pt-72 xl:pt-80">
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