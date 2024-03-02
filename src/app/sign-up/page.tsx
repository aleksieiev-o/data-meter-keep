import {FC, ReactElement} from 'react';
import Authorization from '@/components/Authorization';

const SignUpPage: FC = async (): Promise<ReactElement> => {
  return (
    <Authorization/>
  );
};

export default SignUpPage;
