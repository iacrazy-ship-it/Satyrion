import { useState } from 'react';
import HeroSection, { type PdfLanguage } from './components/HeroSection';
import PDFViewer from './components/PDFViewer';
import MediaViewer, { type MediaType } from './components/MediaViewer';

function App() {
  const [selectedPdf, setSelectedPdf] = useState<string>('');
  const [isPdfOpen, setIsPdfOpen] = useState<boolean>(false);
  const [language, setLanguage] = useState<PdfLanguage>('it');

  // Media Player / Gallery Slider State
  const [isMediaOpen, setIsMediaOpen] = useState<boolean>(false);
  const [mediaType, setMediaType] = useState<MediaType>('video');
  const [mediaTitle, setMediaTitle] = useState<string>('');
  const [mediaFiles, setMediaFiles] = useState<string[]>([]);

  const handlePdfSelect = (pdfPath: string, lang: PdfLanguage = 'it') => {
    setSelectedPdf(pdfPath);
    setLanguage(lang);
    setIsPdfOpen(true);
  };

  const handleClosePdf = () => {
    setIsPdfOpen(false);
  };

  const handleMediaSelect = (type: MediaType, title: string, files: string[]) => {
    setMediaType(type);
    setMediaTitle(title);
    setMediaFiles(files);
    setIsMediaOpen(true);
  };

  const handleCloseMedia = () => {
    setIsMediaOpen(false);
  };

  return (
    <div className="min-h-screen overflow-y-auto overflow-x-hidden">
      <HeroSection 
        onPdfSelect={(path, lang) => handlePdfSelect(path, lang)} 
        onMediaSelect={handleMediaSelect}
      />
      {isPdfOpen && (
        <PDFViewer 
          pdfUrl={selectedPdf} 
          isOpen={isPdfOpen} 
          onClose={handleClosePdf} 
          language={language} 
        />
      )}
      {isMediaOpen && (
        <MediaViewer
          isOpen={isMediaOpen}
          onClose={handleCloseMedia}
          type={mediaType}
          title={mediaTitle}
          files={mediaFiles}
        />
      )}
    </div>
  );
}

export default App;