/**
 * Type declarations for pretext.js — a text layout and line-breaking library.
 */

/** Opaque handle returned by prepare / prepareWithSegments. Do not access internals. */
export interface PreparedText {
  readonly widths: readonly number[];
}

export interface LinePosition {
  segmentIndex: number;
  graphemeIndex: number;
}

/** A fully materialised line with its display text and character range. */
export interface LayoutLine {
  text: string;
  width: number;
  start: LinePosition;
  end: LinePosition;
}

/** A line range without materialised text — cheaper to produce. */
export interface LayoutLineRange {
  width: number;
  start: LinePosition;
  end: LinePosition;
}

export interface LayoutResult {
  lineCount: number;
  height: number;
  lines: LayoutLine[];
}

export interface LayoutCountResult {
  lineCount: number;
  height: number;
}

export interface ProfileResult {
  analysisMs: number;
  measureMs: number;
  totalMs: number;
  analysisSegments: number;
  preparedSegments: number;
  breakableSegments: number;
}

export interface PrepareOptions {
  whiteSpace?: string;
}

/** Prepare text for layout without grapheme segment data. */
export function prepare(text: string, font: string, options?: PrepareOptions): PreparedText;

/** Prepare text for layout, including grapheme segment data (needed for layoutWithLines). */
export function prepareWithSegments(text: string, font: string, options?: PrepareOptions): PreparedText;

/** Profile the prepare phase and return timing/segment counts. */
export function profilePrepare(text: string, font: string, options?: PrepareOptions): ProfileResult;

/** Count lines and total height without materialising line text. */
export function layout(prepared: PreparedText, maxWidth: number, lineHeight: number): LayoutCountResult;

/** Layout all lines and return their text and dimensions. */
export function layoutWithLines(prepared: PreparedText, maxWidth: number, lineHeight: number): LayoutResult;

/** Return the next line starting from `start` (pass null for the first line). */
export function layoutNextLine(prepared: PreparedText, start: LayoutLineRange | null, maxWidth: number): LayoutLine | null;

/** Walk each line range without materialising text, calling onLine for each. Returns line count. */
export function walkLineRanges(prepared: PreparedText, maxWidth: number, onLine: (line: LayoutLineRange) => void): number;

/** Change the locale used for text analysis. Clears internal caches. */
export function setLocale(locale: string): void;

/** Clear all internal measurement and analysis caches. */
export function clearCache(): void;
