import {ICategory, TCreateCategoryDto} from '@/shared/types/categories.types';
import {push, ref, set} from '@firebase/database';
import {firebaseDataBase} from '@/lib/firebase/firebase';
import {EndpointsList} from '@/shared/Endpoints.enum';
import {createDataEndpoint} from '@/entities/_vm/user';
import {fetchAllData, removeAllData, removeDataItemById, updateDataItemById} from '@/entities/_db.service';

export const fetchCategories = async(userUID?: string): Promise<ICategory[]> => {
  return await fetchAllData<ICategory>(EndpointsList.CATEGORIES, userUID);
};

export const createCategory = async (payload: TCreateCategoryDto): Promise<void> => {
  try {
    const {categoryName} = payload;
    const categoriesRef = push(ref(firebaseDataBase, createDataEndpoint({endpoint: EndpointsList.CATEGORIES})));

    const category: ICategory = {
      categoryId: categoriesRef.key!,
      categoryName,
      createdDate: new Date().toISOString(),
      updatedDate: new Date().toISOString(),
    };

    return await set(categoriesRef, category);
  } catch (err) {
    console.warn(err);
    return Promise.reject(err);
  }
};

export const updateCategory = async (payload: TCreateCategoryDto, id: string): Promise<void> => {
  return await updateDataItemById(EndpointsList.CATEGORIES, id, payload);
};

export const removeCategory = async (id: string): Promise<void> => {
  return await removeDataItemById(EndpointsList.CATEGORIES, id);
};

export const removeAllCategories = async (): Promise<void> => {
  return await removeAllData(EndpointsList.CATEGORIES);
};
