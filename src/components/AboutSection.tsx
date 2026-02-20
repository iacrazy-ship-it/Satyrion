import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Clock, Users, Camera, MapPin, History } from 'lucide-react';

const AboutSection: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="py-16 md:py-24 bg-saturo-light" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl md:text-4xl font-serif font-bold text-saturo-primary mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            Il Parco Archeologico
          </motion.h2>
          <motion.div 
            className="w-40 h-0.5 bg-saturo-accent mx-auto mb-6"
            initial={{ width: 0 }}
            animate={inView ? { width: 160 } : { width: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" ref={ref}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6 }}
            className="rounded-xl overflow-hidden shadow-xl"
          >
            <img 
              src="/images/01-2.jpg" 
              alt="Parco Archeologico di Saturo" 
              className="w-full h-auto object-cover"
            />
          </motion.div>

          <div>
            <motion.h3 
              className="text-2xl md:text-3xl font-serif font-bold text-saturo-secondary mb-6"
              variants={itemVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              Storia Millenaria
            </motion.h3>
            
            <motion.p 
              className="text-saturo-dark mb-6 leading-relaxed font-sans"
              variants={itemVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              Il Parco Archeologico di Saturo rappresenta una testimonianza straordinaria della storia antica della Magna Grecia in Puglia, con reperti che risalgono all'età del Bronzo fino all'epoca romana. Gli scavi hanno rivelato strutture abitative, necropoli e importanti manufatti che raccontano la vita quotidiana delle antiche popolazioni che hanno abitato quest'area.
            </motion.p>
            
            <motion.p 
              className="text-saturo-dark mb-8 leading-relaxed font-sans"
              variants={itemVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              Il parco si estende su un promontorio sul Mar Ionio e offre ai visitatori un viaggio attraverso il tempo, permettendo di esplorare le vestigia dell'antica città di Satyrion, fondata dai coloni greci e successivamente sviluppata in epoca romana.
            </motion.p>

            <motion.div 
              className="grid grid-cols-2 gap-4"
              variants={containerVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              <motion.div 
                className="bg-white p-4 rounded-lg shadow-md border border-saturo-primary/10"
                variants={itemVariants}
              >
                <History className="w-8 h-8 text-saturo-primary mb-2" />
                <h4 className="font-semibold text-saturo-secondary mb-1">3000 anni</h4>
                <p className="text-sm text-saturo-dark">Di storia da scoprire</p>
              </motion.div>
              
              <motion.div 
                className="bg-white p-4 rounded-lg shadow-md border border-saturo-primary/10"
                variants={itemVariants}
              >
                <Clock className="w-8 h-8 text-saturo-primary mb-2" />
                <h4 className="font-semibold text-saturo-secondary mb-1">Visite guidate</h4>
                <p className="text-sm text-saturo-dark">Con esperti archeologi</p>
              </motion.div>
              
              <motion.div 
                className="bg-white p-4 rounded-lg shadow-md border border-saturo-primary/10"
                variants={itemVariants}
              >
                <Camera className="w-8 h-8 text-saturo-primary mb-2" />
                <h4 className="font-semibold text-saturo-secondary mb-1">Fotografie</h4>
                <p className="text-sm text-saturo-dark">Consentite in tutto il sito</p>
              </motion.div>
              
              <motion.div 
                className="bg-white p-4 rounded-lg shadow-md border border-saturo-primary/10"
                variants={itemVariants}
              >
                <MapPin className="w-8 h-8 text-saturo-primary mb-2" />
                <h4 className="font-semibold text-saturo-secondary mb-1">Posizione</h4>
                <p className="text-sm text-saturo-dark">Strategica sul mare</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;