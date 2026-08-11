import React from 'react';

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-2xl font-bold text-vsm-secondary mb-4 tracking-tight">{children}</h2>
);

const Paragraph: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-vsm-text-secondary leading-relaxed mb-4">{children}</p>
);

const Introduction: React.FC = () => {
  return (
    <section id="introduction" className="p-6 bg-vsm-surface rounded-lg border border-vsm-border">
      <SectionTitle>Exploring Multiple Verbalized Alternatives</SectionTitle>
      <Paragraph>
        This historical Verbalized Sampling Mode (VSM) prototype explored an interface pattern where a model is prompted to return several materially different candidate answers instead of one polished response. The goal is to make output diversity easier for a human to compare and audit.
      </Paragraph>
      <Paragraph>
        The prototype does not read hidden chain-of-thought, internal activations, latent reasoning states, or calibrated model confidence. Its earlier Gemini prompt asked the model to generate alternative answers, a probability-like score, and a short list of rationale steps. Those are model-generated output fields, not privileged measurements of the model's internals.
      </Paragraph>
      <Paragraph>
        A future maintained sampling system could still use multiple independently generated candidates, external scoring, calibration, or uncertainty estimation. Those methods would need an explicit protocol and validation rather than treating a model's verbalized self-report as ground truth about its internal reasoning.
      </Paragraph>
    </section>
  );
};

export default Introduction;
