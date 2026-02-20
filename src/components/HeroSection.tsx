import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, MapPin } from 'lucide-react';
import QRCode from 'qrcode';

export type PdfLanguage = 'it' | 'en' | 'es';

interface HeroSectionProps {
  onPdfSelect: (pdfPath: string, language: PdfLanguage) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onPdfSelect }) => {
  const [qrIt, setQrIt] = useState<string>('');
  const [qrEn, setQrEn] = useState<string>('');
  const [qrEs, setQrEs] = useState<string>('');

  useEffect(() => {
    const origin = window.location.origin;
    const pdfBase = `${origin}/pdfs`;
    const itUrl = `${origin}/flipbook.html?src=${encodeURIComponent(`${pdfBase}/satyrion-it.pdf`)}`;
    const enUrl = `${origin}/flipbook.html?src=${encodeURIComponent(`${pdfBase}/satyrion-en.pdf`)}`;
    const esUrl = `${origin}/flipbook.html?src=${encodeURIComponent(`${pdfBase}/satyrion-es.pdf`)}`;

    const qrOptions = {
      width: 256,
      margin: 2,
      errorCorrectionLevel: 'H' as const,
      color: { dark: '#000000', light: '#FFFFFF' },
    };

    const generate = async () => {
      try {
        const [itData, enData, esData] = await Promise.all([
          QRCode.toDataURL(itUrl, qrOptions),
          QRCode.toDataURL(enUrl, qrOptions),
          QRCode.toDataURL(esUrl, qrOptions),
        ]);
        setQrIt(itData);
        setQrEn(enData);
        setQrEs(esData);
      } catch (e) {
        console.error('QR generation error in HeroSection:', e);
      }
    };
    generate();
  }, []);

  return (
    <section className="hero-section relative min-h-screen w-full flex flex-col items-center overflow-x-hidden">
      {/* Background Image - responsive, centered, fills viewport */}
      <div className="absolute inset-0 z-0 h-full w-full">
        <img
          src="/images/Vista_Aerea.jpg"
          alt="Parco Archeologico di Saturo"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-saturo-secondary/40" aria-hidden="true" />
      </div>

      {/* Main Content Container - Using Flex to ensure flow and avoid overlap */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-8 sm:py-12 flex flex-col items-center justify-center min-h-screen text-center">

        {/* Logo - now part of the flex flow */}
        <motion.div
          className="mb-6 sm:mb-8 flex justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="w-24 h-24 xs:w-32 xs:h-32 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 xl:w-72 xl:h-72">
            <img
              src="/images/Satyrion logo.png"
              alt="Logo Satyrion"
              className="w-full h-full object-contain drop-shadow-lg"
            />
          </div>
        </motion.div>

        {/* Text and Buttons Content */}
        <div className="flex flex-col items-center">
          <motion.h1
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif font-bold text-white mb-3 sm:mb-6 drop-shadow-md leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Parco Archeologico di Saturo
          </motion.h1>

          <motion.p
            className="text-sm sm:text-lg md:text-xl text-white/90 max-w-3xl mb-8 sm:mb-10 font-sans px-2 drop-shadow-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Scopri la storia millenaria di uno dei siti archeologici più importanti della Magna Grecia in Puglia
          </motion.p>

          <motion.div
            className="flex flex-col md:flex-row flex-wrap justify-center gap-6 sm:gap-8 lg:gap-10 pb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {/* IT Button */}
            <div className="flex flex-col items-center gap-3">
              <motion.button
                onClick={() => onPdfSelect('/pdfs/satyrion-it.pdf', 'it')}
                className="px-6 py-3 sm:px-8 sm:py-4 bg-saturo-primary text-white rounded-lg font-medium flex items-center justify-center shadow-lg text-sm sm:text-base min-w-[220px]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FileText className="w-5 h-5 sm:w-6 sm:h-6 mr-3 flex-shrink-0" />
                <span>PDF Italiano</span>
              </motion.button>
              {qrIt && (
                <motion.img
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  src={qrIt}
                  alt="QR Flipbook Italiano"
                  className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-lg bg-white p-2 shadow-lg border-2 border-white/50"
                />
              )}
              <span className="text-[10px] sm:text-xs text-white/90 font-sans">Continua su smartphone</span>
            </div>

            {/* EN Button */}
            <div className="flex flex-col items-center gap-3">
              <motion.button
                onClick={() => onPdfSelect('/pdfs/satyrion-en.pdf', 'en')}
                className="px-6 py-3 sm:px-8 sm:py-4 bg-saturo-secondary text-white rounded-lg font-medium flex items-center justify-center shadow-lg text-sm sm:text-base min-w-[220px]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FileText className="w-5 h-5 sm:w-6 sm:h-6 mr-3 flex-shrink-0" />
                <span>PDF English</span>
              </motion.button>
              {qrEn && (
                <motion.img
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  src={qrEn}
                  alt="QR Flipbook English"
                  className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-lg bg-white p-2 shadow-lg border-2 border-white/50"
                />
              )}
              <span className="text-[10px] sm:text-xs text-white/90 font-sans">Continue on smartphone</span>
            </div>

            {/* ES Button */}
            <div className="flex flex-col items-center gap-3">
              <motion.button
                onClick={() => onPdfSelect('/pdfs/satyrion-es.pdf', 'es')}
                className="px-6 py-3 sm:px-8 sm:py-4 bg-white text-saturo-dark rounded-lg font-medium flex items-center justify-center shadow-lg border-2 border-saturo-primary/30 text-sm sm:text-base min-w-[220px]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FileText className="w-5 h-5 sm:w-6 sm:h-6 mr-3 flex-shrink-0 text-saturo-primary" />
                <span>PDF Español</span>
              </motion.button>
              {qrEs && (
                <motion.img
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  src={qrEs}
                  alt="QR Flipbook Español"
                  className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-lg bg-white p-2 shadow-lg border-2 border-white/50"
                />
              )}
              <span className="text-[10px] sm:text-xs text-white/90 font-sans">Continúa en smartphone</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Leporano, Italia - Fixed position remains but adjusted for better visibility */}
      <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2 text-saturo-secondary font-bold drop-shadow-sm bg-black/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
        <MapPin className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
        <span className="text-sm sm:text-base font-serif">Leporano, Italia</span>
      </div>
    </section>
  );
};

export default HeroSection;