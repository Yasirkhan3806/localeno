
import React, { useState } from 'react';
import { X, Upload, Camera, CheckCircle } from 'lucide-react';

const IdentityVerificationModal = ({ isOpen, onClose, onVerificationComplete, productName }) => {
  const [step, setStep] = useState(1);
  const [cnicFront, setCnicFront] = useState(null);
  const [cnicBack, setCnicBack] = useState(null);
  const [selfie, setSelfie] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleFileUpload = (file, type) => {
    if (file) {
      const url = URL.createObjectURL(file);
      if (type === 'cnic-front') setCnicFront(url);
      else if (type === 'cnic-back') setCnicBack(url);
      else if (type === 'selfie') setSelfie(url);
    }
  };

  const handleVerify = async () => {
    setIsVerifying(true);
    // Simulate verification process
    setTimeout(() => {
      setIsVerifying(false);
      setStep(3);
      setTimeout(() => {
        onVerificationComplete();
        onClose();
      }, 2000);
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Identity Verification</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <p className="text-gray-600 mb-6">
          To submit a review for "{productName}", please verify your identity first.
        </p>

        {step === 1 && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Step 1: Upload CNIC Photos</h3>
            
            {/* CNIC Front */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CNIC Front Side
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
                {cnicFront ? (
                  <div className="space-y-3">
                    <img src={cnicFront} alt="CNIC Front" className="w-full h-32 object-cover rounded-lg" />
                    <button
                      onClick={() => setCnicFront(null)}
                      className="text-red-600 text-sm hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div>
                    <Camera className="mx-auto text-gray-400 mb-2" size={32} />
                    <p className="text-gray-600 mb-4">Upload front side of your CNIC</p>
                    <label className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors">
                      Choose File
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e.target.files[0], 'cnic-front')}
                        className="hidden"
                      />
                    </label>
                  </div>
                )}
              </div>
            </div>

            {/* CNIC Back */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CNIC Back Side
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
                {cnicBack ? (
                  <div className="space-y-3">
                    <img src={cnicBack} alt="CNIC Back" className="w-full h-32 object-cover rounded-lg" />
                    <button
                      onClick={() => setCnicBack(null)}
                      className="text-red-600 text-sm hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div>
                    <Camera className="mx-auto text-gray-400 mb-2" size={32} />
                    <p className="text-gray-600 mb-4">Upload back side of your CNIC</p>
                    <label className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors">
                      Choose File
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e.target.files[0], 'cnic-back')}
                        className="hidden"
                      />
                    </label>
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              disabled={!cnicFront || !cnicBack}
              className="w-full bg-black text-white py-3 px-6 rounded-xl font-semibold hover:bg-gray-800 hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              Next Step
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Step 2: Take a Selfie</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Selfie for Verification
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
                {selfie ? (
                  <div className="space-y-3">
                    <img src={selfie} alt="Selfie" className="w-full h-48 object-cover rounded-lg" />
                    <button
                      onClick={() => setSelfie(null)}
                      className="text-red-600 text-sm hover:underline"
                    >
                      Retake
                    </button>
                  </div>
                ) : (
                  <div>
                    <Camera className="mx-auto text-gray-400 mb-2" size={48} />
                    <p className="text-gray-600 mb-4">Take a clear selfie for identity verification</p>
                    <label className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors">
                      Take Selfie
                      <input
                        type="file"
                        accept="image/*"
                        capture="user"
                        onChange={(e) => handleFileUpload(e.target.files[0], 'selfie')}
                        className="hidden"
                      />
                    </label>
                  </div>
                )}
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setStep(1)}
                className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleVerify}
                disabled={!selfie || isVerifying}
                className="flex-1 bg-black text-white py-3 px-6 rounded-xl font-semibold hover:bg-gray-800 hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isVerifying ? 'Verifying...' : 'Verify Identity'}
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="text-center space-y-6">
            <CheckCircle className="mx-auto text-green-500" size={64} />
            <h3 className="text-xl font-semibold text-gray-900">Verification Successful!</h3>
            <p className="text-gray-600">
              Your identity has been verified. You can now submit your review.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default IdentityVerificationModal;
