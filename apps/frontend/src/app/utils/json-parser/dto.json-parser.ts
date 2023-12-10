import { Injectable } from '@angular/core';
import { DetailGathering } from '../../models/gathering/detail-gathering.dto';
import { JsonParser } from './base.json-parser';

@Injectable()
export class DtoJsonParser implements JsonParser {
  public parse(text: string): unknown {
    return text && text.length
      ? JSON.parse(text, dtoMappingReviver)
      : '{}'
  }
}

const dtoMappingReviver = (key: string, value: unknown) => {
  // Map *GatheringDto date strings to Date objects
  if (key === 'date') {
    return new Date(value as string) as DetailGathering['date']; // Type cast to reference the type
  }

  return value;
};
