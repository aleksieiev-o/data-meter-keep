import {FC, ReactElement} from 'react';
import AuthenticationCard from '@/features/authentication/Authentication.card';

const SignUpPage: FC = async (): Promise<ReactElement> => {
  return <AuthenticationCard />;
};

export default SignUpPage;
