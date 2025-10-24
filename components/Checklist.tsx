
import React from 'react';

const CheckListItem: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="flex items-start">
    <div className="flex-shrink-0">
      <svg className="h-6 w-6 text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
    <div className="ml-3">
      <h4 className="text-lg leading-6 font-medium text-vsm-text-primary">{title}</h4>
      <p className="mt-1 text-base text-vsm-text-secondary">{children}</p>
    </div>
  </div>
);

const Checklist: React.FC = () => {
  return (
    <section id="checklist">
      <h2 className="text-3xl font-bold text-center text-vsm-secondary mb-8">Practical Checklist for Integration</h2>
      <div className="max-w-4xl mx-auto p-6 bg-vsm-surface rounded-lg border border-vsm-border space-y-8">
        <CheckListItem title="When to enable">
          User opt-in only; contextual opt-in for high-stakes workflows (policy review, legal reasoning, research synthesis).
        </CheckListItem>
        <CheckListItem title="Sampler configuration">
          MCMC chains = 8–32 (tunable); chain length and temperature schedule configurable by policy tier.
        </CheckListItem>
        <CheckListItem title="Output cap">
          3–7 alternatives (default 4) to balance coverage vs. cognitive load.
        </CheckListItem>
        <CheckListItem title="Presentation format">
          For each alternative: a short title, full answer, estimated probability, and a compact reasoning trace.
        </CheckListItem>
        <CheckListItem title="Explainability layer">
          Auto-generated plain-language summary explaining how to interpret probabilities and tradeoffs.
        </CheckListItem>
        <CheckListItem title="Logging & retention">
          Ephemeral by default; persistent logs only with explicit consent and governance review.
        </CheckListItem>
        <CheckListItem title="Compute/latency budgeting">
          Degrade to "top-k deterministic alternatives" mode if sampler budget is exceeded.
        </CheckListItem>
      </div>
    </section>
  );
};

export default Checklist;
