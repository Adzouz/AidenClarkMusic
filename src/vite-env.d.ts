/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** GA4 measurement ID (G-XXXXXXXXXX). Analytics stay disabled when unset. */
  readonly VITE_GA_MEASUREMENT_ID?: string;
}
