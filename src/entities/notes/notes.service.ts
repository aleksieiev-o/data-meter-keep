import {INote, TCreateNoteDto} from '@/shared/types/notes.types';
import {child, DataSnapshot, get, push, ref, remove, set, update} from '@firebase/database';
import {firebaseDataBase} from '@/lib/firebase/firebase';
import {EndpointsList} from '@/shared/Endpoints.enum';
import {createEndpointWithUser} from '@/entities/_vm/user';

export const fetchNotes = async(): Promise<INote[]> => {
  const snapshot: DataSnapshot = await get(child(ref(firebaseDataBase), createEndpointWithUser(EndpointsList.NOTES)));
  const result = snapshot.val() || {};
  return Promise.resolve(Object
    .keys(result)
    .map((key) => ({ ...result[key] })) || []);
};

export const fetchNoteById = async(itemId: string): Promise<INote> => {
  const snapshot: DataSnapshot = await get(child(ref(firebaseDataBase), createEndpointWithUser(EndpointsList.NOTE_BY_ID, itemId)));
  const result = snapshot.val() || {};
  return Promise.resolve(result);
};

export const createNote = async (payload: TCreateNoteDto): Promise<void> => {
  const {noteValue, endCalculationDate, noteDescription, noteCoefficient, categoryId} = payload;
  const notesRef = push(ref(firebaseDataBase, createEndpointWithUser(EndpointsList.NOTES)));

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
};

export const updateNote = async (payload: TCreateNoteDto, id: string): Promise<void> => {
  // eslint-disable-next-line no-console
  console.log(111, payload, id);
  return await update(child(ref(firebaseDataBase), `${createEndpointWithUser(EndpointsList.NOTES)}/${id}`), {
    ...payload,
    updatedDate: new Date().toISOString(),
  });
};

export const removeNote = async (id: string): Promise<void> => {
  return await remove(child(ref(firebaseDataBase), `${createEndpointWithUser(EndpointsList.NOTES)}/${id}`));
};

export const removeAllNotes = async (): Promise<void> => {
  return await set(ref(firebaseDataBase, createEndpointWithUser(EndpointsList.NOTES)), null);
};
