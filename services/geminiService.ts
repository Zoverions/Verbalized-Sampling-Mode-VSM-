import type { AlternativeResponse } from '../types';

/**
 * Historical boundary: the original AI Studio prototype instantiated Gemini in
 * browser code and bundled GEMINI_API_KEY into the client. That is not a safe
 * credential boundary, so model execution is intentionally disabled in the
 * archived source state.
 *
 * The preserved concept is output-diversity visualization, not direct access to
 * hidden model reasoning or calibrated internal confidence. A future maintained
 * implementation must place provider credentials behind a server-side boundary
 * and define an independently testable sampling/evaluation protocol.
 */
export const generateVSMResponse = async (_query: string): Promise<AlternativeResponse[]> => {
  throw new Error(
    'Archived VSM Explorer: remote model execution is disabled. ' +
      'The historical browser-side Gemini credential path was removed for security.'
  );
};
