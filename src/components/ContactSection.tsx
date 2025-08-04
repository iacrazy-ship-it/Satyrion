import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MapPin, Phone, Mail } from 'lucide-react';

const ContactSection: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <motion.section
      id="contatti"
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="py-16 md:py-20 bg-gradient-to-br from-gray-50 to-gray-100"
    >
      <div className="container mx-auto px-4">
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Contatti
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-red-800 to-blue-800 mx-auto rounded-full"></div>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mt-6">
            Siamo qui per aiutarti a pianificare la tua visita al Parco Archeologico di Saturo
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-red-800 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">Indirizzo</h3>
              <p className="text-gray-600 leading-relaxed">
                Viale Saturo<br />
                74020 Leporano TA<br />
                Italia
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-800 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">Telefono</h3>
              <p className="text-gray-600 leading-relaxed">
                <a 
                  href="tel:+393409247013" 
                  className="hover:text-blue-800 transition-colors touch-manipulation"
                >
                  340 9247013
                </a>
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-amber-600 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">Email</h3>
              <p className="text-gray-600 leading-relaxed">
                <a 
                  href="mailto:parcosaturo@libero.it" 
                  className="hover:text-orange-600 transition-colors touch-manipulation"
                >
                  parcosaturo@libero.it
                </a>
              </p>
            </motion.div>
          </div>

          {/* Opening Hours */}
          {/* <motion.div
            variants={itemVariants}
            className="mt-12 bg-white rounded-2xl p-8 shadow-lg text-center"
          > */}
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Orari di Apertura</h3>
            <div className="grid md:grid-cols-2 gap-6 text-gray-600">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Periodo Estivo (Giugno - Settembre)</h4>
                <p>Tutti i giorni: 9:00 - 19:00</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Periodo Invernale (Ottobre - Maggio)</h4>
                <p>Martedì - Domenica: 9:00 - 17:00<br />Lunedì: Chiuso</p>
              </div>
            </div>
          {/* </motion.div> */}
        </div>
      </div>
    </motion.section>
  );
};

export default ContactSection;