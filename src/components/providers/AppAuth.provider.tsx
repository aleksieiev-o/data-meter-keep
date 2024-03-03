import {createContext, FC, PropsWithChildren, ReactElement, useEffect, useState} from 'react';
import {onAuthStateChanged, User} from '@firebase/auth';
import {firebaseAuth} from '@/lib/firebase';
import {useLoading} from '@/hooks/useLoading';
import {IUser} from '@/components/Authorization/types';

interface IAuthInitContext {
  user: IUser;
  isAuth: boolean;
  isAuthLoading: boolean;
}

export const AppAuthContext = createContext<IAuthInitContext>({
  user : {} as IUser,
  isAuth : false,
  isAuthLoading: false,
});

const AppAuthProvider: FC<PropsWithChildren> = (props): ReactElement => {
  const {children} = props;
  const {isLoading, setIsLoading} = useLoading();
  const [user, setUser] = useState<IUser>(null);
  const [isAuth, setIsAuth] = useState<boolean>(false);

  const handleReloadFirebaseUser = async (): Promise<void> => {
    await firebaseAuth.currentUser?.reload();

    if (firebaseAuth.currentUser) {
      setUser({
        uid: firebaseAuth.currentUser.uid,
        displayName: firebaseAuth.currentUser.displayName,
        email: firebaseAuth.currentUser.email,
      });
    }
  };

  const handleResetLocalData = (): void => {
    setUser({} as User);
    setIsAuth(false);
  };

  useEffect(() => {
    const handleInitApp = async (): Promise<void> => {
      await handleReloadFirebaseUser();
      setIsAuth(true);

      // if (isAuth) {
      //   await this.rootStore.settingsStore.createAppSettings();
      //   await this.rootStore.settingsStore.createGameSettings();
      // }
      //
      // await this.rootStore.settingsStore.fetchAppSettings();
      // await this.rootStore.settingsStore.fetchGameSettings();
    };

    onAuthStateChanged(firebaseAuth, async (user: User | null) => {
      setIsLoading(true);

      if (user && user.uid) {
        await handleInitApp();
      } else {
        handleResetLocalData();
      }

      setIsLoading(false);
    });
  }, [setIsLoading]);

  const appAuthContext: IAuthInitContext = {
    isAuth,
    isAuthLoading: isLoading,
    user,
  };

  return (
    <AppAuthContext.Provider value={appAuthContext}>
      {children}
    </AppAuthContext.Provider>
  );
};

export default AppAuthProvider;
