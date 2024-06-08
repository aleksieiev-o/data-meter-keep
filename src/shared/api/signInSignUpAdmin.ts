import {APIResponse} from '@/app/api/auth/APIResponse';
import {UserCredential} from '@firebase/auth';

export const signInSignUpAdmin = async (
  userCredential: UserCredential | undefined,
): Promise<APIResponse<string>> => {
  const idToken = await userCredential?.user.getIdToken();

  const response = await fetch('/api/auth/sign-in', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({idToken}),
  });

  const resBody = (await response.json()) as unknown as APIResponse<string>;

  if (response.ok && resBody.success) {
    return Promise.resolve(resBody);
  }

  return Promise.reject(resBody);
};
