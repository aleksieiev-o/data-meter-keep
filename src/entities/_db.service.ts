import {child, get, ref, remove, set, update} from '@firebase/database';
import {firebaseDataBase} from '@/lib/firebase/firebase';
import {createEndpointWithUser} from '@/entities/_vm/user';
import {EndpointsList} from '@/shared/Endpoints.enum';

export const fetchAllData = async <T>(endpoint: EndpointsList): Promise<T[]> => {
  try {
    const snapshot = await get(child(ref(firebaseDataBase), createEndpointWithUser(endpoint)));
    const result = snapshot.val() || {};
    return Promise.resolve<T[]>([...new Map<string, T>(Object.entries<T>(result)).values()]);
  } catch (err) {
    console.warn(err);
    return Promise.reject<T[]>([]);
  }
};

export const fetchDataItemById = async <T>(endpoint: EndpointsList, itemId: string): Promise<T> => {
  try {
    const snapshot = await get(child(ref(firebaseDataBase), createEndpointWithUser(EndpointsList.NOTE_BY_ID, itemId)));
    return Promise.resolve<T>(snapshot.val());
  } catch (err) {
    console.warn(err);
    return Promise.reject<T>({});
  }
};

export const updateDataItemById = async <T>(endpoint: EndpointsList, itemId: string, payload: T): Promise<void> => {
  try {
    return await update(child(ref(firebaseDataBase), `${createEndpointWithUser(endpoint)}/${itemId}`), {
      ...payload,
      updatedDate: new Date().toISOString(),
    });
  } catch (err) {
    console.warn(err);
    return Promise.reject(err);
  }
};

export const removeDataItemById = async <T>(endpoint: EndpointsList, itemId: string): Promise<void> => {
  try {
    return await remove(child(ref(firebaseDataBase), `${createEndpointWithUser(endpoint)}/${itemId}`));
  } catch (err) {
    console.warn(err);
    return Promise.reject(err);
  }
};

export const removeAllData = async <T>(endpoint: EndpointsList): Promise<void> => {
  try {
    return await set(ref(firebaseDataBase, createEndpointWithUser(endpoint)), null);
  } catch (err) {
    console.warn(err);
    return Promise.reject(err);
  }
};
