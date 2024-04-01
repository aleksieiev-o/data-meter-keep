import {APIResponse} from '@/app/api/auth/APIResponse';

export const signOutAdmin = async (): Promise<APIResponse<string>> => {
  const response = await fetch('/api/auth/sign-out', {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const resBody = (await response.json()) as unknown as APIResponse<string>;

  if (response.ok && resBody.success) {
    return Promise.resolve(resBody);
  }

  return Promise.reject(resBody);
};
