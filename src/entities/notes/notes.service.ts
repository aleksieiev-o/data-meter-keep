import {INote, ICreateNoteDto} from '@/shared/types/notes.types';
import {push, ref, set} from '@firebase/database';
import {firebaseDataBase} from '@/lib/firebase/firebase';
import {EndpointsList} from '@/shared/Endpoints.enum';
import {createDataEndpoint} from '@/entities/_vm/user';
import {
  fetchAllData,
  fetchDataItemById,
  removeAllData,
  removeDataItemById,
  updateDataItemById,
} from '@/entities/_db.service';

const sortNotes = (notesList: INote[]): INote[] => {
  return notesList.sort(
    (a, b) =>
      new Date(a.endCalculationDate).getTime() -
      new Date(b.endCalculationDate).getTime(),
  );
};

export const fetchSortedWithDateNotes = async (
  userUID?: string,
): Promise<INote[]> => {
  const data = await fetchAllData<INote>(EndpointsList.NOTES, userUID);
  return sortNotes(data);
};

export const fetchNoteById = async (
  itemId: string,
  userUID?: string,
): Promise<INote> => {
  return await fetchDataItemById<INote>(
    EndpointsList.NOTE_BY_ID,
    itemId,
    userUID,
  );
};

export const createNote = async (payload: ICreateNoteDto): Promise<void> => {
  try {
    const {
      noteValue,
      endCalculationDate,
      noteDescription,
      noteCoefficient,
      categoryId,
    } = payload;
    const notesRef = push(
      ref(
        firebaseDataBase,
        createDataEndpoint({endpoint: EndpointsList.NOTES}),
      ),
    );

    const category: INote = {
      noteId: notesRef.key!,
      noteValue,
      endCalculationDate: endCalculationDate.toISOString(),
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

export const updateNote = async (
  payload: ICreateNoteDto,
  id: string,
): Promise<void> => {
  return await updateDataItemById(EndpointsList.NOTES, id, payload);
};

export const removeNote = async (id: string): Promise<void> => {
  return await removeDataItemById(EndpointsList.NOTES, id);
};

export const removeAllNotes = async (): Promise<void> => {
  return await removeAllData(EndpointsList.NOTES);
};
