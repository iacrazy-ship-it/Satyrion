import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Shield, Leaf, Users, Award } from 'lucide-react';

const DescriptionSection: React.FC = () => {
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
    <section className="py-16 md:py-24 bg-white" id="description">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl md:text-4xl font-serif font-bold text-saturo-primary mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            Il Sito Archeologico
          </motion.h2>
          <motion.div 
            className="w-40 h-0.5 bg-saturo-accent mx-auto mb-6"
            initial={{ width: 0 }}
            animate={inView ? { width: 160 } : { width: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16" ref={ref}>
          <div>
            <motion.h3 
              className="text-2xl md:text-3xl font-serif font-bold text-saturo-secondary mb-6"
              variants={itemVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              Scoperta e Valorizzazione
            </motion.h3>
            
            <motion.p 
              className="text-saturo-dark mb-6 leading-relaxed font-sans"
              variants={itemVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              Il Parco Archeologico di Saturo rappresenta un importante sito di interesse storico e culturale, che testimonia la presenza di insediamenti umani fin dall'età del Bronzo. Le ricerche archeologiche hanno portato alla luce strutture di diverse epoche, dal periodo greco a quello romano, offrendo uno spaccato unico della storia antica della regione.
            </motion.p>
            
            <motion.p 
              className="text-saturo-dark mb-8 leading-relaxed font-sans"
              variants={itemVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              Il parco è stato oggetto di importanti interventi di valorizzazione che hanno permesso di rendere accessibili al pubblico le strutture archeologiche, creando percorsi di visita e installando pannelli informativi che guidano i visitatori alla scoperta di questo straordinario patrimonio culturale.
            </motion.p>

            <motion.div 
              className="grid grid-cols-2 gap-4"
              variants={containerVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              <motion.div 
                className="bg-saturo-light p-4 rounded-lg shadow-sm border border-saturo-primary/10"
                variants={itemVariants}
              >
                <Shield className="w-8 h-8 text-saturo-primary mb-2" />
                <h4 className="font-semibold text-saturo-secondary mb-1">Conservazione</h4>
                <p className="text-sm text-saturo-dark">Tutela del patrimonio</p>
              </motion.div>
              
              <motion.div 
                className="bg-saturo-light p-4 rounded-lg shadow-sm border border-saturo-primary/10"
                variants={itemVariants}
              >
                <Leaf className="w-8 h-8 text-saturo-primary mb-2" />
                <h4 className="font-semibold text-saturo-secondary mb-1">Ambiente</h4>
                <p className="text-sm text-saturo-dark">Integrazione naturale</p>
              </motion.div>
              
              <motion.div 
                className="bg-saturo-light p-4 rounded-lg shadow-sm border border-saturo-primary/10"
                variants={itemVariants}
              >
                <Users className="w-8 h-8 text-saturo-primary mb-2" />
                <h4 className="font-semibold text-saturo-secondary mb-1">Fruizione</h4>
                <p className="text-sm text-saturo-dark">Accessibilità per tutti</p>
              </motion.div>
              
              <motion.div 
                className="bg-saturo-light p-4 rounded-lg shadow-sm border border-saturo-primary/10"
                variants={itemVariants}
              >
                <Award className="w-8 h-8 text-saturo-primary mb-2" />
                <h4 className="font-semibold text-saturo-secondary mb-1">Eccellenza</h4>
                <p className="text-sm text-saturo-dark">Rilevanza culturale</p>
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6 }}
            className="rounded-xl overflow-hidden shadow-xl"
          >
            <img 
              src="/images/01-3.jpg" 
              alt="Parco Archeologico di Saturo" 
              className="w-full h-auto object-cover"
            />
          </motion.div>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="rounded-lg overflow-hidden shadow-md">
            <img 
              src="/images/02-1.jpg" 
              alt="Dettaglio Parco 1" 
              className="w-full h-64 object-cover"
            />
          </div>
          <div className="rounded-lg overflow-hidden shadow-md">
            <img 
              src="/images/02-2.jpg" 
              alt="Dettaglio Parco 2" 
              className="w-full h-64 object-cover"
            />
          </div>
          <div className="rounded-lg overflow-hidden shadow-md">
            <img 
              src="/images/03-1.jpg" 
              alt="Dettaglio Parco 3" 
              className="w-full h-64 object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DescriptionSection;