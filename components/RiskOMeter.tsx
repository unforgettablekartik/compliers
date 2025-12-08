"use client";

import React, { useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Upload, 
  FileText, 
  AlertTriangle, 
  X, 
  Gauge,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Types
type UploadStatus = 'idle' | 'analyzing_gatekeeper' | 'waiting_user_confirmation' | 'analyzing_risk' | 'complete' | 'error';

interface RiskResult {
  is_contract: boolean;
  risk_score: number;
  interpretation: string;
  risk_summary: string;
  key_risks: string[];
}

// Helper function to get interpretation text based on score
const getInterpretation = (score: number): { text: string; color: string } => {
  if (score === 1) return { text: "Excellent", color: "#22c55e" };
  if (score >= 2 && score <= 3) return { text: "Very Good", color: "#84cc16" };
  if (score >= 4 && score <= 5) return { text: "Decent", color: "#eab308" };
  if (score >= 6 && score <= 7) return { text: "High Risk", color: "#f97316" };
  return { text: "Worse", color: "#ef4444" };
};

// Speedometer/Gauge Component
const SpeedometerGauge = ({ score }: { score: number }) => {
  // Display fixed 4/5 rating
  const displayScore = 4;
  const displayMaxScore = 5;
  
  // Calculate interpretation and angle based on the display score mapped to original scale
  // 4/5 translates to 8/10 on the original scale for consistent needle position
  const mappedScore = (displayScore / displayMaxScore) * 10;
  const interpretation = getInterpretation(mappedScore);
  const angle = ((mappedScore - 1) / 9) * 180 - 90; // Maps score 1-10 to -90 to 90 degrees
  
  return (
    <div className="riskmeter-gauge-container">
      <svg viewBox="0 0 200 120" className="riskmeter-gauge-svg">
        {/* Background arc */}
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="12"
          strokeLinecap="round"
        />
        {/* Colored arc segments */}
        <path
          d="M 20 100 A 80 80 0 0 1 56 40"
          fill="none"
          stroke="#22c55e"
          strokeWidth="12"
          strokeLinecap="round"
        />
        <path
          d="M 56 40 A 80 80 0 0 1 100 20"
          fill="none"
          stroke="#84cc16"
          strokeWidth="12"
        />
        <path
          d="M 100 20 A 80 80 0 0 1 144 40"
          fill="none"
          stroke="#eab308"
          strokeWidth="12"
        />
        <path
          d="M 144 40 A 80 80 0 0 1 165 60"
          fill="none"
          stroke="#f97316"
          strokeWidth="12"
        />
        <path
          d="M 165 60 A 80 80 0 0 1 180 100"
          fill="none"
          stroke="#ef4444"
          strokeWidth="12"
          strokeLinecap="round"
        />
        {/* Needle */}
        <motion.g
          initial={{ rotate: -90 }}
          animate={{ rotate: angle }}
          transition={{ type: "spring", stiffness: 60, damping: 15 }}
          style={{ transformOrigin: "100px 100px" }}
        >
          <line
            x1="100"
            y1="100"
            x2="100"
            y2="35"
            stroke="#111827"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="100" cy="100" r="8" fill="#111827" />
        </motion.g>
      </svg>
      <div className="riskmeter-gauge-score">
        <span className="riskmeter-score-value" style={{ color: interpretation.color }}>
          {displayScore}
        </span>
        <span className="riskmeter-score-label">/{displayMaxScore}</span>
      </div>
      <div className="riskmeter-interpretation" style={{ color: interpretation.color }}>
        {interpretation.text}
      </div>
    </div>
  );
};

// Gatekeeper Modal Component
const GatekeeperModal = ({ 
  isOpen, 
  onClose 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="riskmeter-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="riskmeter-modal"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="riskmeter-modal-header">
              <AlertTriangle className="riskmeter-modal-icon-warning" />
              <button onClick={onClose} className="riskmeter-modal-close">
                <X size={20} />
              </button>
            </div>
            <h3 className="riskmeter-modal-title">Not a Legal Contract</h3>
            <p className="riskmeter-modal-text">
              The attached document does not seem to be a legal contract.
            </p>
            <div className="riskmeter-modal-buttons">
              <Button 
                className="riskmeter-btn-primary" 
                onClick={onClose}
              >
                Analyze another document
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};



// Main RiskOMeter Component
export default function RiskOMeter() {
  const router = useRouter();
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>('idle');
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<RiskResult | null>(null);
  const [showGatekeeperModal, setShowGatekeeperModal] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // API call to analyze contract
  const analyzeContract = async (uploadedFile: File, skipGatekeeper = false): Promise<RiskResult> => {
    const formData = new FormData();
    formData.append('file', uploadedFile);
    if (skipGatekeeper) {
      formData.append('skip_gatekeeper', 'true');
    }

    const response = await fetch('/api/analyze-contract', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to analyze contract');
    }

    return response.json();
  };

  const handleFileSelect = useCallback(async (selectedFile: File) => {
    // Validate file type
    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!validTypes.includes(selectedFile.type)) {
      setErrorMessage('Please upload a PDF or DOCX file.');
      setUploadStatus('error');
      return;
    }

    setErrorMessage(null);
    setFile(selectedFile);
    setUploadStatus('analyzing_gatekeeper');
    
    try {
      const apiResult = await analyzeContract(selectedFile, false);
      
      if (!apiResult.is_contract) {
        setUploadStatus('waiting_user_confirmation');
        setShowGatekeeperModal(true);
      } else {
        setResult(apiResult);
        setUploadStatus('complete');
      }
    } catch (error) {
      console.error('Error analyzing document:', error);
      setErrorMessage(error instanceof Error ? error.message : 'Failed to analyze document. Please try again.');
      setUploadStatus('error');
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFileSelect(droppedFile);
    }
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      handleFileSelect(selectedFile);
    }
  }, [handleFileSelect]);

  const handleGatekeeperCancel = () => {
    setShowGatekeeperModal(false);
    resetUpload();
  };

  const resetUpload = () => {
    setUploadStatus('idle');
    setFile(null);
    setResult(null);
    setErrorMessage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleIAmIn = () => {
    router.push('/book-a-call');
  };

  return (
    <div className="riskmeter-container">
      <AnimatePresence mode="wait">
        {/* Idle State - Upload Zone */}
        {uploadStatus === 'idle' && (
          <motion.div
            key="upload"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="riskmeter-upload-zone-wrapper"
          >
            <div className="riskmeter-intro">
              <Gauge className="riskmeter-intro-icon" />
              <h3 className="riskmeter-intro-title">RiskOMeter</h3>
              <p className="riskmeter-intro-text">
                Risk assessment of your legal contract in a minute.
              </p>
            </div>
            <div
              className={`riskmeter-upload-zone ${isDragOver ? 'riskmeter-drag-over' : ''}`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={handleInputChange}
                className="riskmeter-file-input"
              />
              <Upload className="riskmeter-upload-icon" />
              <p className="riskmeter-upload-text">
                Drag & drop your contract here
              </p>
              <p className="riskmeter-upload-subtext">
                or click to browse
              </p>
              <p className="riskmeter-upload-subtext">
                (best file types: doc/docx)
              </p>
            </div>
          </motion.div>
        )}

        {/* Analyzing States */}
        {(uploadStatus === 'analyzing_gatekeeper' || uploadStatus === 'analyzing_risk') && (
          <motion.div
            key="analyzing"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="riskmeter-analyzing"
          >
            <Loader2 className="riskmeter-loader" />
            <p className="riskmeter-analyzing-text">
              {uploadStatus === 'analyzing_gatekeeper' 
                ? 'Verifying document...' 
                : 'Analyzing risk factors...'}
            </p>
            {file && (
              <div className="riskmeter-file-info">
                <FileText size={16} />
                <span>{file.name}</span>
              </div>
            )}
          </motion.div>
        )}

        {/* Complete State - Results Dashboard */}
        {uploadStatus === 'complete' && result && (
          <motion.div
            key="complete"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="riskmeter-results"
          >
            <SpeedometerGauge score={result.risk_score} />
            
            {result.risk_summary && (
              <p className="riskmeter-risk-summary">{result.risk_summary}</p>
            )}
            
            {result.key_risks && result.key_risks.length > 0 && (
              <div className="riskmeter-key-risks">
                <p className="riskmeter-key-risks-title">Key Risks:</p>
                <ul className="riskmeter-key-risks-list">
                  {result.key_risks.slice(0, 3).map((risk, index) => (
                    <li key={index}>{risk}</li>
                  ))}
                </ul>
                <Link href="/book-a-call" className="riskmeter-detailed-report-link">
                  Connect to get a detailed risk assessment report
                </Link>
              </div>
            )}
            
            <div className="riskmeter-cta-box">
              <p className="riskmeter-cta-text">
                Get the best version of legal contracts from The Compliers
              </p>
              <div className="riskmeter-buttons-group">
                <a 
                  href="mailto:connect@thecompliers.com?subject=Risk Points for Contract"
                  className="riskmeter-btn-email"
                  style={{ textDecoration: 'none', display: 'inline-block' }}
                >
                  Email Risk Points
                </a>
                <Button 
                  className="riskmeter-btn-cta" 
                  onClick={handleIAmIn}
                >
                  Talk to Us
                </Button>
              </div>
              <Link href="/book-a-call" className="riskmeter-get-detailed-report">
                Get A Detailed Report
                <span className="riskmeter-report-description">
                  Pre-review inputs on Email for Rs. 99/- per page
                </span>
              </Link>
            </div>

            <button 
              onClick={resetUpload}
              className="riskmeter-reset-link"
            >
              Analyze another document
            </button>
          </motion.div>
        )}

        {/* Error State */}
        {uploadStatus === 'error' && (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="riskmeter-error"
          >
            <AlertTriangle className="riskmeter-error-icon" />
            <p className="riskmeter-error-text">
              {errorMessage || 'Something went wrong. Please try again.'}
            </p>
            <Button 
              className="riskmeter-btn-primary" 
              onClick={resetUpload}
            >
              Try Again
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modals */}
      <GatekeeperModal 
        isOpen={showGatekeeperModal}
        onClose={handleGatekeeperCancel}
      />
    </div>
  );
}
