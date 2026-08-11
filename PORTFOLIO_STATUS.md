# VSM Explorer portfolio status

Status date: 2026-08-10

## Disposition

Historical generated concept shell. Preserve the output-diversity idea and negative findings; do not maintain this frontend as a canonical AI transparency or reasoning-inspection product.

## Exact pre-archive snapshot

`0d3b660190b9666ace758360d49fc50734f29974`

## Actual original behavior

The prototype used `@google/genai` from browser-oriented application code. Its prompt asked Gemini 2.5 Flash to return an array of 3–5 alternative responses with:

- `title`;
- `answer`;
- numeric `probability`;
- `reasoningTrace` rationale bullets.

The prompt explicitly told the model to invent varied probability-like values and said they did not need to sum to one.

No implementation was found that accessed hidden activations, logits, private chain-of-thought, latent-state sampling, or calibrated confidence.

Therefore the earlier claims/labels “Exposing the AI’s Internal Dialogue,” “internal reasoning states,” “Internal Probability,” and “Reasoning Trace” were not supported by the implementation.

## Security finding and correction

The original `vite.config.ts` loaded `GEMINI_API_KEY` and defined it into browser code as `process.env.API_KEY` / `process.env.GEMINI_API_KEY`.

That architecture could expose a real provider credential to browser clients.

The archival branch:

- removes Vite credential injection;
- changes the development bind from `0.0.0.0` to `127.0.0.1`;
- removes the browser Gemini SDK usage from `services/geminiService.ts`;
- makes `generateVSMResponse()` fail closed with an archival/security error rather than transmitting a provider key from the client.

The original executable prototype remains available in Git history at the pre-archive SHA for provenance.

## Claim correction

The archival UI describes historical result fields as:

- **model-generated score**, not internal probability/confidence;
- **generated rationale summary**, not hidden reasoning trace.

Even if a future model self-reports a confidence number or rationale, that self-report is not automatically calibrated, faithful, or causally representative of hidden computation.

## Concept salvage

Potentially reusable concept:

- request multiple materially distinct answers;
- compare alternatives in a human-readable interface;
- score diversity/quality using independently specified methods;
- add calibration only when supported by measured outcomes;
- keep generated rationales clearly separate from hidden chain-of-thought claims.

A future maintained implementation should use a server-side credential boundary and an explicit sampling/evaluation protocol rather than reusing this shell wholesale.

## AXIOM boundary

VSM-generated scores/rationales are advisory output only. They must not directly become capability grants, policy overrides, trust scores, or execution authorization.

## Archival verification

There is no committed lockfile and no behavioral test suite. The archive workflow therefore performs dependency-free static/source-contract checks and specifically verifies that the browser credential injection and direct Gemini client path are absent from the archival state.
