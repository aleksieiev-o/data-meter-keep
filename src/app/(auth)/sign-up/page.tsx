import {FC, ReactElement} from 'react';
import Authentication from '@/features/Authentication';

const SignUpPage: FC = async (): Promise<ReactElement> => {
  return (
    <Authentication/>
  );
};

export default SignUpPage;
