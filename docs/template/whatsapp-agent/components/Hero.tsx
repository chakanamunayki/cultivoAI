import React from 'react';
import { ArrowRight } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <div className="flex flex-col justify-center space-y-8 p-4 md:p-8 lg:max-w-xl">
      <div className="space-y-6">
        <div className="inline-flex items-center space-x-2 bg-green-50 text-cultivo-green px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase border border-green-100">
          <span className="w-2 h-2 rounded-full bg-cultivo-green animate-pulse"></span>
          <span>Nueva Tecnología</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.1]">
          Integración de IA <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cultivo-green to-teal-500">
            Simplificada.
          </span>
        </h1>
        
        <div className="space-y-4 text-lg text-gray-600 font-light">
          <p className="border-l-4 border-cultivo-green pl-4">
            Para <strong className="text-gray-900 font-semibold">negocios</strong> que buscan crecer.
          </p>
          <p className="border-l-4 border-gray-200 pl-4">
            Para <strong className="text-gray-900 font-semibold">proyectos</strong> de alto impacto.
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <button className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all duration-200 bg-gray-900 rounded-full hover:bg-cultivo-green hover:shadow-lg hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900">
          <span>Hablemos</span>
          <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
        </button>
        <button className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-gray-700 transition-all duration-200 bg-white border border-gray-200 rounded-full hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200">
          Ver ejemplos
        </button>
      </div>

      <div className="pt-8 border-t border-gray-100 flex flex-wrap items-center gap-6 text-sm text-gray-500">
        <span className="flex items-center font-medium text-gray-900">
          Desde $100 USD
        </span>
        <span className="hidden sm:inline text-gray-300">|</span>
        <div className="flex items-center space-x-2">
          <span className="text-lg" role="img" aria-label="UK Flag">🇬🇧</span>
          <span className="text-lg" role="img" aria-label="Colombia Flag">🇨🇴</span>
          <span>Medellín & Global</span>
        </div>
      </div>
    </div>
  );
};
