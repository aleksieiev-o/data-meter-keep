import {FC, ReactElement} from 'react';
import Authorization from '@/components/Authorization';

const SighUpPage: FC = async (): Promise<ReactElement> => {
  return (
    <Authorization/>
  );
};

export default SighUpPage;
