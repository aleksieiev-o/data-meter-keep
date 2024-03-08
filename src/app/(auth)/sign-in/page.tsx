import {FC, ReactElement} from 'react';
import Authentication from '@/features/authentication';

const SignInPage: FC = async (): Promise<ReactElement> => {
  return (
    <Authentication/>
  );
};

export default SignInPage;
