import {FC, ReactElement} from 'react';
import Authentication from '@/features/authentication';

const SignUpPage: FC = async (): Promise<ReactElement> => {
  return (
    <Authentication/>
  );
};

export default SignUpPage;
