import {Skeleton} from '@/components/ui/skeleton';
import {SelectTrigger, SelectValue} from '@/components/ui/select';
import {FC} from 'react';
import {cn} from '@/lib/utils';

interface Props {
  id: string;
  placeholder: string;
  disabled: boolean;
  isDataPending: boolean;
  width: number | 'full';
}

const AppSelectTrigger: FC<Props> = (props) => {
  const {id, placeholder, disabled, isDataPending, width} = props;

  return (
    <>
      {isDataPending ? (
        <Skeleton
          className={cn(
            'h-12 rounded-md border',
            width === 'full' ? 'w-full' : `w-[${width}px]`,
          )}
        />
      ) : (
        <SelectTrigger
          id={id}
          disabled={disabled}
          className={cn('', width === 'full' ? 'w-full' : `w-[${width}px]`)}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
      )}
    </>
  );
};

export default AppSelectTrigger;
