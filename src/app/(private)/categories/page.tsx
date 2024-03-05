import {FC, ReactElement} from 'react';
import ScrollContentWrapper from '@/widgets/ScrollContentWrapper';
import {categoriesColumns} from '@/app/(private)/categories/categoriesColumns';
import CategoriesTable from '@/app/(private)/categories/CategoriesTable';

const CategoriesPage: FC = async (): Promise<ReactElement> => {
  const data: Array<any> = [
    {categoryId: '12433', categoryName: 'Category 1'},
    {categoryId: '12131', categoryName: 'Category 21'},
    {categoryId: '12832', categoryName: 'Category 12'},
    {categoryId: '12339', categoryName: 'Category 4'},
    {categoryId: '12333', categoryName: 'Category 56'},
    {categoryId: '12533', categoryName: 'Category 74'},
    {categoryId: '12343', categoryName: 'Category 87'},
    {categoryId: '31233', categoryName: 'Category 9'},
    {categoryId: '12633', categoryName: 'Category 23'},
    {categoryId: '12733', categoryName: 'Category 45'},
    {categoryId: '12833', categoryName: 'Category 22'},
    {categoryId: '12133', categoryName: 'Category 72'},
  ];

  return (
    <ScrollContentWrapper>
      <CategoriesTable data={data} columns={categoriesColumns}/>
    </ScrollContentWrapper>
  );
};

export default CategoriesPage;
