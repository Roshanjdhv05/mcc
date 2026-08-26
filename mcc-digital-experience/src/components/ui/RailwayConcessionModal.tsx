import React from 'react';
import { X } from 'lucide-react';

export default function RailwayConcessionModal({ 
  isOpen, 
  onClose 
}: { 
  isOpen: boolean; 
  onClose: () => void 
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-[#F8FAFC]">
          <h3 className="text-xl font-bold text-[#123B6D] font-[var(--font-heading)]">Railway & Bus Pass Concession</h3>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 transition-colors"
          >
            <X size={18} />
          </button>
        </div>
        
        <div className="p-6 space-y-6 text-[#1E293B] max-h-[70vh] overflow-y-auto">
          {/* Railway Concession */}
          <div>
            <h4 className="text-lg font-bold text-[#123B6D] mb-3 flex items-center gap-2">
              <span className="w-8 h-px bg-[#D4A017]"></span>
              Railway Concession
            </h4>
            <p className="text-sm font-medium mb-4 leading-relaxed text-gray-700">
              The local train season ticket (pass) concession can be applied through the student's account in the "Students Diary Cloud" App. After having applied through the App, the student shall go to the college office and pay the form charges of <span className="font-bold">INR 2/-</span> and get the concession form and within three days get the new season ticket issued from the railway station.
            </p>
            
            <div className="space-y-3 w-full">
              <p className="text-sm font-bold text-[#123B6D]">The schedule is as follows:</p>
              
              <div className="bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] overflow-hidden">
                {/* Schedule 1 */}
                <div className="p-4 border-b border-[#E2E8F0]">
                  <h5 className="font-bold text-[#123B6D] text-sm mb-2">Junior College / B.Com (Aided) / M.Com (Adv. Accountancy):</h5>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs font-medium">
                    <span className="bg-amber-100 text-amber-800 px-2.5 py-1 rounded-md">Counter No: 5</span>
                    <span className="text-gray-600 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span> Monday and Tuesday</span>
                    <span className="text-gray-600 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span> 9:30 AM to 12:30 PM & 2:00 PM - 3:30 PM</span>
                  </div>
                </div>
                
                {/* Schedule 2 */}
                <div className="p-4">
                  <h5 className="font-bold text-[#123B6D] text-sm mb-2">All the SFC Programmes:</h5>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs font-medium">
                    <span className="bg-amber-100 text-amber-800 px-2.5 py-1 rounded-md">Counter No: 6</span>
                    <span className="text-gray-600 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span> Wednesday & Thursday</span>
                    <span className="text-gray-600 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span> 9:30 AM to 12:30 PM & 2:00 PM - 3:30 PM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bus Concession */}
          <div className="pt-4 border-t border-gray-100">
            <h4 className="text-lg font-bold text-[#123B6D] mb-3 flex items-center gap-2">
              <span className="w-8 h-px bg-[#D4A017]"></span>
              Bus Concession
            </h4>
            <p className="text-sm font-medium leading-relaxed text-gray-700">
              The city corporation buses (BMC, TMC, KDMC, etc.) give concessions in bus travel to the students. 
              The students can bring those application forms from the respective Bus Service Office and get them verified from the office. 
              <br/><br/>
              <span className="font-bold text-[#10B981]">There are no charges for such verification.</span>
            </p>
          </div>
        </div>
        
        <div className="p-5 border-t border-gray-100 bg-[#F8FAFC] flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-[#123B6D] text-white text-sm font-bold rounded-xl hover:bg-[#0a2342] transition-colors"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  );
}
