import {FC, ReactElement} from 'react';
import {Select, SelectValue} from '@radix-ui/react-select';
import {SelectContent, SelectItem, SelectTrigger} from '@/components/ui/select';

interface Props {
  CategoriesListSelect: string;
}

const CategoriesListSelect: FC<Props> = (props): ReactElement => {
  const {CategoriesListSelect} = props;

  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="light">Light</SelectItem>
        <SelectItem value="dark">Dark</SelectItem>
        <SelectItem value="system">System</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default CategoriesListSelect;
