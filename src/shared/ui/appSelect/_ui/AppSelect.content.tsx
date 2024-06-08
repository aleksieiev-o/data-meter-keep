import {FC} from 'react';
import {SelectContent, SelectItem} from '@/components/ui/select';

/* tslint:disable */
interface Props {
  dataList: Array<any>; // TODO fix type
  emptyDataListMessage: string;
}
/* tslint:enable */

const AppSelectContent: FC<Props> = (props) => {
  const {dataList, emptyDataListMessage} = props;

  return (
    <SelectContent>
      {dataList && dataList.length > 0 ? (
        dataList.map((category) => (
          <SelectItem key={category.categoryId} value={category.categoryId}>
            {category.categoryName}
          </SelectItem>
        ))
      ) : (
        <SelectItem value="null" disabled={true}>
          {emptyDataListMessage}
        </SelectItem>
      )}
    </SelectContent>
  );
};

export default AppSelectContent;
