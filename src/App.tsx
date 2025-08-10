import { useEffect, useState } from 'react';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import DescriptionSection from './components/DescriptionSection';
import PDFViewer from './components/PDFViewer';

function App() {
  const [selectedPdf, setSelectedPdf] = useState<string>('');
  const [isPdfOpen, setIsPdfOpen] = useState<boolean>(false);
  const [isItalian, setIsItalian] = useState<boolean>(true);

  const handlePdfSelect = (pdfPath: string, italian: boolean = true) => {
    setSelectedPdf(pdfPath);
    setIsItalian(italian);
    setIsPdfOpen(true);
  };

  const handleClosePdf = () => {
    setIsPdfOpen(false);
  };

  // Auto scroll to top after 10s of inactivity (disabled when PDF modal is open)
  useEffect(() => {
    if (isPdfOpen) return; // disable while reading PDFs

    const INACTIVITY_MS = 10000;
    let timeoutId: number | undefined;

    const resetTimer = () => {
      if (timeoutId) window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, INACTIVITY_MS);
    };

    // Initialize timer and bind listeners
    resetTimer();
    const events: (keyof WindowEventMap)[] = [
      'touchstart',
      'touchmove',
      'pointerdown',
      'pointermove',
      'mousemove',
      'keydown',
      'wheel',
      'scroll',
    ];
    events.forEach((ev) => window.addEventListener(ev, resetTimer, { passive: true }));

    return () => {
      if (timeoutId) window.clearTimeout(timeoutId);
      events.forEach((ev) => window.removeEventListener(ev, resetTimer as EventListener));
    };
  }, [isPdfOpen]);

  return (
    <div className="min-h-screen bg-saturo-light">
      <HeroSection onPdfSelect={(path, italian) => handlePdfSelect(path, italian)} />
      <AboutSection />
      <DescriptionSection />
      {isPdfOpen && (
        <PDFViewer 
          pdfUrl={selectedPdf} 
          isOpen={isPdfOpen} 
          onClose={handleClosePdf} 
          isItalian={isItalian} 
        />
      )}
    </div>
  );
}

export default App;