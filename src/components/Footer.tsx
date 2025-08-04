import React from 'react';
import { motion } from 'framer-motion';
import { Heart, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <img
              src="/images/Satyrion logo.png"
              alt="Satyrion Logo"
              className="h-12 md:h-16 mx-auto mb-4 filter brightness-0 invert"
            />
            <h3 className="text-xl md:text-2xl font-bold mb-4">Parco Archeologico di Saturo</h3>
            <p className="text-gray-300 max-w-2xl mx-auto text-sm md:text-base">
              Un viaggio attraverso millenni di storia, dove il mito incontra la realtà 
              e il passato rivive attraverso i suoi tesori archeologici.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid md:grid-cols-3 gap-8 mb-8"
          >
            <div>
              <h4 className="font-semibold mb-3 text-amber-400 text-lg">Contatti</h4>
              <div className="space-y-2 text-gray-300">
                <p className="flex items-center justify-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Viale Saturo, 74020 Leporano TA
                </p>
                <p>📞 340 9247013</p>
                <p>✉️ parcosaturo@libero.it</p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3 text-amber-400 text-lg">Orari</h4>
              <div className="space-y-2 text-gray-300 text-sm">
                <p>Estivo: 9:00 - 19:00</p>
                <p>Invernale: 9:00 - 17:00</p>
                <p>(Lunedì chiuso in inverno)</p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3 text-amber-400 text-lg">Seguici</h4>
              <div className="flex justify-center space-x-4">
                <motion.a
                  whileHover={{ scale: 1.1, y: -2 }}
                  href="#"
                  className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors"
                >
                  f
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1, y: -2 }}
                  href="#"
                  className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-500 transition-colors"
                >
                  IG
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1, y: -2 }}
                  href="#"
                  className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center hover:bg-green-500 transition-colors"
                >
                  WA
                </motion.a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="border-t border-gray-700 pt-8"
          >
            <p className="text-gray-400 flex items-center justify-center gap-1 text-sm md:text-base">
              © 2024 Parco Archeologico di Saturo. Realizzato con 
              <Heart className="w-4 h-4 text-red-500" /> 
              per preservare la storia
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;