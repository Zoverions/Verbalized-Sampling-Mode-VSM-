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
  </div>
);

const AlternativeResponseCard: React.FC<{ response: AlternativeResponse }> = ({ response }) => {
  const [isTraceVisible, setIsTraceVisible] = useState(false);

  return (
    <div className="bg-gray-800 p-6 rounded-lg border border-vsm-border flex flex-col h-full">
      <h4 className="text-lg font-bold text-vsm-primary mb-2">{response.title}</h4>
      <p className="text-vsm-text-secondary text-sm mb-4 flex-grow">{response.answer}</p>

      <div className="mb-4">
        <div className="flex justify-between items-center mb-1 text-sm">
          <div className="group relative flex items-center">
            <span className="font-semibold text-vsm-text-primary">Model-Generated Score</span>
            <Tooltip>
              Historical schema field. This value was generated because the prompt asked for a probability-like score; it is not measured internal confidence or calibrated probability.
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
          {isTraceVisible ? 'Hide' : 'Show'} Generated Rationale Summary
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
