import { Injectable } from '@angular/core';

/**
 * Base class for parsing JSON.
 */
@Injectable()
export abstract class JsonParser {
  /**
   * Parses a JSON string.
   *
   * @param {string} text - The JSON to parse
   * @returns {unknown} The parsed JSON
   */
  public abstract parse(text: string): unknown;
}
