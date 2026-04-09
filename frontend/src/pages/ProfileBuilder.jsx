import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ArrowLeft, ArrowRight, SkipForward, CheckCircle2 } from 'lucide-react';

export default function ProfileBuilder() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    category: '',
    income: '',
    education: ''
  });

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else {
      // Complete Profile -> Discovery Hub
      navigate('/search', { state: { fromProfile: true } });
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSkip = () => {
    navigate('/search', { state: { skippedProfile: true } });
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6 animate-fade-in relative">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Personal Details</h2>
              <p className="text-navy-300">Let's start with your category/caste to find tailored opportunities.</p>
            </div>
            <div className="space-y-4">
              {['General', 'SC', 'ST', 'OBC'].map((cat) => (
                <label key={cat} className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${formData.category === cat ? 'border-emerald-500 bg-emerald-500/10' : 'border-navy-700 bg-navy-800/50 hover:bg-navy-800'}`}>
                  <input
                    type="radio"
                    name="category"
                    value={cat}
                    checked={formData.category === cat}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="hidden"
                  />
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-4 ${formData.category === cat ? 'border-emerald-500' : 'border-navy-500'}`}>
                    {formData.category === cat && <div className="w-3 h-3 bg-emerald-500 rounded-full" />}
                  </div>
                  <span className="text-lg text-white font-medium">{cat}</span>
                </label>
              ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6 animate-fade-in relative">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Financial Information</h2>
              <p className="text-navy-300">Many scholarships are income-based. What is your family's annual income?</p>
            </div>
            <div className="space-y-4">
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-navy-400 font-semibold">₹</span>
                <input
                  type="number"
                  placeholder="e.g. 500000"
                  value={formData.income}
                  onChange={(e) => setFormData({...formData, income: e.target.value})}
                  className="w-full bg-navy-800/80 border border-navy-700 text-white rounded-xl pl-10 pr-4 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                />
              </div>
              <p className="text-sm text-navy-400 mt-2 text-center">It's okay to provide an estimate.</p>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6 animate-fade-in relative">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Academic Profile</h2>
              <p className="text-navy-300">What is your current education level?</p>
            </div>
            <div className="space-y-4">
              {['10th Pass', '12th Pass', 'Graduate', 'Post-Graduate'].map((edu) => (
                <label key={edu} className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all ${formData.education === edu ? 'border-emerald-500 bg-emerald-500/10' : 'border-navy-700 bg-navy-800/50 hover:bg-navy-800'}`}>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="education"
                      value={edu}
                      checked={formData.education === edu}
                      onChange={(e) => setFormData({...formData, education: e.target.value})}
                      className="hidden"
                    />
                    <span className="text-lg text-white font-medium">{edu}</span>
                  </div>
                  {formData.education === edu && <CheckCircle2 className="text-emerald-500 w-6 h-6" />}
                </label>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-navy-950 flex flex-col pt-24 pb-12 px-4 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-900/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-900/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 w-full max-w-2xl mx-auto flex-grow flex flex-col justify-center">
        
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-emerald-400">Step {step} of 3</span>
            <span className="text-sm font-medium text-navy-400">
              {step === 1 ? 'Personal' : step === 2 ? 'Financial' : 'Academic'}
            </span>
          </div>
          <div className="w-full h-2 bg-navy-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-emerald-500 transition-all duration-500 ease-out"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* Multi-step Form Card */}
        <div className="bg-navy-900/80 backdrop-blur-xl border border-navy-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative">
          
          {/* Form Content */}
          <div className="min-h-[300px]">
             {renderStepContent()}
          </div>

          {/* Form Navigation Controls */}
          <div className="mt-10 flex items-center justify-between border-t border-navy-800 pt-6">
            <button
              onClick={handleBack}
              disabled={step === 1}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${step === 1 ? 'text-navy-600 cursor-not-allowed' : 'text-navy-300 hover:text-white hover:bg-navy-800'}`}
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button
              onClick={handleNext}
              className="bg-emerald-500 hover:bg-emerald-400 text-navy-950 flex items-center gap-2 px-8 py-3 rounded-xl font-bold shadow-lg shadow-emerald-500/20 transition-all hover:scale-105 active:scale-95"
            >
              {step === 3 ? 'Complete Profile' : 'Continue'} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Skip button directly below the card */}
        <div className="mt-10">
          <button 
            onClick={handleSkip}
            className="w-full group bg-navy-800/40 hover:bg-navy-800/80 border border-navy-700/50 hover:border-navy-600 backdrop-blur-sm text-navy-200 py-4 rounded-2xl font-semibold flex items-center justify-center gap-3 transition-all duration-300"
          >
            <span className="group-hover:text-white transition-colors">Skip & Search Manually</span>
            <SkipForward className="w-5 h-5 text-emerald-500/70 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
          </button>
        </div>

      </div>
    </div>
  );
}
