import { Injectable } from '@angular/core';
import { CommentItem } from '../../models/comment/comment-item.dto';
import { DetailGathering } from '../../models/gathering/detail-gathering.dto';
import { JsonParser } from './base.json-parser';

@Injectable()
export class DtoJsonParser implements JsonParser {
  public parse(text: string): unknown {
    return text && text.length ? JSON.parse(text, dtoMappingReviver) : '{}';
  }
}

// Explicitly typed keys to get errors if the Dto changes
const dateProp: keyof DetailGathering = 'date';
const dateCreatedProp: keyof CommentItem = 'dateCreated';

const dtoMappingReviver = (key: string, value: unknown) => {
  // Map *GatheringDto date strings to Date objects
  if (key === dateProp) {
    return new Date(value as string) as DetailGathering[typeof dateProp]; // Type cast to reference the type
  }
  if (key === dateCreatedProp) {
    return new Date(value as string) as CommentItem[typeof dateCreatedProp]; // Type cast to reference the type
  }

  return value;
};
