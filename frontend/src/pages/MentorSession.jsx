import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar as CalendarIcon, Clock, Award, Star, Video, CheckCircle2, Loader2 } from 'lucide-react';
import { fetchMentors } from '../services/api';

export default function MentorSession() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isBooked, setIsBooked] = useState(false);

  const [mentor, setMentor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMentor = async () => {
      try {
        // If we came from a scholarship click, the URL has a Scholarship ID.
        // For this demo, we'll just fetch all mentors and pick the first one, or specific one if we passed mentor ID.
        // To be safe, let's fetch all and pick a random mentor to simulate the experience.
        const mentorsList = await fetchMentors();
        if (mentorsList && mentorsList.length > 0) {
          setMentor(mentorsList[0]);
        }
      } catch (error) {
        console.error("Failed to load mentor:", error);
      } finally {
        setLoading(false);
      }
    };
    loadMentor();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-emerald-500 animate-spin" />
      </div>
    );
  }

  if (!mentor) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
        <h2 className="text-xl font-bold text-navy-900 mb-4">Mentor not found</h2>
        <button onClick={() => navigate(-1)} className="bg-navy-900 text-white px-6 py-2 rounded-xl font-bold">Go Back</button>
      </div>
    );
  }

  if (isBooked) {
    return (
      <div className="min-h-screen bg-slate-50 pt-32 pb-16 px-4 sm:px-6 flex items-center justify-center">
         <div className="bg-white max-w-md w-full rounded-3xl p-8 border border-slate-200 shadow-xl text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-emerald-500"></div>
            <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 className="w-8 h-8 text-emerald-600" />
            </div>
            <h2 className="text-2xl font-bold text-navy-900 mb-2">Session Booked!</h2>
            <p className="text-slate-600 mb-6">Your mentorship session with {mentor?.name} has been confirmed for <span className="font-bold text-navy-900">{selectedSlot}</span>.</p>
            
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 mb-8 flex items-center gap-3 text-left">
               <div className="bg-blue-100 p-3 rounded-lg text-blue-600">
                  <Video className="w-6 h-6" />
               </div>
               <div>
                  <div className="text-sm font-bold text-navy-900">Google Meet Link</div>
                  <a href="#" className="text-blue-600 text-sm hover:underline">meet.google.com/abc-defg-hij</a>
               </div>
            </div>

            <button 
              onClick={() => navigate('/search')}
              className="w-full bg-navy-900 hover:bg-navy-800 text-white font-bold py-3 px-6 rounded-xl transition-all">
              Back to Search
            </button>
         </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8">
        
        {/* Mentor Profile */}
        <div className="w-full md:w-1/3">
           <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm sticky top-24">
               <div className="w-24 h-24 mx-auto bg-navy-100 rounded-full mb-4 overflow-hidden border-4 border-white shadow-md">
                 <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${mentor.avatar}&backgroundColor=1e293b`} alt="Mentor" className="w-full h-full object-cover" />
              </div>
              <div className="text-center mb-6">
                 <h2 className="text-xl font-bold text-navy-900">{mentor.name}</h2>
                 <p className="text-emerald-600 font-medium text-sm flex items-center justify-center gap-1"><Award className="w-4 h-4"/> {mentor.role || "Scholarship Mentor"}</p>
              </div>
              <div className="flex items-center justify-between text-sm text-slate-600 mb-4 bg-slate-50 p-3 rounded-xl border border-slate-100">
                 <div className="flex flex-col items-center">
                    <span className="font-bold text-navy-900 flex items-center gap-1"><Star className="w-4 h-4 text-amber-400 fill-amber-400"/> {mentor.rating}</span>
                    <span className="text-xs">Rating</span>
                 </div>
                 <div className="w-px h-8 bg-slate-200"></div>
                 <div className="flex flex-col items-center">
                    <span className="font-bold text-navy-900">{mentor.sessions}</span>
                    <span className="text-xs">Sessions</span>
                 </div>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed text-center">
                 "{mentor.bio}"
              </p>
           </div>
        </div>

        {/* Booking Interface */}
        <div className="w-full md:w-2/3 space-y-6">
           <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
              <h1 className="text-2xl font-bold text-navy-900 mb-2">Book a 1:1 Session</h1>
              <p className="text-slate-500 mb-8">Select an available time slot to discuss your application strategy.</p>
              
              <div className="mb-6 flex items-center gap-2 text-navy-900 font-bold">
                 <CalendarIcon className="w-5 h-5 text-emerald-600" />
                 <span>Available Times • Upcoming Weekend</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                 {mentor.availability.map(slot => (
                    <button
                      key={slot}
                      onClick={() => setSelectedSlot(slot)}
                      className={`p-4 rounded-xl border-2 text-sm font-bold transition-all flex flex-col items-center gap-2 ${
                         selectedSlot === slot 
                           ? 'border-emerald-500 bg-emerald-50 text-emerald-700 shadow-[0_0_0_2px_rgba(16,185,129,0.2)]'
                           : 'border-slate-200 bg-white text-slate-600 hover:border-emerald-200 hover:bg-slate-50'
                      }`}
                    >
                       <Clock className={`w-5 h-5 ${selectedSlot === slot ? 'text-emerald-500' : 'text-slate-400'}`} />
                       {slot}
                    </button>
                 ))}
                 {mentor.availability.length === 0 && (
                   <p className="col-span-full text-slate-500">No available slots.</p>
                 )}
              </div>

              <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                 <div className="text-sm text-slate-500">
                    Session duration: <span className="font-bold text-navy-900">30 min</span><br/>
                    Platform: <span className="font-bold text-navy-900">Google Meet</span>
                 </div>
                 <button 
                    disabled={!selectedSlot}
                    onClick={() => setIsBooked(true)}
                    className={`py-3 px-8 rounded-xl font-bold transition-all ${
                       selectedSlot 
                         ? 'bg-emerald-500 text-white hover:bg-emerald-400 shadow-[0_4px_14px_0_rgba(16,185,129,0.39)]' 
                         : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    }`}>
                    Confirm Booking
                 </button>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}
