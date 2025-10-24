
import React from 'react';

const RiskCard: React.FC<{ title: string; risk: string; mitigation: string }> = ({ title, risk, mitigation }) => (
  <div className="bg-gray-800 p-6 rounded-lg border border-vsm-border">
    <h4 className="text-lg font-semibold text-vsm-primary mb-2 flex items-center">
      <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      {title}
    </h4>
    <p className="text-sm text-red-300 mb-3"><span className="font-bold">Risk:</span> {risk}</p>
    <p className="text-sm text-green-300"><span className="font-bold">Mitigation:</span> {mitigation}</p>
  </div>
);

const RisksAndMitigations: React.FC = () => {
  const risks = [
    {
      title: "Misinterpretation of Probabilities",
      risk: "Users may read internal probabilities as objective truth.",
      mitigation: "Show clear explanatory tooltips that these are internal relative weights, not external validation; optionally map them to qualitative bands (e.g., 'High / Medium / Low internal support')."
    },
    {
      title: "Weaponization / Coercive Authenticity",
      risk: "Adversaries could require VSM evidence to authenticate or punish.",
      mitigation: "Require user consent before exporting alternatives; redact or obfuscate fine-grained internal traces in shared/exported artifacts; add governance policies forbidding punitive use."
    },
    {
      title: "Surveillance of Latent States",
      risk: "Logging could enable third parties to train detectors or extract private information.",
      mitigation: "Default to ephemeral storage; use encrypted auditing and differential privacy noise; implement strict access controls and audit trails."
    },
    {
      title: "Overfitting and Memetic Traps",
      risk: "Social norms might evolve to privilege 'VSM-friendly' arguments and penalize other forms of discourse.",
      mitigation: "Rotate sampling parameters; encourage diverse output templates; surface meta-guidance prompting users to weigh social costs of privileging certain signals."
    }
  ];

  return (
    <section id="risks">
      <h2 className="text-3xl font-bold text-center text-vsm-secondary mb-8">Risks & Mitigations</h2>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {risks.map(r => <RiskCard key={r.title} {...r} />)}
      </div>
    </section>
  );
};

export default RisksAndMitigations;
