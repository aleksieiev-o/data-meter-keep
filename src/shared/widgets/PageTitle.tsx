import {FC, ReactElement} from 'react';

interface Props {
  title: string;
}

const PageTitle: FC<Props> = (props): ReactElement => {
  const {title} = props;

  return (
    <h1 className="text-ellipsis text-nowrap text-3xl font-bold">{title}</h1>
  );
};

export default PageTitle;
