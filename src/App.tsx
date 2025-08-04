import React, { useState } from 'react';
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