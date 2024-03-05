import {ICategory, TCreateCategoryDto} from '@/app/(private)/categories/types';
import {child, push, ref, remove, set, update} from '@firebase/database';
import {firebaseDataBase} from '@/lib/firebase';
import {EndpointsList} from '@/shared/Endpoints.enum';
import {createEndpointWithUser} from '@/shared/utils';

export const createCategory = async (payload: TCreateCategoryDto): Promise<void> => {
  const {categoryName} = payload;
  const categoriesRef = push(ref(firebaseDataBase, createEndpointWithUser(EndpointsList.CATEGORIES)));

  const category: ICategory = {
    categoryId: categoriesRef.key!,
    categoryName,
    createdDate: new Date().toISOString(),
    updatedDate: new Date().toISOString(),
  };

  return await set(categoriesRef, category);
};

export const updateCategory = async (payload: TCreateCategoryDto, id: string): Promise<void> => {
  return await update(child(ref(firebaseDataBase), `${createEndpointWithUser(EndpointsList.CATEGORIES)}/${id}`), {
    ...payload,
    updatedDate: new Date().toISOString(),
  });
};

export const removeCategory = async (id: string): Promise<void> => {
  return await remove(child(ref(firebaseDataBase), `${createEndpointWithUser(EndpointsList.CATEGORIES)}/${id}`));
};

export const removeAllCategories = async (): Promise<void> => {
  return await set(ref(firebaseDataBase, createEndpointWithUser(EndpointsList.CATEGORIES)), null);
};
