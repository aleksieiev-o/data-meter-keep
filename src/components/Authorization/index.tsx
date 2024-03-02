'use client';

import {FC, ReactElement, useId, useMemo} from 'react';
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {Form} from '@/components/ui/form';
import {useToast} from '@/components/ui/use-toast';
import {useLoading} from '@/hooks/useLoading';
import AppFormFieldText from '@/components/ui/custom-ui/AppFormFields/AppFormField.text';
import AppFormFieldPassword from '@/components/ui/custom-ui/AppFormFields/AppFormField.password';
import {Button} from '@/components/ui/button';
import SubmitButton from '@/components/Authorization/Submit.button';
import {RoutePath} from '@/router/Routes.enum';
import {useChangeRoute} from '@/hooks/useChangeRoute';
import {usePathname} from 'next/navigation';
import {IAuthUserCredentialsShape} from '@/components/Authorization/types';
import {object, string, z} from 'zod';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';

const Authorization: FC = (): ReactElement => {
  const authFormID = useId();
  const { toast } = useToast();
  const {isLoading, setIsLoading} = useLoading();
  const {changeRoute} = useChangeRoute();
  const pathname = usePathname();

  const isSignInPage = useMemo(() => pathname === RoutePath.SIGN_IN, [pathname]);

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
    setIsLoading(true);

    try {
      // await sendContactsForm<z.infer<typeof formSchema>>(values);

      toast({
        title: 'Success',
        description: 'Your message has been sent.',
      });

      formModel.reset();
    } catch (err) {
      toast({
        title: 'Failure',
        description: 'Your message has not been sent. Something went wrong.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleAuthRoute = () => {
    changeRoute(isSignInPage ? RoutePath.SIGN_UP : RoutePath.SIGN_IN);
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
                <AppFormFieldText
                  mode={'input'}
                  type={'email'}
                  formModel={formModel}
                  name={'email'}
                  label={'Email'}
                  placeholder={'john.doe@company.com'}
                  required={true}
                  disabled={isLoading}/>

                <AppFormFieldPassword
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
                  onClick={() => handleToggleAuthRoute()}
                  variant={'link'}
                  disabled={isLoading}
                  title={isSignInPage ? 'Sign up' : 'Sign in'}>
                  {
                    isSignInPage ? 'Sign up' : 'Sign in'
                  }
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>

        <CardFooter className={'w-full flex items-center justify-end gap-4'}>
          <Button
            onClick={() => changeRoute(RoutePath.NOTE_LIST)}
            variant={'ghost'}
            title={'Cancel'}>
            Cancel
          </Button>

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
