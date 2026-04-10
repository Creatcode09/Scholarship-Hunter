import { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { IndianRupee, Calendar, ChevronRight, AlertCircle, Sparkles, Filter } from 'lucide-react';

const DUMMY_SCHOLARSHIPS = [
  {
    id: 1,
    title: 'Post-Matric Scholarship for OBC',
    amount: '₹50,000/year',
    provider: 'Ministry of Social Justice',
    deadline: '15 May 2026',
    tags: [{ label: '#Govt', type: 'govt' }, { label: '#Urgent', type: 'urgent' }],
  },
  {
    id: 2,
    title: 'Reliance Foundation Undergraduate',
    amount: '₹2,00,000/year',
    provider: 'Reliance Foundation',
    deadline: '01 Aug 2026',
    tags: [{ label: '#Private', type: 'private' }],
  },
  {
    id: 3,
    title: 'National Means Cum Merit',
    amount: '₹12,000/year',
    provider: 'Department of School Education',
    deadline: '30 Apr 2026',
    tags: [{ label: '#Govt', type: 'govt' }, { label: '#Urgent', type: 'urgent' }],
  },
  {
    id: 4,
    title: 'HDFC Badhte Kadam',
    amount: '₹1,00,000/year',
    provider: 'HDFC Bank',
    deadline: '30 Jun 2026',
    tags: [{ label: '#Private', type: 'private' }],
  },
  {
    id: 5,
    title: 'AICTE Pragati Scholarship for Girls',
    amount: '₹50,000/year',
    provider: 'AICTE',
    deadline: '15 Jul 2026',
    tags: [{ label: '#Govt', type: 'govt' }],
  },
];

export default function DiscoveryHub() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const fromProfile = location.state?.fromProfile;
  const skippedProfile = location.state?.skippedProfile;

  const getTagStyle = (type) => {
    switch(type) {
      case 'govt': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'private': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'urgent': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Badges / Banners based on user journey */}
        {fromProfile && (
          <div className="mb-8 flex items-center gap-4 bg-emerald-50 border border-emerald-200 text-emerald-900 p-4 rounded-2xl shadow-sm">
            <div className="bg-emerald-100 p-2 rounded-full">
              <Sparkles className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Recommended for You</h3>
              <p className="text-emerald-700 text-sm">Based on your profile, we've found these highly matched scholarships.</p>
            </div>
          </div>
        )}

        {(skippedProfile || (!fromProfile && !skippedProfile)) && (
          <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white border border-navy-100 text-navy-900 p-5 rounded-2xl shadow-sm">
            <div className="flex items-center gap-4">
              <div className="bg-amber-100 p-2 rounded-full">
                 <AlertCircle className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Want better matches?</h3>
                <p className="text-navy-500 text-sm">Complete your profile to unlock personalized recommendations.</p>
              </div>
            </div>
            <Link to="/profile" className="w-full sm:w-auto px-6 py-2.5 bg-navy-900 text-white rounded-xl text-sm font-semibold hover:bg-navy-800 transition-colors text-center">
              Complete Profile
            </Link>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="w-full lg:w-72 flex-shrink-0">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sticky top-24 shadow-sm">
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-100">
                <Filter className="w-5 h-5 text-navy-700" />
                <h2 className="text-lg font-bold text-navy-900">Filters</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-navy-700 mb-3 uppercase tracking-wider">Amount</h3>
                  <div className="space-y-2">
                    {['Any Amount', '₹0 - ₹50,000', '₹50,000 - ₹1,00,000', '₹1,00,000+'].map((opt, i) => (
                      <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                        <input type="radio" name="amount" defaultChecked={i === 0} className="w-4 h-4 text-emerald-600 border-slate-300 focus:ring-emerald-500" />
                        <span className="text-slate-600 group-hover:text-navy-900 transition-colors">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-navy-700 mb-3 uppercase tracking-wider mt-6">Provider Type</h3>
                  <div className="space-y-2">
                    {['All', 'Government', 'Private', 'NGO'].map((opt, i) => (
                      <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                        <input type="checkbox" defaultChecked={i === 0} className="w-4 h-4 rounded text-emerald-600 border-slate-300 focus:ring-emerald-500" />
                        <span className="text-slate-600 group-hover:text-navy-900 transition-colors">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-semibold text-navy-700 mb-3 uppercase tracking-wider mt-6">Deadline</h3>
                  <div className="space-y-2">
                    {['Any Time', 'This Month', 'Next 3 Months'].map((opt, i) => (
                      <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                        <input type="radio" name="deadline" defaultChecked={i === 0} className="w-4 h-4 text-emerald-600 border-slate-300 focus:ring-emerald-500" />
                        <span className="text-slate-600 group-hover:text-navy-900 transition-colors">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6 px-1">
              <h2 className="text-2xl font-bold text-navy-900">
                Discovery Hub
              </h2>
              <span className="text-slate-500 text-sm font-medium bg-slate-200 px-3 py-1 rounded-full">{DUMMY_SCHOLARSHIPS.length} Results</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {DUMMY_SCHOLARSHIPS.map((scholarship) => (
                <div key={scholarship.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all p-6 group flex flex-col h-full flex-grow relative overflow-hidden">
                  {/* Decorative background shape */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-[100px] -z-0 transition-transform duration-500 group-hover:scale-110"></div>
                  
                  <div className="relative z-10 flex-grow flex flex-col">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {scholarship.tags.map((tag, idx) => (
                        <span key={idx} className={`px-2.5 py-1 text-xs font-bold uppercase tracking-wider rounded-md border ${getTagStyle(tag.type)}`}>
                          {tag.label}
                        </span>
                      ))}
                    </div>
                    
                    <h3 className="text-xl font-bold text-navy-900 mb-2 group-hover:text-emerald-600 transition-colors pr-8">
                      {scholarship.title}
                    </h3>
                    <p className="text-sm font-medium text-navy-500 mb-5">{scholarship.provider}</p>
                    
                    <div className="space-y-3 mb-6 bg-slate-50 p-4 rounded-xl border border-slate-100 mt-auto">
                      <div className="flex items-center text-sm text-slate-700 gap-3">
                        <div className="bg-emerald-100 p-1.5 rounded text-emerald-600">
                          <IndianRupee className="w-4 h-4" />
                        </div>
                        <span className="font-bold text-slate-900">{scholarship.amount}</span>
                      </div>
                      <div className="flex items-center text-sm text-slate-700 gap-3">
                        <div className="bg-rose-100 p-1.5 rounded text-rose-600">
                          <Calendar className="w-4 h-4" />
                        </div>
                        <span className="font-medium">Due: <span className="font-bold text-slate-900">{scholarship.deadline}</span></span>
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => navigate(`/details/${scholarship.id}`)}
                    className="w-full mt-2 py-3 rounded-xl border-2 border-navy-900 text-navy-900 font-bold group-hover:bg-navy-900 group-hover:text-white transition-all flex items-center justify-center gap-2"
                  >
                    View Details
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
