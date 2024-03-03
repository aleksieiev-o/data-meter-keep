import {FC, ReactElement} from 'react';
import Authorization from '@/features/Authorization';

const SignInPage: FC = async (): Promise<ReactElement> => {
  return (
    <Authorization/>
  );
};

export default SignInPage;
