'use client';

import {FC, ReactElement, useContext, useId, useMemo} from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {Form} from '@/components/ui/form';
import {useToast} from '@/components/ui/use-toast';
import AppFormInputText from '@/shared/ui/appInput/AppFormInput.text';
import AppFormInputPassword from '@/shared/ui/appInput/AppFormInput.password';
import {Button} from '@/components/ui/button';
import SubmitButton from '@/shared/ui/appButton/Submit.button';
import {RoutePath} from '@/shared/router/Routes.enum';
import {usePathname, useRouter} from 'next/navigation';
import {z} from 'zod';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import Link from 'next/link';
import {signInSignUpAdmin} from '@/shared/api/signInSignUpAdmin';
import {AppAuthContext} from '@/shared/providers/AppAuth.provider';

const AuthenticationCard: FC = (): ReactElement => {
  const authFormID = useId();
  const {toast} = useToast();
  const pathname = usePathname();
  const {replace} = useRouter();
  const {
    signInWithEmailAndPassword,
    signInLoading,
    signInError,
    createUserWithEmailAndPassword,
    signUpLoading,
    signUpError,
  } = useContext(AppAuthContext);

  const isSignInPage = useMemo(
    () => pathname === RoutePath.SIGN_IN,
    [pathname],
  );

  const isLoading = useMemo(
    () => signInLoading || signUpLoading,
    [signInLoading, signUpLoading],
  );

  const authSchema = useMemo(
    () =>
      z.object({
        email: z
          .string({
            required_error: 'Field is required',
            invalid_type_error: 'Value must be a string',
          })
          .trim()
          .email('Invalid email address')
          .min(3, 'Email length must be at least 3 characters')
          .max(254, 'Email length must not exceed 254 characters'),
        password: z
          .string({
            required_error: 'Field is required',
            invalid_type_error: 'Value must be a string',
          })
          .trim()
          .min(6, 'Password length must be at least 6 characters')
          .max(28, 'Password length must not exceed 28 characters'),
      }),
    [],
  );

  const formModel = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleSubmitForm = async (values: z.infer<typeof authSchema>) => {
    try {
      const userCredential = isSignInPage
        ? await signInWithEmailAndPassword(values.email, values.password)
        : await createUserWithEmailAndPassword(values.email, values.password);

      await signInSignUpAdmin(userCredential);

      const description = isSignInPage
        ? 'You signed in successfully.'
        : 'Profile created successfully.';

      toast({title: 'Success', description});

      formModel.reset();

      replace(RoutePath.CATEGORY_LIST);
    } catch (err: unknown) {
      switch (signInError?.code || signUpError?.code) {
        case 'auth/invalid-credential': {
          toast({
            title: 'Failure',
            description: 'Wrong email or password.',
            variant: 'destructive',
          });
          break;
        }
        case 'auth/wrong-password': {
          toast({
            title: 'Failure',
            description: 'Wrong email or password.',
            variant: 'destructive',
          });
          break;
        }
        case 'auth/user-not-found': {
          toast({
            title: 'Failure',
            description: 'User not found.',
            variant: 'destructive',
          });
          break;
        }
        case 'auth/email-already-in-use': {
          toast({
            title: 'Failure',
            description: 'This email is already in use.',
            variant: 'destructive',
          });
          break;
        }
        default: {
          toast({
            title: 'Failure',
            description: 'An error has occurred. Something went wrong.',
            variant: 'destructive',
          });
          console.warn(err);
        }
      }
    }
  };

  return (
    <section
      className={
        'grid h-full w-full grid-cols-1 content-center justify-items-center'
      }
    >
      <Card className={'w-[350px] shadow-md md:w-[550px]'}>
        <CardHeader>
          <CardTitle>{isSignInPage ? 'Sign in' : 'Sign up'}</CardTitle>
        </CardHeader>

        <CardContent>
          <Form {...formModel}>
            <form
              onSubmit={formModel.handleSubmit(handleSubmitForm)}
              id={authFormID}
              className={
                'flex w-full flex-col items-start justify-center gap-4'
              }
            >
              <div
                className={
                  'flex w-full flex-col items-start justify-center gap-4'
                }
              >
                <AppFormInputText
                  mode={'input'}
                  type={'email'}
                  formModel={formModel}
                  name={'email'}
                  label={'Email'}
                  placeholder={'john.doe@company.com'}
                  required={true}
                  disabled={isLoading}
                  isDataPending={false}
                />

                <AppFormInputPassword
                  formModel={formModel}
                  disabled={isLoading}
                />
              </div>

              <div className={'flex items-center justify-start'}>
                <p>
                  {isSignInPage
                    ? `"I don't have an account."`
                    : 'I already have an account.'}
                </p>

                <Button
                  variant={'link'}
                  disabled={isLoading}
                  title={isSignInPage ? 'Sign up' : 'Sign in'}
                >
                  <Link
                    href={isSignInPage ? RoutePath.SIGN_UP : RoutePath.SIGN_IN}
                    className={'h-full w-full'}
                  >
                    {isSignInPage ? 'Sign up' : 'Sign in'}
                  </Link>
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>

        <CardFooter className={'flex w-full items-center justify-end gap-4'}>
          <SubmitButton
            formId={authFormID}
            title={isSignInPage ? 'Sign in' : 'Sign up'}
            btnBody={isSignInPage ? 'Sign in' : 'Sign up'}
            isLoading={isLoading}
            disabled={false}
          />
        </CardFooter>
      </Card>
    </section>
  );
};

export default AuthenticationCard;
