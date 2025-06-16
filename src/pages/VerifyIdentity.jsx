
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, Upload, X, Check, AlertCircle, ArrowLeft } from "lucide-react";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

const VerifyIdentity = () => {
  const navigate = useNavigate();
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
    alert("Identity verification completed successfully!");
    navigate("/");
  };

  const isStepComplete = (stepNum) => {
    switch(stepNum) {
      case 1: return verificationData.cnicFront && verificationData.cnicBack;
      case 2: return verificationData.selfie;
      default: return false;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Home
        </button>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-gray-900 to-black text-white p-6">
            <h1 className="text-3xl font-bold mb-2">Identity Verification</h1>
            <p className="text-gray-300">Secure your account with verified identity</p>
            
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
          <div className="p-8">
            {step === 1 && (
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">Upload CNIC Documents</h2>
                  <p className="text-gray-600">Please upload clear photos of both sides of your CNIC</p>
                </div>

                {/* CNIC Front */}
                <div className="space-y-3">
                  <label className="block text-lg font-medium text-gray-700">CNIC Front Side</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-gray-400 transition-colors">
                    {previewUrls.cnicFront ? (
                      <div className="relative">
                        <img src={previewUrls.cnicFront} alt="CNIC Front" className="max-h-48 mx-auto rounded-lg" />
                        <button
                          onClick={() => removeFile('cnicFront')}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <div>
                        <Camera className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                        <p className="text-gray-600 mb-4 text-lg">Upload CNIC front side</p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload('cnicFront', e.target.files[0])}
                          className="hidden"
                          id="cnic-front"
                        />
                        <label htmlFor="cnic-front" className="bg-gray-900 text-white px-6 py-3 rounded-lg cursor-pointer hover:bg-black transition-colors text-lg">
                          Choose File
                        </label>
                      </div>
                    )}
                  </div>
                </div>

                {/* CNIC Back */}
                <div className="space-y-3">
                  <label className="block text-lg font-medium text-gray-700">CNIC Back Side</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-gray-400 transition-colors">
                    {previewUrls.cnicBack ? (
                      <div className="relative">
                        <img src={previewUrls.cnicBack} alt="CNIC Back" className="max-h-48 mx-auto rounded-lg" />
                        <button
                          onClick={() => removeFile('cnicBack')}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <div>
                        <Camera className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                        <p className="text-gray-600 mb-4 text-lg">Upload CNIC back side</p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload('cnicBack', e.target.files[0])}
                          className="hidden"
                          id="cnic-back"
                        />
                        <label htmlFor="cnic-back" className="bg-gray-900 text-white px-6 py-3 rounded-lg cursor-pointer hover:bg-black transition-colors text-lg">
                          Choose File
                        </label>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">Selfie Verification</h2>
                  <p className="text-gray-600">Take a clear selfie for identity verification</p>
                </div>

                <div className="space-y-3">
                  <label className="block text-lg font-medium text-gray-700">Your Selfie</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-gray-400 transition-colors">
                    {previewUrls.selfie ? (
                      <div className="relative">
                        <img src={previewUrls.selfie} alt="Selfie" className="max-h-64 mx-auto rounded-lg" />
                        <button
                          onClick={() => removeFile('selfie')}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <div>
                        <Camera className="mx-auto h-20 w-20 text-gray-400 mb-6" />
                        <p className="text-gray-600 mb-6 text-lg">Take a clear selfie</p>
                        <input
                          type="file"
                          accept="image/*"
                          capture="user"
                          onChange={(e) => handleFileUpload('selfie', e.target.files[0])}
                          className="hidden"
                          id="selfie"
                        />
                        <label htmlFor="selfie" className="bg-gray-900 text-white px-8 py-4 rounded-lg cursor-pointer hover:bg-black transition-colors text-lg">
                          Take Selfie
                        </label>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <div className="flex items-start">
                    <AlertCircle className="text-blue-500 mt-1 mr-4" size={20} />
                    <div className="text-sm text-blue-800">
                      <p className="font-medium mb-2">Tips for a good selfie:</p>
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
          <div className="bg-gray-50 px-8 py-6 flex items-center justify-between">
            <button
              onClick={() => step > 1 ? setStep(step - 1) : navigate("/")}
              className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              {step > 1 ? 'Previous' : 'Cancel'}
            </button>
            
            <div className="flex items-center space-x-4">
              {step < 2 ? (
                <button
                  onClick={() => setStep(2)}
                  disabled={!isStepComplete(1)}
                  className="bg-gray-900 text-white px-8 py-3 rounded-lg hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next Step
                </button>
              ) : (
                <button
                  onClick={handleVerification}
                  disabled={!isStepComplete(2) || isVerifying}
                  className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {isVerifying ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
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

      <Footer />
    </div>
  );
};

export default VerifyIdentity;
