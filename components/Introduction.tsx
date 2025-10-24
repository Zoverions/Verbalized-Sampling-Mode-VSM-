
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
      <SectionTitle>Exposing the AI’s Internal Dialogue</SectionTitle>
      <Paragraph>
        Verbalized Sampling Mode (VSM) is an optional protocol that exposes an AI's internal deliberative diversity to improve transparency and auditability. It implements the principle of "show your work" by surfacing multiple distinct reasoning trajectories that exist within the base model, rather than just a single, polished answer.
      </Paragraph>
      <Paragraph>
        This technique, called Latent Reasoning Sampling (LRS), runs a sampler over the model’s internal reasoning states. The outcome is a small collection of distinct, well-formed responses, each with a meta-information score about the model's internal confidence. This transforms the AI's output from a monologue into a structured polylogue, allowing a human to audit, compare, and synthesize multiple plausible conclusions.
      </Paragraph>
      <Paragraph>
        By converting latent diversity into digestible alternatives, VSM makes the model’s internal uncertainty legible without overwhelming the user. For decision contexts where robustness and accountability matter, VSM supplies the raw material for more resilient human judgment.
      </Paragraph>
    </section>
  );
};

export default Introduction;
