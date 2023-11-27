import { Injectable } from '@angular/core';

@Injectable()
export abstract class JsonParser {
  public abstract parse(text: string): unknown;
}
