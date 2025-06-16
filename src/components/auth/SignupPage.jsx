
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { ArrowLeft } from "lucide-react";
import SignupForm from "./SignupForm";

const SignupPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = (formData, resetForm) => {
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const userData = {
        id: Date.now().toString(),
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        accountType: formData.accountType,
        dateOfBirth: formData.dateOfBirth,
        phone: formData.phone,
        address: formData.address,
        avatar: null,
        sellerInfo:
          formData.accountType === "seller"
            ? {
                dailyOrderVolume: formData.dailyOrderVolume,
                businessOpenTime: formData.businessOpenTime,
                businessCloseTime: formData.businessCloseTime,
              }
            : null,
      };

      login(userData);
      setLoading(false);
      navigate("/user/home");
      if (typeof resetForm === "function") resetForm({});
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl sm:max-w-2xl mx-auto">
        <div className="text-center mb-6 sm:mb-8">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4 sm:mb-6 text-sm sm:text-base"
          >
            <ArrowLeft size={18} className="mr-1 sm:mr-2" />
            Back to Home
          </button>

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-sm sm:text-base text-gray-600">Join our marketplace today</p>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6 lg:p-8">
          <SignupForm onSubmit={handleSubmit} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
