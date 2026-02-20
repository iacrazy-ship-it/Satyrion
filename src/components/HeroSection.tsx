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
    <section className="hero-section relative min-h-screen h-screen w-full overflow-hidden">
      {/* Background Image - responsive, centered, fills viewport */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/Vista_Aerea.jpg"
          alt="Parco Archeologico di Saturo"
          className="absolute inset-0 w-full h-full object-cover object-center min-w-full min-h-full"
        />
        <div className="absolute inset-0 bg-saturo-secondary/40" aria-hidden="true" />
      </div>

      {/* Logo - responsive sizing */}
      <div className="absolute top-2 sm:top-4 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center">
        <div className="w-36 h-36 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 overflow-hidden">
          <img
            src="/images/Satyrion logo.png"
            alt="Logo Satyrion"
            className="w-full h-full object-contain drop-shadow-lg"
          />
        </div>
      </div>

      {/* Leporano, Italia - responsive */}
      <div className="absolute bottom-3 right-3 sm:bottom-6 sm:right-6 z-10 flex items-center gap-1.5 sm:gap-2 text-saturo-secondary font-bold drop-shadow-sm">
        <MapPin className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 flex-shrink-0" />
        <span className="text-sm sm:text-base md:text-lg lg:text-xl font-serif">Leporano, Italia</span>
      </div>

      {/* Content - centered, responsive */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-3 sm:px-6 lg:px-8 pt-4 pb-20 sm:pb-24">
        <motion.h1
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif font-bold text-white mb-4 sm:mb-6 drop-shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Parco Archeologico di Saturo
        </motion.h1>

        <motion.p
          className="text-base sm:text-lg md:text-xl text-white/90 max-w-3xl mb-6 sm:mb-8 font-sans px-1 drop-shadow-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Scopri la storia millenaria di uno dei siti archeologici più importanti della Magna Grecia in Puglia
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="flex flex-col items-center gap-2 sm:gap-3">
            <motion.button
              onClick={() => onPdfSelect('/pdfs/satyrion-it.pdf', 'it')}
              className="px-5 py-3 sm:px-6 sm:py-3.5 md:px-8 md:py-4 bg-saturo-primary text-white rounded-lg font-medium flex items-center justify-center shadow-lg text-sm sm:text-base min-w-[200px] sm:min-w-0"
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
                <FileText className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 flex-shrink-0" />
                <span>Visualizza PDF Italiano</span>
              </motion.div>
            </motion.button>
            {qrIt && (
              <motion.img
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                src={qrIt}
                alt="QR Flipbook Italiano"
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg bg-white p-2 shadow-lg border-2 border-white/50 flex-shrink-0"
              />
            )}
            <span className="text-[10px] sm:text-xs text-white/90 font-sans">Continua su smartphone</span>
          </div>

          <div className="flex flex-col items-center gap-2 sm:gap-3">
            <motion.button
              onClick={() => onPdfSelect('/pdfs/satyrion-en.pdf', 'en')}
              className="px-5 py-3 sm:px-6 sm:py-3.5 md:px-8 md:py-4 bg-saturo-secondary text-white rounded-lg font-medium flex items-center justify-center shadow-lg text-sm sm:text-base min-w-[200px] sm:min-w-0"
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
                <FileText className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 flex-shrink-0" />
                <span>View PDF English</span>
              </motion.div>
            </motion.button>
            {qrEn && (
              <motion.img
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                src={qrEn}
                alt="QR Flipbook English"
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg bg-white p-2 shadow-lg border-2 border-white/50 flex-shrink-0"
              />
            )}
            <span className="text-[10px] sm:text-xs text-white/90 font-sans">Continue on smartphone</span>
          </div>

          <div className="flex flex-col items-center gap-2 sm:gap-3">
            <motion.button
              onClick={() => onPdfSelect('/pdfs/satyrion-es.pdf', 'es')}
              className="px-5 py-3 sm:px-6 sm:py-3.5 md:px-8 md:py-4 bg-white text-saturo-dark rounded-lg font-medium flex items-center justify-center shadow-lg border-2 border-saturo-primary/30 text-sm sm:text-base min-w-[200px] sm:min-w-0"
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
                <FileText className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 flex-shrink-0 text-saturo-primary" />
                <span>Ver PDF Español</span>
              </motion.div>
            </motion.button>
            {qrEs && (
              <motion.img
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                src={qrEs}
                alt="QR Flipbook Español"
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg bg-white p-2 shadow-lg border-2 border-white/50 flex-shrink-0"
              />
            )}
            <span className="text-[10px] sm:text-xs text-white/90 font-sans">Continúa en smartphone</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;