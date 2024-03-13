export interface ICategory {
  categoryName: string;
  categoryId: string;
  createdDate: string;
  updatedDate: string;
}

export type TCreateCategoryDto = Omit<ICategory, 'categoryId' | 'createdDate' | 'updatedDate'>;
