import {EndpointsList} from '@/shared/Endpoints.enum';
import {firebaseAuth} from '@/lib/firebase/firebase';
import {User} from '@firebase/auth';

export const getUserCredentials = (): User | null => firebaseAuth.currentUser;

export const createEndpointWithUser = (endpoint: EndpointsList): string => {
  try {
    const userUid = firebaseAuth.currentUser.uid;
    return `${endpoint}`.replace('[id]', userUid);
  } catch (e) {
    throw new Error('An error occurred. User is not defined');
  }
};
