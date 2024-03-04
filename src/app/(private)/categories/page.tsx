import {FC, ReactElement} from 'react';
import ScrollContentWrapper from '@/widgets/ScrollContentWrapper';
import {categoriesColumns, ICategory} from '@/app/(private)/categories/categoriesColumns';
import CategoriesTable from '@/app/(private)/categories/CategoriesTable';

const CategoriesPage: FC = async (): Promise<ReactElement> => {
  const data: Array<ICategory> = [
    {categoryId: '12433', name: 'Category 1'},
    {categoryId: '12131', name: 'Category 21'},
    {categoryId: '12832', name: 'Category 12'},
    {categoryId: '12339', name: 'Category 4'},
    {categoryId: '12333', name: 'Category 56'},
    {categoryId: '12533', name: 'Category 74'},
    {categoryId: '12343', name: 'Category 87'},
    {categoryId: '31233', name: 'Category 9'},
    {categoryId: '12633', name: 'Category 23'},
    {categoryId: '12733', name: 'Category 45'},
    {categoryId: '12833', name: 'Category 22'},
    {categoryId: '12133', name: 'Category 72'},
  ];

  return (
    <ScrollContentWrapper>
      <CategoriesTable data={data} columns={categoriesColumns}/>
    </ScrollContentWrapper>
  );
};

export default CategoriesPage;
