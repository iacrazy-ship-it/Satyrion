import { useState } from 'react';
import HeroSection, { type PdfLanguage } from './components/HeroSection';
import PDFViewer from './components/PDFViewer';

function App() {
  const [selectedPdf, setSelectedPdf] = useState<string>('');
  const [isPdfOpen, setIsPdfOpen] = useState<boolean>(false);
  const [language, setLanguage] = useState<PdfLanguage>('it');

  const handlePdfSelect = (pdfPath: string, lang: PdfLanguage = 'it') => {
    setSelectedPdf(pdfPath);
    setLanguage(lang);
    setIsPdfOpen(true);
  };

  const handleClosePdf = () => {
    setIsPdfOpen(false);
  };

  return (
    <div className="min-h-screen overflow-hidden">
      <HeroSection onPdfSelect={(path, lang) => handlePdfSelect(path, lang)} />
      {isPdfOpen && (
        <PDFViewer 
          pdfUrl={selectedPdf} 
          isOpen={isPdfOpen} 
          onClose={handleClosePdf} 
          language={language} 
        />
      )}
    </div>
  );
}

export default App;