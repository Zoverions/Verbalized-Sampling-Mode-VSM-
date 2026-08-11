# Verbalized Sampling Mode Explorer — archived output-diversity prototype

> **Status:** Historical AI Studio concept shell. Remote Gemini execution is disabled in the archived source because the original implementation bundled `GEMINI_API_KEY` into browser code. This repository does not expose hidden chain-of-thought, latent reasoning states, or calibrated internal confidence.

Pre-archive snapshot:

`0d3b660190b9666ace758360d49fc50734f29974`

## What the original prototype actually did

The historical `services/geminiService.ts` asked Gemini 2.5 Flash to generate:

- 3–5 alternative answers to one query;
- a numeric `probability` field for each answer;
- 2–5 short rationale bullets in a field named `reasoningTrace`.

Those fields were **prompted model outputs**. The implementation did not read model activations, hidden reasoning states, logits, calibrated confidence, or privileged chain-of-thought.

The earlier UI labels “Internal Probability,” “Reasoning Trace,” and “Exposing the AI’s Internal Dialogue” therefore exceeded what the implementation could establish. The archival branch relabels those fields as a **model-generated score** and **generated rationale summary**.

## Security correction

The original Vite configuration injected `GEMINI_API_KEY` into the frontend bundle via `process.env.API_KEY`. A user who supplied a real key could expose it to browser clients.

The archived source state removes that injection, binds the Vite development server to loopback, and intentionally disables `generateVSMResponse()` rather than preserving an unsafe browser credential path.

A future maintained implementation must place model-provider credentials behind an authenticated server-side boundary and must define abuse/rate/privacy controls appropriate to the deployment.

## Concept worth preserving

The useful research/UI idea is **verbalized output diversity**:

- generate multiple materially different candidate answers;
- compare their trade-offs rather than hiding all alternatives behind one final response;
- optionally attach externally defined scores or calibration information;
- keep human synthesis above the displayed alternatives;
- distinguish generated rationale summaries from hidden model reasoning.

A rigorous future version should specify how candidates are independently sampled, how diversity is measured, how scores are produced/calibrated, and what evaluation demonstrates improved decisions or robustness.

## What this repository is not

It is not evidence that:

- a model has exposed its private/internal chain-of-thought;
- the displayed score is internal confidence;
- the score is calibrated probability;
- multiple verbalized answers faithfully enumerate the model’s latent possibility space;
- a rationale summary is causally faithful to the model’s hidden computation.

## Portfolio disposition

Archive this generated explorer shell. Preserve the VSM/output-diversity concept and its negative findings in portfolio provenance rather than maintaining this frontend as a canonical product.

Do not derive AXIOM capability, policy, trust, or execution authority from generated VSM scores or rationale text.

See [PORTFOLIO_STATUS.md](PORTFOLIO_STATUS.md).
