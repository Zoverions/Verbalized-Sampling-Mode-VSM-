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
      <h2 className="text-3xl font-bold text-center text-vsm-secondary mb-8">Archived Interactive Demo</h2>
      <div className="max-w-4xl mx-auto p-6 bg-vsm-surface rounded-lg border border-vsm-border">
        <div className="mb-4 p-4 bg-amber-900/30 border border-amber-700 rounded-lg text-sm text-vsm-text-secondary">
          Remote model execution is disabled in the archived source because the original prototype bundled its Gemini API key into browser code. The UI remains as a preserved concept artifact.
        </div>
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
            {isLoading ? 'Generating...' : 'Run Archived Demo'}
          </button>
        </div>

        {error && <div className="text-red-400 bg-red-900/50 border border-red-700 p-4 rounded-md text-center">{error}</div>}

        {!isLoading && alternatives.length > 0 && (
          <div>
            <div className="my-6 p-4 bg-indigo-900/50 border border-indigo-700 rounded-lg text-center">
              <h3 className="font-semibold text-vsm-secondary">Generated Alternative Layer</h3>
              <p className="text-sm text-vsm-text-secondary">
                These are model-generated candidate answers and self-reported score/rationale fields. They are not hidden reasoning states, calibrated confidence, or objective correctness measures.
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
