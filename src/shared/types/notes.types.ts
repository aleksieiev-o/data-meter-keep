import {TSimpleSpread} from '@/shared/types/types';

export interface INote {
  noteValue: number;
  endCalculationDate: string;
  noteDescription: string;
  noteCoefficient: number;
  categoryId: string;
  noteId: string;
  createdDate: string;
  updatedDate: string;
}

export interface INoteAugmented extends INote {
  categoryName: string;
}

type TCreateNote = Omit<INote, 'noteId' | 'createdDate' | 'updatedDate'>;

export interface ICreateNoteDto
  extends TSimpleSpread<TCreateNote, {endCalculationDate: Date}> {}
