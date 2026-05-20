import React from 'react';
import { motion } from 'framer-motion';
import { Play, Image as ImageIcon, Compass, Map } from 'lucide-react';
import type { MediaType } from './MediaViewer';

export interface CategoryItem {
  id: string;
  name: string;
  type: MediaType;
  coverImage: string;
  icon: React.ComponentType<any>;
  mediaFiles: string[];
}

interface CategoryGridProps {
  onCategorySelect: (category: CategoryItem) => void;
}

const CATEGORIES: CategoryItem[] = [
  {
    id: 'reperti',
    name: 'Reperti storici',
    type: 'video',
    coverImage: '/images/REPERTI STORICI/05_Inv.120341 -Giara a staffa Micenea.JPG',
    icon: Play,
    mediaFiles: ['/images/REPERTI STORICI/Reperti.mp4']
  },
  {
    id: 'scavi',
    name: 'Scavi archeologici',
    type: 'gallery',
    coverImage: '/images/SCAVI/Saturo. Acropoli.Resti del tempio.jpg',
    icon: ImageIcon,
    mediaFiles: [
      '/images/SCAVI/Saturo. Acropoli.Resti del tempio.jpg',
      '/images/SCAVI/Saturo. La capanna a.jpg',
      '/images/SCAVI/Saturo. Santuario della Sorgente.jpg',
      '/images/SCAVI/Saturo. Villa romana, settore occidentale. Area delle terme.jpg',
      '/images/SCAVI/Saturo. Villa romana, settore occidentale. Area delle terme.2.jpg',
      '/images/SCAVI/Saturo. Villa romana, settore occidentale. Area delle terme3.jpg',
      '/images/SCAVI/Saturo. Villa romana, settore occidentale. Aula triabsidata.jpg',
      '/images/SCAVI/Saturo. Villa romana, settore occidentale. Aula triabsidata2.jpg',
      '/images/SCAVI/Saturo. Villa romana, settore occidentale.jpg',
      '/images/SCAVI/settore occidentale_sala_triabsidata.JPG',
      '/images/SCAVI/settore occidentale_fotopiano sala_triabsidata.jpg'
    ]
  },
  {
    id: 'ricostruzioni',
    name: 'Ricostruzioni 3D',
    type: 'gallery',
    coverImage: '/images/RICOSTRUZIONI/Villa romana.jpg',
    icon: Compass,
    mediaFiles: [
      '/images/RICOSTRUZIONI/Villa romana.jpg',
      '/images/RICOSTRUZIONI/Villa romana 2.jpg',
      '/images/RICOSTRUZIONI/Acropoli, tempio.jpg',
      '/images/RICOSTRUZIONI/Villaggio preistorico.png',
      '/images/RICOSTRUZIONI/Villa romana, quadriportico.jpg',
      '/images/RICOSTRUZIONI/Villa romana, ambienti del quadriportico.jpg',
      '/images/RICOSTRUZIONI/Villa romana, triclinium.jpg',
      '/images/RICOSTRUZIONI/Cisterna.jpg',
      '/images/RICOSTRUZIONI/Pars rustica della Villa.jpg'
    ]
  },
  {
    id: 'rilievi',
    name: 'Rilievi grafici',
    type: 'gallery',
    coverImage: '/images/RILIEVI/S01.jpg',
    icon: Map,
    mediaFiles: [
      '/images/RILIEVI/S01.jpg',
      '/images/RILIEVI/S02.jpg',
      '/images/RILIEVI/S03.jpg',
      '/images/RILIEVI/S04.jpg',
      '/images/RILIEVI/S05.jpg',
      '/images/RILIEVI/S06.jpg',
      '/images/RILIEVI/S07.jpg',
      '/images/RILIEVI/S08.jpg',
      '/images/RILIEVI/S09.jpg',
      '/images/RILIEVI/S10.jpg'
    ]
  }
];

const CategoryGrid: React.FC<CategoryGridProps> = ({ onCategorySelect }) => {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 mt-6 sm:mt-10 pb-6">
      {/* Dynamic Visual Section Title */}
      <motion.h2 
        className="text-white font-serif font-semibold text-lg sm:text-xl md:text-2xl mb-4 sm:mb-6 tracking-wider uppercase opacity-90 drop-shadow-sm flex items-center justify-center gap-2"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <span className="w-8 h-[1px] bg-saturo-accent/50 hidden xs:inline-block"></span>
        Esplora il Parco
        <span className="w-8 h-[1px] bg-saturo-accent/50 hidden xs:inline-block"></span>
      </motion.h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 justify-center">
        {CATEGORIES.map((category, idx) => {
          const Icon = category.icon;
          
          return (
            <motion.div
              key={category.id}
              className="flex flex-col items-center group cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 + idx * 0.1 }}
              onClick={() => onCategorySelect(category)}
            >
              {/* Card visual wrapper */}
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-lg border border-white/10 bg-zinc-900/40 backdrop-blur-sm group-hover:border-saturo-accent/50 group-hover:shadow-saturo-accent/10 transition-all duration-300">
                {/* Visual Category Image */}
                <img
                  src={encodeURI(category.coverImage)}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                />

                {/* Glass/Dark overlay with interactive hover icon */}
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-300 flex items-center justify-center">
                  <motion.div
                    className="p-3 bg-saturo-primary/80 border border-white/20 text-white rounded-full opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300 shadow-xl"
                  >
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </motion.div>
                </div>
              </div>

              {/* Title / Name below image */}
              <span 
                className="mt-2 sm:mt-3 text-xs sm:text-sm font-sans font-semibold tracking-wide text-white/95 group-hover:text-saturo-accent transition-colors duration-300 uppercase select-none text-center"
              >
                {category.name}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryGrid;
