import {INote, TCreateNoteDto} from '@/shared/types/notes.types';
import {push, ref, set} from '@firebase/database';
import {firebaseDataBase} from '@/lib/firebase/firebase';
import {EndpointsList} from '@/shared/Endpoints.enum';
import {createDataEndpoint} from '@/entities/_vm/user';
import {
  fetchAllData,
  fetchDataItemById,
  removeAllData,
  removeDataItemById,
  updateDataItemById
} from '@/entities/_db.service';

export const fetchNotes = async(userUID?: string): Promise<INote[]> => {
  return await fetchAllData<INote>(EndpointsList.NOTES, userUID);
};

export const fetchNoteById = async(itemId: string, userUID?: string): Promise<INote> => {
  return await fetchDataItemById<INote>(EndpointsList.NOTE_BY_ID, itemId, userUID);
};

export const createNote = async (payload: TCreateNoteDto): Promise<void> => {
  try {
    const {noteValue, endCalculationDate, noteDescription, noteCoefficient, categoryId} = payload;
    const notesRef = push(ref(firebaseDataBase, createDataEndpoint({endpoint: EndpointsList.NOTES})));

    const category: INote = {
      noteId: notesRef.key!,
      noteValue,
      endCalculationDate,
      noteDescription,
      noteCoefficient,
      categoryId,
      createdDate: new Date().toISOString(),
      updatedDate: new Date().toISOString(),
    };

    return await set(notesRef, category);
  } catch (err) {
    console.warn(err);
    return Promise.reject(err);
  }
};

export const updateNote = async (payload: TCreateNoteDto, id: string): Promise<void> => {
  return await updateDataItemById(EndpointsList.NOTES, id, payload);
};

export const removeNote = async (id: string): Promise<void> => {
  return await removeDataItemById(EndpointsList.NOTES, id);
};

export const removeAllNotes = async (): Promise<void> => {
  return await removeAllData(EndpointsList.NOTES);
};
