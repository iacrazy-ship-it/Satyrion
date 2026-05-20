import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX } from 'lucide-react';

export type MediaType = 'video' | 'gallery';

interface MediaViewerProps {
  isOpen: boolean;
  onClose: () => void;
  type: MediaType;
  title: string;
  files: string[];
  initialIndex?: number;
}

const CAPTION_MAP: Record<string, string> = {
  '05_Inv.120341 -Giara a staffa Micenea.JPG': 'Giara a staffa micenea (Inv. 120341) - Testimonianza dei primissimi contatti commerciali dell\'Età del Bronzo',
  '18_Inv. 187119 - Aryballos piriforme protocorinzio.JPG': 'Aryballos piriforme protocorinzio (Inv. 187119) - Pregiato vaso da unguenti dell\'VIII sec. a.C.',
  '21_Lekythos attica sc.36.8.JPG': 'Lekythos attica (sc.36.8) - Vaso funerario a figure nere finemente decorato',
  '24_Kylix.JPG': 'Kylix greca - Tipica coppa da vino utilizzata durante i simposi nell\'antica Saturo',
  '29_Inv. 187010 - Terracotta policroma-figura femminile policroma.JPG': 'Terracotta policroma (Inv. 187010) - Statuina votiva femminile ricca di dettagli cromatici',
  '33_Inv 187017 - Hydria Protoitaliota.JPG': 'Hydria protoitaliota (Inv. 187017) - Grande vaso per acqua con decorazioni geometrico-figurative',
  'Saturo. Acropoli.Resti del tempio.jpg': 'Saturo, Acropoli - Resti delle fondamenta del tempio greco arcaico',
  'Saturo. La capanna a.jpg': 'Saturo - Tracce delle fondamenta del villaggio a capanne dell\'Età del Bronzo',
  'Saturo. Santuario della Sorgente.jpg': 'Saturo, Santuario della Sorgente - Luogo di culto dell\'acqua sorgiva',
  'Saturo. Villa romana, settore occidentale. Area delle terme.2.jpg': 'Saturo, Villa Romana - Canalizzazioni termali nel settore occidentale',
  'Saturo. Villa romana, settore occidentale. Area delle terme.jpg': 'Saturo, Villa Romana - Calidarium e frigidarium dell\'area termale',
  'Saturo. Villa romana, settore occidentale. Area delle terme3.jpg': 'Saturo, Villa Romana - Resti strutturali dei vani riscaldati',
  'Saturo. Villa romana, settore occidentale. Aula triabsidata.jpg': 'Saturo, Villa Romana - L\'aula triabsidata di rappresentanza',
  'Saturo. Villa romana, settore occidentale. Aula triabsidata2.jpg': 'Saturo, Villa Romana - Resti di pavimentazione musiva',
  'Saturo. Villa romana, settore occidentale.jpg': 'Saturo, Villa Romana - Strutture murarie del settore occidentale',
  'settore occidentale_fotopiano sala_triabsidata.jpg': 'Fotopiano aereo zenitale della sala triabsidata',
  'settore occidentale_sala_triabsidata.JPG': 'Vano principale della sala triabsidata',
  'Acropoli, tempio.jpg': 'Ricostruzione ideale 3D dell\'Acropoli di Saturo',
  'Cisterna.jpg': 'Modello tridimensionale della cisterna romana ipogea',
  'Pars rustica della Villa.jpg': 'Ricostruzione della Pars Rustica della Villa romana',
  'Villa romana 2.jpg': 'Modello 3D della Villa romana - Panoramica dall\'alto',
  'Villa romana, ambienti del quadriportico.jpg': 'Modello 3D degli ambienti del quadriportico interno',
  'Villa romana, quadriportico.jpg': 'Ricostruzione virtuale del quadriportico colonnato',
  'Villa romana, triclinium.jpg': 'Ricostruzione del Triclinium - sala da pranzo romana',
  'Villa romana.jpg': 'Ricostruzione esterna della Villa romana imperiale',
  'Villaggio preistorico.png': 'Ricostruzione del villaggio dell\'Età del Bronzo e del Ferro',
  'S01.jpg': 'Rilievo topografico - Tavola S01 - Planimetria del promontorio di Saturo',
  'S02.jpg': 'Rilievo topografico - Tavola S02 - Strutture del settore Acropoli',
  'S03.jpg': 'Rilievo topografico - Tavola S03 - Planimetria delle terme',
  'S04.jpg': 'Rilievo topografico - Tavola S04 - Prospetti murari occidentali',
  'S05.jpg': 'Rilievo topografico - Tavola S05 - Cisterne e canalizzazioni',
  'S06.jpg': 'Rilievo topografico - Tavola S06 - Sezioni stratigrafiche',
  'S07.jpg': 'Rilievo topografico - Tavola S07 - Santuario della Sorgente',
  'S08.jpg': 'Rilievo topografico - Tavola S08 - Strutture tardo-antiche',
  'S09.jpg': 'Rilievo topografico - Tavola S09 - Modanature del tempio',
  'S10.jpg': 'Rilievo topografico - Tavola S10 - Distribuzione reperti età del Bronzo',
};

const getCaption = (filePath: string): string => {
  const filename = filePath.split('/').pop() || filePath;
  if (CAPTION_MAP[filename]) return CAPTION_MAP[filename];
  const withoutExt = filename.substring(0, filename.lastIndexOf('.')) || filename;
  const cleaned = withoutExt.replace(/^\d+_+/, '').replace(/_|-/g, ' ').replace(/\s+/g, ' ').trim();
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
};

/* ─────────────────────────────────────────────
   Simple CSS-based image slider (no Framer Motion).
   Uses a key-change + CSS fadeIn to show each image.
───────────────────────────────────────────── */
const GallerySlider: React.FC<{
  files: string[];
  currentIndex: number;
  onPrev: () => void;
  onNext: () => void;
}> = ({ files, currentIndex, onPrev, onNext }) => {
  const src = files[currentIndex] ?? '';

  return (
    <div
      style={{
        width: '100%',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        padding: '24px 64px',
        boxSizing: 'border-box',
        minHeight: 0,
      }}
    >
      {/* Image box */}
      <div
        style={{
          width: '100%',
          height: '55vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <img
          key={src}
          src={src}
          alt={getCaption(src)}
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'contain',
            borderRadius: '12px',
            display: 'block',
            animation: 'gallery-fadein 0.35s ease',
          }}
          draggable={false}
        />
      </div>

      {/* Prev / Next arrows */}
      {files.length > 1 && (
        <>
          <button
            onClick={onPrev}
            aria-label="Precedente"
            style={{
              position: 'absolute',
              left: 8,
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 20,
              padding: 12,
              background: 'rgba(0,0,0,0.6)',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: '50%',
              color: '#fff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.2s',
            }}
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={onNext}
            aria-label="Successivo"
            style={{
              position: 'absolute',
              right: 8,
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 20,
              padding: 12,
              background: 'rgba(0,0,0,0.6)',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: '50%',
              color: '#fff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.2s',
            }}
          >
            <ChevronRight size={22} />
          </button>
        </>
      )}

      {/* Keyframe injected once */}
      <style>{`
        @keyframes gallery-fadein {
          from { opacity: 0; transform: scale(0.97); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

/* ─────────────────────────────────────────────
   Main MediaViewer component
───────────────────────────────────────────── */
const MediaViewer: React.FC<MediaViewerProps> = ({
  isOpen,
  onClose,
  type,
  title,
  files,
  initialIndex = 0,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(initialIndex);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setCurrentIndex(initialIndex);
    setIsPlaying(true);
  }, [initialIndex, isOpen]);

  // Auto-advance gallery every 5 s
  useEffect(() => {
    if (!isOpen || type !== 'gallery' || files.length <= 1) return;
    const id = setInterval(() => setCurrentIndex((p) => (p + 1) % files.length), 5000);
    return () => clearInterval(id);
  }, [isOpen, type, files.length]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') { onClose(); return; }
      if (type !== 'gallery') return;
      if (e.key === 'ArrowRight') setCurrentIndex((p) => (p + 1) % files.length);
      if (e.key === 'ArrowLeft')  setCurrentIndex((p) => (p - 1 + files.length) % files.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, type, files.length, onClose]);

  const handleNext = useCallback(() => setCurrentIndex((p) => (p + 1) % files.length), [files.length]);
  const handlePrev = useCallback(() => setCurrentIndex((p) => (p - 1 + files.length) % files.length), [files.length]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    isPlaying ? videoRef.current.pause() : videoRef.current.play().catch(console.error);
    setIsPlaying((p) => !p);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted((p) => !p);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(0,0,0,0.95)',
            backdropFilter: 'blur(8px)',
            zIndex: 50,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
          }}
          onClick={onClose}
        >
          <motion.div
            key="panel"
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 24 }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              background: 'rgba(10,10,14,0.9)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 16,
              boxShadow: '0 25px 80px rgba(0,0,0,0.8)',
              maxWidth: 960,
              width: '100%',
              maxHeight: '92vh',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            {/* ── Header ── */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '14px 20px',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              background: 'rgba(255,255,255,0.03)',
              flexShrink: 0,
            }}>
              <h3 style={{ color: '#fff', fontFamily: 'serif', fontWeight: 600, fontSize: 16, textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0 }}>
                {title}
              </h3>
              <button
                onClick={onClose}
                aria-label="Chiudi"
                style={{
                  padding: 8, background: 'rgba(255,255,255,0.1)', border: 'none',
                  borderRadius: '50%', color: '#fff', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'background 0.2s',
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* ── Content ── */}
            <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
              {type === 'video' ? (
                /* VIDEO PLAYER */
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 12, position: 'relative' }}>
                  <video
                    ref={videoRef}
                    src={files[0]}
                    style={{ maxWidth: '100%', maxHeight: '66vh', borderRadius: 10, display: 'block', objectFit: 'contain' }}
                    autoPlay
                    loop
                    playsInline
                    onClick={togglePlay}
                  />
                  <div style={{
                    position: 'absolute', bottom: 20, left: 20, right: 20,
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    padding: '8px 16px', borderRadius: 12, zIndex: 20,
                  }}>
                    <button onClick={togglePlay} style={{ padding: 8, background: '#b91c1c', border: 'none', borderRadius: 8, color: '#fff', cursor: 'pointer', display: 'flex' }}>
                      {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                    </button>
                    <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12, fontFamily: 'sans-serif' }}>
                      Parco Archeologico di Saturo
                    </span>
                    <button onClick={toggleMute} style={{ padding: 8, background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: 8, color: '#fff', cursor: 'pointer', display: 'flex' }}>
                      {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                    </button>
                  </div>
                </div>
              ) : (
                /* GALLERY SLIDER — pure CSS, no Framer Motion */
                <GallerySlider
                  files={files}
                  currentIndex={currentIndex}
                  onPrev={handlePrev}
                  onNext={handleNext}
                />
              )}
            </div>

            {/* ── Caption bar (gallery only) ── */}
            {type === 'gallery' && files.length > 0 && (
              <div style={{
                padding: '12px 20px',
                background: 'rgba(0,0,0,0.5)',
                borderTop: '1px solid rgba(255,255,255,0.06)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                gap: 12, flexShrink: 0,
              }}>
                <p style={{ color: '#fff', fontFamily: 'sans-serif', fontSize: 14, margin: 0, lineHeight: 1.5, flex: 1 }}>
                  {getCaption(files[currentIndex])}
                </p>
                <span style={{
                  flexShrink: 0, padding: '3px 12px',
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: 999, color: 'rgba(255,255,255,0.85)',
                  fontSize: 12, fontFamily: 'sans-serif', fontWeight: 600, whiteSpace: 'nowrap',
                }}>
                  {currentIndex + 1} / {files.length}
                </span>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MediaViewer;
