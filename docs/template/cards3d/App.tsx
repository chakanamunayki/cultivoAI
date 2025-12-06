import React from 'react';
import { Hero } from './components/Hero';
import { AppWindows } from './components/AppWindows';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#fcfdfc] selection:bg-green-100 selection:text-green-900 overflow-x-hidden">
      {/* Navigation / Header (Simple) */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-100 h-16 flex items-center justify-between px-6 lg:px-12">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-cultivo-green rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-sm">
            C
          </div>
          <span className="font-bold text-gray-900 tracking-tight">Cultivo.ai</span>
        </div>
        <button className="md:hidden text-gray-500">
           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
        </button>
      </nav>

      {/* Main Content */}
      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[calc(100vh-140px)]">
          
          {/* Left Column: Text Content */}
          <div className="order-1 lg:order-1 z-10">
            <Hero />
          </div>

          {/* Right Column: Animation */}
          <div className="order-2 lg:order-2 w-full h-full flex items-center justify-center lg:justify-end p-2 sm:p-0">
            <div className="w-full relative group perspective-1000">
              {/* Decorative background blob */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-green-100/50 via-blue-50/50 to-purple-100/50 rounded-full opacity-60 blur-3xl -z-10 group-hover:opacity-80 transition-opacity duration-1000"></div>
              
              <AppWindows />
              
              {/* Mobile Caption */}
              <p className="mt-2 text-center text-xs text-gray-400 font-medium tracking-wide uppercase lg:hidden">
                Automatización Inteligente
              </p>
            </div>
          </div>
        </div>
      </main>
      
      {/* Simple Footer */}
      <footer className="py-6 text-center text-gray-400 text-sm border-t border-gray-100">
        <p>© 2024 Cultivo AI. Growth through Intelligence.</p>
      </footer>
    </div>
  );
};

export default App;