import {FC, ReactElement} from 'react';
import AuthenticationCard from '@/features/authentication/Authentication.card';

const SignInPage: FC = async (): Promise<ReactElement> => {
  return <AuthenticationCard />;
};

export default SignInPage;
