import {ICategory} from '@/shared/types/categories.types';

export interface INote {
  noteValue: number;
  endCalculationDate: string;
  noteDescription: string;
  noteCoefficient: number;
  categoryId: ICategory['categoryId'];
  noteId: string;
  createdDate: string;
  updatedDate: string;
}

export type TCreateNoteDto = Omit<INote, 'noteId' | 'categoryId' | 'createdDate' | 'updatedDate'>;
