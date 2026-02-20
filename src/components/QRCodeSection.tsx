import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import QRCode from 'qrcode';
import { Smartphone, Download } from 'lucide-react';

const QRCodeSection: React.FC = () => {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    const generateQRCode = async () => {
      try {
        // For development, use localhost. In production, this would be the Vercel URL
        const siteUrl = window.location.origin;
        const qrDataUrl = await QRCode.toDataURL(siteUrl, {
          width: 256,
          margin: 2,
          color: {
            dark: '#8B0000', // Granata color
            light: '#FFFFFF',
          },
        });
        setQrCodeUrl(qrDataUrl);
      } catch (error) {
        console.error('Error generating QR code:', error);
      }
    };

    generateQRCode();
  }, []);

  const downloadQRCode = () => {
    if (qrCodeUrl) {
      const link = document.createElement('a');
      link.download = 'satyrion-qr-code.png';
      link.href = qrCodeUrl;
      link.click();
    }
  };

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8 }}
      className="py-16 md:py-20 bg-gradient-to-br from-amber-50 to-orange-50"
    >
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Accesso Mobile
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-red-800 to-blue-800 mx-auto rounded-full mb-6"></div>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Scansiona il codice QR con il tuo smartphone per accedere rapidamente al sito 
            e portare con te tutte le informazioni del Parco Archeologico di Saturo.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-md mx-auto"
        >
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-2xl">
            <div className="flex items-center justify-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-red-800 to-blue-800 rounded-full flex items-center justify-center">
                <Smartphone className="w-6 h-6 text-white" />
              </div>
            </div>
            
            {qrCodeUrl && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="mb-6"
              >
                <img
                  src={qrCodeUrl}
                  alt="QR Code per accesso mobile"
                  className="w-48 h-48 md:w-64 md:h-64 mx-auto rounded-2xl shadow-lg"
                />
              </motion.div>
            )}

            <div className="space-y-4">
              <p className="text-gray-600 text-sm">
                Inquadra con la fotocamera del tuo smartphone
              </p>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={downloadQRCode}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-red-800 to-blue-800 text-white px-4 md:px-6 py-2 md:py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 touch-manipulation text-sm md:text-base"
              >
                <Download className="w-4 h-4" />
                Scarica QR Code
              </motion.button>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 grid md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-xl p-4 md:p-6 shadow-lg">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-red-800 font-bold text-xl">1</span>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2 text-lg">Scansiona</h3>
            <p className="text-gray-600 text-sm">
              Apri la fotocamera del telefono e inquadra il QR code
            </p>
          </div>

          <div className="bg-white rounded-xl p-4 md:p-6 shadow-lg">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-blue-800 font-bold text-xl">2</span>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2 text-lg">Tocca</h3>
            <p className="text-gray-600 text-sm">
              Tocca la notifica che appare per aprire il link
            </p>
          </div>

          <div className="bg-white rounded-xl p-4 md:p-6 shadow-lg">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-amber-800 font-bold text-xl">3</span>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2 text-lg">Scopri</h3>
            <p className="text-gray-600 text-sm">
              Esplora il parco direttamente dal tuo smartphone
            </p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default QRCodeSection;