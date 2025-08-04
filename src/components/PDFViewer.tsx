import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';

interface PDFViewerProps {
  pdfUrl: string;
  isOpen: boolean;
  onClose: () => void;
  isItalian: boolean;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ pdfUrl, isOpen, onClose, isItalian }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-saturo-secondary/95 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white rounded-2xl shadow-2xl max-w-6xl max-h-[90vh] w-full flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b bg-saturo-primary">
              <h3 className="text-white font-serif font-semibold text-lg">
                {isItalian ? 'Guida del Parco Archeologico di Saturo' : 'Saturo Archaeological Park Guide'}
              </h3>
              <button
                onClick={onClose}
                className="p-2 bg-white text-saturo-primary hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* PDF Content */}
            <div className="flex-1 overflow-hidden">
              <iframe
                src={`${pdfUrl}#toolbar=1&navpanes=1&scrollbar=1&statusbar=0&menubar=0&download=0&print=0`}
                className="w-full h-full border-0"
                title={isItalian ? 'Guida PDF Italiano' : 'PDF Guide English'}
                style={{ minHeight: '70vh' }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PDFViewer;