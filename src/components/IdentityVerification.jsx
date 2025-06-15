
import React, { useState } from "react";
import { Camera, Upload, X, Check, AlertCircle } from "lucide-react";

const IdentityVerification = ({ isOpen, onClose, onVerificationComplete }) => {
  const [step, setStep] = useState(1);
  const [verificationData, setVerificationData] = useState({
    cnicFront: null,
    cnicBack: null,
    selfie: null
  });
  const [previewUrls, setPreviewUrls] = useState({
    cnicFront: null,
    cnicBack: null,
    selfie: null
  });
  const [isVerifying, setIsVerifying] = useState(false);

  const handleFileUpload = (type, file) => {
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrls(prev => ({ ...prev, [type]: url }));
      setVerificationData(prev => ({ ...prev, [type]: file }));
    }
  };

  const removeFile = (type) => {
    setPreviewUrls(prev => ({ ...prev, [type]: null }));
    setVerificationData(prev => ({ ...prev, [type]: null }));
  };

  const handleVerification = async () => {
    setIsVerifying(true);
    // Simulate verification process
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsVerifying(false);
    onVerificationComplete(true);
    onClose();
  };

  const isStepComplete = (stepNum) => {
    switch(stepNum) {
      case 1: return verificationData.cnicFront && verificationData.cnicBack;
      case 2: return verificationData.selfie;
      default: return false;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-900 to-black text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Identity Verification</h2>
              <p className="text-gray-300 mt-1">Secure your account with verified identity</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>
          
          {/* Progress Steps */}
          <div className="flex items-center mt-6 space-x-4">
            <div className={`flex items-center space-x-2 ${step >= 1 ? 'text-white' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isStepComplete(1) ? 'bg-green-500' : step === 1 ? 'bg-white text-black' : 'bg-gray-600'}`}>
                {isStepComplete(1) ? <Check size={16} /> : '1'}
              </div>
              <span className="text-sm font-medium">CNIC Documents</span>
            </div>
            <div className="w-8 h-px bg-gray-600"></div>
            <div className={`flex items-center space-x-2 ${step >= 2 ? 'text-white' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isStepComplete(2) ? 'bg-green-500' : step === 2 ? 'bg-white text-black' : 'bg-gray-600'}`}>
                {isStepComplete(2) ? <Check size={16} /> : '2'}
              </div>
              <span className="text-sm font-medium">Selfie Verification</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Upload CNIC Documents</h3>
                <p className="text-gray-600">Please upload clear photos of both sides of your CNIC</p>
              </div>

              {/* CNIC Front */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">CNIC Front Side</label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-gray-400 transition-colors">
                  {previewUrls.cnicFront ? (
                    <div className="relative">
                      <img src={previewUrls.cnicFront} alt="CNIC Front" className="max-h-40 mx-auto rounded-lg" />
                      <button
                        onClick={() => removeFile('cnicFront')}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div>
                      <Camera className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                      <p className="text-gray-600 mb-2">Upload CNIC front side</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload('cnicFront', e.target.files[0])}
                        className="hidden"
                        id="cnic-front"
                      />
                      <label htmlFor="cnic-front" className="bg-gray-900 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-black transition-colors">
                        Choose File
                      </label>
                    </div>
                  )}
                </div>
              </div>

              {/* CNIC Back */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">CNIC Back Side</label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-gray-400 transition-colors">
                  {previewUrls.cnicBack ? (
                    <div className="relative">
                      <img src={previewUrls.cnicBack} alt="CNIC Back" className="max-h-40 mx-auto rounded-lg" />
                      <button
                        onClick={() => removeFile('cnicBack')}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div>
                      <Camera className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                      <p className="text-gray-600 mb-2">Upload CNIC back side</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload('cnicBack', e.target.files[0])}
                        className="hidden"
                        id="cnic-back"
                      />
                      <label htmlFor="cnic-back" className="bg-gray-900 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-black transition-colors">
                        Choose File
                      </label>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Selfie Verification</h3>
                <p className="text-gray-600">Take a clear selfie for identity verification</p>
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">Your Selfie</label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-gray-400 transition-colors">
                  {previewUrls.selfie ? (
                    <div className="relative">
                      <img src={previewUrls.selfie} alt="Selfie" className="max-h-48 mx-auto rounded-lg" />
                      <button
                        onClick={() => removeFile('selfie')}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div>
                      <Camera className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                      <p className="text-gray-600 mb-4">Take a clear selfie</p>
                      <input
                        type="file"
                        accept="image/*"
                        capture="user"
                        onChange={(e) => handleFileUpload('selfie', e.target.files[0])}
                        className="hidden"
                        id="selfie"
                      />
                      <label htmlFor="selfie" className="bg-gray-900 text-white px-6 py-3 rounded-lg cursor-pointer hover:bg-black transition-colors">
                        Take Selfie
                      </label>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start">
                  <AlertCircle className="text-blue-500 mt-0.5 mr-3" size={16} />
                  <div className="text-sm text-blue-800">
                    <p className="font-medium mb-1">Tips for a good selfie:</p>
                    <ul className="list-disc list-inside space-y-1 text-blue-700">
                      <li>Ensure good lighting on your face</li>
                      <li>Look directly at the camera</li>
                      <li>Remove glasses or hat if possible</li>
                      <li>Keep a neutral expression</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => step > 1 ? setStep(step - 1) : onClose()}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            {step > 1 ? 'Previous' : 'Cancel'}
          </button>
          
          <div className="flex items-center space-x-3">
            {step < 2 ? (
              <button
                onClick={() => setStep(2)}
                disabled={!isStepComplete(1)}
                className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next Step
              </button>
            ) : (
              <button
                onClick={handleVerification}
                disabled={!isStepComplete(2) || isVerifying}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {isVerifying ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    <span>Verifying...</span>
                  </>
                ) : (
                  <span>Complete Verification</span>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdentityVerification;
