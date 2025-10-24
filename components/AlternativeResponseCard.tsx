
import React, { useState } from 'react';
import { AlternativeResponse } from '../types';

const ProbabilityBar: React.FC<{ value: number }> = ({ value }) => {
  const width = `${Math.round(value * 100)}%`;
  const barColor = value > 0.7 ? 'bg-green-500' : value > 0.4 ? 'bg-yellow-500' : 'bg-red-500';
  
  return (
    <div className="w-full bg-gray-700 rounded-full h-2.5">
      <div className={`${barColor} h-2.5 rounded-full`} style={{ width }}></div>
    </div>
  );
};

const Tooltip: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="absolute bottom-full mb-2 w-64 bg-gray-900 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 shadow-lg border border-vsm-border">
        {children}
        <svg className="absolute text-gray-900 h-2 w-full left-0 top-full" x="0px" y="0px" viewBox="0 0 255 255">
            <polygon className="fill-current" points="0,0 127.5,127.5 255,0"/>
        </svg>
    </div>
);


const AlternativeResponseCard: React.FC<{ response: AlternativeResponse }> = ({ response }) => {
  const [isTraceVisible, setIsTraceVisible] = useState(false);

  return (
    <div className="bg-gray-800 p-6 rounded-lg border border-vsm-border flex flex-col h-full transform hover:-translate-y-1 transition-transform duration-300">
      <h4 className="text-lg font-bold text-vsm-primary mb-2">{response.title}</h4>
      <p className="text-vsm-text-secondary text-sm mb-4 flex-grow">{response.answer}</p>
      
      <div className="mb-4">
        <div className="flex justify-between items-center mb-1 text-sm">
            <div className="group relative flex items-center">
                <span className="font-semibold text-vsm-text-primary">Internal Probability</span>
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 text-vsm-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <Tooltip>
                    This is an internal relative weight, not an objective measure of truth. It represents the model's confidence in this reasoning path.
                </Tooltip>
            </div>
            <span className="font-mono text-vsm-primary">{(response.probability * 100).toFixed(1)}%</span>
        </div>
        <ProbabilityBar value={response.probability} />
      </div>

      <div>
        <button 
          onClick={() => setIsTraceVisible(!isTraceVisible)}
          className="text-sm font-semibold text-vsm-secondary hover:text-vsm-primary transition-colors w-full text-left flex items-center"
        >
          {isTraceVisible ? 'Hide' : 'Show'} Reasoning Trace
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ml-1 transition-transform ${isTraceVisible ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {isTraceVisible && (
          <ul className="mt-3 space-y-2 text-xs text-vsm-text-secondary list-disc list-inside bg-gray-900/50 p-3 rounded-md">
            {response.reasoningTrace.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AlternativeResponseCard;
