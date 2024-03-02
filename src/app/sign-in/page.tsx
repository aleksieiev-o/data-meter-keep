import {FC, ReactElement} from 'react';
import Authorization from '@/components/Authorization';

const SighInPage: FC = async (): Promise<ReactElement> => {
  return (
    <Authorization/>
  );
};

export default SighInPage;
