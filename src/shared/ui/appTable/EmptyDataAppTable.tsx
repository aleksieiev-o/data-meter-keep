import {FC, ReactElement} from 'react';

interface Props {
  text: string;
}

const EmptyDataAppTable: FC<Props> = (props): ReactElement => {
  const {text} = props;

  return (
    <div className={'w-full flex items-center justify-center px-4'}>
      <p>{text}</p>
    </div>
  );
};

export default EmptyDataAppTable;
