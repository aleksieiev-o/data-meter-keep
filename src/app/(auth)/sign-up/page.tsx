import {FC, ReactElement} from 'react';
import Authorization from '@/features/Authorization';

const SignUpPage: FC = async (): Promise<ReactElement> => {
  return (
    <Authorization/>
  );
};

export default SignUpPage;
