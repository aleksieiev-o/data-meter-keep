export interface ICategory {
  categoryId: string;
  categoryName: string;
  createdDate: string;
  updatedDate: string;
}

export type TCreateCategoryDto = Omit<ICategory, 'categoryId' | 'createdDate' | 'updatedDate'>;
