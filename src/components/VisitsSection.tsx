import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, Clock, Users, Euro, Info } from 'lucide-react';

const VisitsSection: React.FC = () => {
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
      id="visite"
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="py-16 md:py-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50"
    >
      <div className="container mx-auto px-4">
        <motion.div variants={itemVariants} className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Pianifica la tua Visita
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-red-800 to-blue-800 mx-auto rounded-full mb-6"></div>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Scopri come visitare il parco e vivere un'esperienza indimenticabile nella storia antica
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-start">
          {/* Orari e Informazioni */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-red-800 to-red-600 rounded-full flex items-center justify-center mr-4">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Orari di Apertura</h3>
              </div>
              
              <div className="space-y-4">
                <div className="border-l-4 border-red-800 pl-4">
                  <h4 className="font-semibold text-gray-800 mb-1">Periodo Estivo (Giugno - Settembre)</h4>
                  <p className="text-gray-600">Tutti i giorni: 9:00 - 19:00</p>
                </div>
                <div className="border-l-4 border-blue-800 pl-4">
                  <h4 className="font-semibold text-gray-800 mb-1">Periodo Invernale (Ottobre - Maggio)</h4>
                  <p className="text-gray-600">Martedì - Domenica: 9:00 - 17:00</p>
                  <p className="text-gray-500 text-sm">Lunedì: Chiuso</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-800 to-blue-600 rounded-full flex items-center justify-center mr-4">
                  <Euro className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Tariffe</h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-700">Biglietto intero</span>
                  <span className="font-semibold text-gray-800">€ 3,00</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-700">Biglietto ridotto</span>
                  <span className="font-semibold text-gray-800">€ 2,00</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-700">Gruppi (min. 15 persone)</span>
                  <span className="font-semibold text-gray-800">€ 2,50</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-700">Under 18 e Over 65</span>
                  <span className="font-semibold text-green-600">Gratuito</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Servizi e Prenotazioni */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-orange-600 rounded-full flex items-center justify-center mr-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Visite Guidate</h3>
              </div>
              
              <div className="space-y-4">
                <p className="text-gray-600 leading-relaxed">
                  Scopri i segreti del parco con le nostre guide esperte. 
                  Le visite guidate sono disponibili su prenotazione per gruppi di almeno 10 persone.
                </p>
                <div className="bg-amber-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Durata della visita</h4>
                  <p className="text-gray-600">Circa 90 minuti</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Lingue disponibili</h4>
                  <p className="text-gray-600">Italiano, Inglese</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center mr-4">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Prenotazioni</h3>
              </div>
              
              <div className="space-y-4">
                <p className="text-gray-600 leading-relaxed">
                  Per garantire la migliore esperienza di visita, consigliamo di prenotare in anticipo, 
                  specialmente per i gruppi e durante i periodi di alta stagione.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Info className="w-5 h-5 text-blue-600 mr-2" />
                    <span className="text-gray-700">Prenotazione consigliata per gruppi</span>
                  </div>
                  <div className="flex items-center">
                    <Info className="w-5 h-5 text-blue-600 mr-2" />
                    <span className="text-gray-700">Visite scolastiche su richiesta</span>
                  </div>
                  <div className="flex items-center">
                    <Info className="w-5 h-5 text-blue-600 mr-2" />
                    <span className="text-gray-700">Accessibilità per disabili</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div variants={itemVariants} className="text-center mt-12">
          <div className="bg-gradient-to-r from-red-800 to-blue-800 rounded-2xl p-8 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Prenota la tua Visita
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Contattaci per organizzare la tua esperienza al Parco Archeologico di Saturo
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+393409247013"
                className="bg-white text-red-800 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors touch-manipulation"
              >
                📞 340 9247013
              </a>
              <a
                href="mailto:parcosaturo@libero.it"
                className="bg-white text-blue-800 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors touch-manipulation"
              >
                ✉️ parcosaturo@libero.it
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default VisitsSection;