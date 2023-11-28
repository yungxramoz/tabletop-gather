import { Injectable } from '@angular/core';
import { Gathering } from '../../models/gathering/gathering.dto';
import { JsonParser } from './base.json-parser';

@Injectable()
export class DtoJsonParser implements JsonParser {
  public parse(text: string): unknown {
    return JSON.parse(text, dtoMappingReviver);
  }
}

const dtoMappingReviver = (key: string, value: unknown) => {
  // Map *GatheringDto date strings to Date objects
  if (key === 'date') {
    return new Date(value as string) as Gathering['date']; // Type cast to reference the type
  }

  return value;
};
