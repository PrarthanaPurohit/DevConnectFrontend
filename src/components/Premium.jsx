import React from "react";

const Premium = () => {
return (
  <div className="w-full flex justify-center mt-24 px-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-5xl">

      {/* Silver Membership */}
      <div
        className="
          relative rounded-3xl p-8
          bg-[#777c85] backdrop-blur-xl
          border border-black/10
          shadow-[0_30px_80px_rgba(0,0,0,0.25)]
          text-black
          flex flex-col justify-between
          hover:-translate-y-2 transition-all duration-300
        "
      >
        <div>
          <h1 className="text-2xl font-semibold text-center mb-6">
            Silver Membership
          </h1>

          <ul className="space-y-3 text-sm text-">
            <li>• Chat with your connections</li>
            <li>• Verified blue tick</li>
            <li>• Limited profile visibility boost</li>
            <li>• 3 months validity</li>
          </ul>
        </div>

        <div className="flex justify-center mt-8">
          <button
            className="
              px-6 py-2 rounded-xl
              bg-[#020617]
              text-white
              hover:bg-[#0d1c40]
              hover:scale-105
              transition-all duration-200
            "
          >
            Buy Silver
          </button>
        </div>
      </div>

      {/* Gold Membership */}
      <div
        className="
          relative rounded-3xl p-8
          bg-[#171e3e]
          border border-white/10
          shadow-[0_35px_90px_rgba(0,0,0,0.6)]
          text-[#f8fafc]
          flex flex-col justify-between
          hover:-translate-y-2 transition-all duration-300
        "
      >
        {/* subtle glow */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>

        <div className="relative">
          <h1 className="text-2xl font-semibold text-center mb-6">
            Gold Membership
          </h1>

          <ul className="space-y-3 text-sm text-slate-300">
            <li>• Unlimited chat with connections</li>
            <li>• Verified blue tick</li>
            <li>• High profile visibility boost</li>
            <li>• Priority support</li>
            <li>• 6 months validity</li>
          </ul>
        </div>

        <div className="flex justify-center mt-8 relative">
          <button
            className="
              px-6 py-2 rounded-xl
              bg-[#e3ba3369] text-[#020617]
              font-medium
              hover:bg-[#c49213]
              hover:scale-105
              transition-all duration-200
            "
          >
            Buy Gold
          </button>
        </div>
      </div>

    </div>
  </div>
);

};

export default Premium;

