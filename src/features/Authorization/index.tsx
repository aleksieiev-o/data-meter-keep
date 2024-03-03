'use client';

import {FC, ReactElement, useId, useMemo} from 'react';
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {Form} from '@/components/ui/form';
import {useToast} from '@/components/ui/use-toast';
import FormFieldText from '@/shared/ui/AppFormFields/FormField.text';
import FormFieldPassword from '@/shared/ui/AppFormFields/FormField.password';
import {Button} from '@/components/ui/button';
import SubmitButton from '@/shared/ui/Submit.button';
import {RoutePath} from '@/shared/router/Routes.enum';
import {usePathname} from 'next/navigation';
import {IAuthUserCredentialsShape} from '@/features/Authorization/types';
import {object, string, z} from 'zod';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import Link from 'next/link';
import {useCreateUserWithEmailAndPassword, useSignInWithEmailAndPassword} from 'react-firebase-hooks/auth';
import {firebaseAuth} from '@/lib/firebase';

const Authorization: FC = (): ReactElement => {
  const authFormID = useId();
  const { toast } = useToast();
  const pathname = usePathname();
  const [signInWithEmailAndPassword, , signInLoading, signInError] = useSignInWithEmailAndPassword(firebaseAuth);
  const [createUserWithEmailAndPassword, , signUpLoading, signUpError] = useCreateUserWithEmailAndPassword(firebaseAuth);

  const isSignInPage = useMemo(() => pathname === RoutePath.SIGN_IN, [pathname]);

  const isLoading = useMemo(() => signInLoading || signUpLoading, [signInLoading, signUpLoading]);

  const shape = useMemo<IAuthUserCredentialsShape>(() => ({
    email: string({ required_error: 'Field is required', invalid_type_error: 'Value must be a string' })
      .trim()
      .email('Invalid email address')
      .min(3, 'Email length must be at least 3 characters')
      .max(254, 'Email length must not exceed 254 characters'),
    password: string({ required_error: 'Field is required', invalid_type_error: 'Value must be a string' })
      .trim()
      .min(6, 'Password length must be at least 6 characters')
      .max(28, 'Password length must not exceed 28 characters'),
  }), []);

  const formSchema = useMemo(() => {
    return object<IAuthUserCredentialsShape>(shape);
  }, [shape]);

  const formModel = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleSubmitForm = async (values: z.infer<typeof formSchema>) => {
    try {
      isSignInPage ?
        await signInWithEmailAndPassword(values.email, values.password)
        :
        await createUserWithEmailAndPassword(values.email, values.password);

      const description = isSignInPage ? 'You have successfully logged in.' : 'Profile has successfully created.';

      toast({
        title: 'Success',
        description,
      });

      formModel.reset();
    } catch (err) {
      console.warn(111, err, signInError, signUpError); // TODO check and delete!
      toast({
        title: 'Failure',
        description: 'An error has occurred. Something went wrong.',
        variant: 'destructive',
      });
    }
  };

  return (
    <section className={'w-full h-full grid grid-cols-1 justify-items-center content-center'}>
      <Card className={'md:w-[550px] w-[350px] shadow-md'}>
        <CardHeader>
          <CardTitle>
            {
              isSignInPage ? 'Sign in' : 'Sign up'
            }
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Form {...formModel}>
            <form
              onSubmit={formModel.handleSubmit(handleSubmitForm)}
              id={authFormID}
              className={'w-full flex flex-col items-start justify-center gap-4'}>
              <div className={'w-full flex flex-col items-start justify-center gap-4'}>
                <FormFieldText
                  mode={'input'}
                  type={'email'}
                  formModel={formModel}
                  name={'email'}
                  label={'Email'}
                  placeholder={'john.doe@company.com'}
                  required={true}
                  disabled={isLoading}/>

                <FormFieldPassword
                  formModel={formModel}
                  disabled={isLoading}/>
              </div>

              <div className={'flex items-center justify-start'}>
                <p>
                  {
                    isSignInPage ? 'I don\'t have an account.' : 'I already have an account.'
                  }
                </p>

                <Button
                  variant={'link'}
                  disabled={isLoading}
                  title={isSignInPage ? 'Sign up' : 'Sign in'}>
                  <Link href={isSignInPage ? RoutePath.SIGN_UP : RoutePath.SIGN_IN} className={'w-full h-full'}>
                    {
                      isSignInPage ? 'Sign up' : 'Sign in'
                    }
                  </Link>
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>

        <CardFooter className={'w-full flex items-center justify-end gap-4'}>
          <SubmitButton
            formId={authFormID}
            title={isSignInPage ? 'Sign in' : 'Sign up'}
            btnBody={isSignInPage ? 'Sign in' : 'Sign up'}
            isLoading={isLoading}/>
        </CardFooter>
      </Card>
    </section>
  );
};

export default Authorization;
