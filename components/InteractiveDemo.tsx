
import React, { useState, useCallback } from 'react';
import { generateVSMResponse } from '../services/geminiService';
import { AlternativeResponse } from '../types';
import AlternativeResponseCard from './AlternativeResponseCard';

const InteractiveDemo: React.FC = () => {
  const [query, setQuery] = useState<string>('What are the most promising strategies for mitigating urban heat island effect?');
  const [alternatives, setAlternatives] = useState<AlternativeResponse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!query.trim()) {
      setError('Please enter a query.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setAlternatives([]);
    try {
      const response = await generateVSMResponse(query);
      setAlternatives(response);
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [query]);

  return (
    <section id="demo">
      <h2 className="text-3xl font-bold text-center text-vsm-secondary mb-8">Interactive Demo</h2>
      <div className="max-w-4xl mx-auto p-6 bg-vsm-surface rounded-lg border border-vsm-border">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter your query here..."
            className="flex-grow bg-gray-800 border border-vsm-border rounded-md px-4 py-2 text-vsm-text-primary focus:ring-2 focus:ring-vsm-primary focus:outline-none transition"
            disabled={isLoading}
          />
          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className="bg-vsm-primary hover:bg-opacity-80 text-white font-bold py-2 px-6 rounded-md transition-all duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating...
              </>
            ) : (
              'Generate with VSM'
            )}
          </button>
        </div>

        {error && <div className="text-red-400 bg-red-900/50 border border-red-700 p-4 rounded-md text-center">{error}</div>}
        
        {isLoading && (
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {[...Array(4)].map((_, i) => (
               <div key={i} className="bg-gray-800 p-4 rounded-lg animate-pulse-fast border border-vsm-border">
                 <div className="h-6 bg-gray-700 rounded w-3/4 mb-4"></div>
                 <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
                 <div className="h-4 bg-gray-700 rounded w-5/6 mb-4"></div>
                 <div className="h-8 bg-gray-700 rounded w-1/2"></div>
               </div>
            ))}
           </div>
        )}

        {!isLoading && alternatives.length > 0 && (
          <div>
             <div className="my-6 p-4 bg-indigo-900/50 border border-indigo-700 rounded-lg text-center">
              <h3 className="font-semibold text-vsm-secondary">Explainability Layer</h3>
              <p className="text-sm text-vsm-text-secondary">
                Below are distinct reasoning paths the AI considered. The 'Internal Probability' reflects the model's relative confidence in a path, not an objective measure of correctness. Use these to compare trade-offs and understand the solution space.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {alternatives.map((alt, index) => (
                <AlternativeResponseCard key={index} response={alt} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default InteractiveDemo;
