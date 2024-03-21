import {EndpointsList} from '@/shared/Endpoints.enum';
import {firebaseAuth} from '@/lib/firebase/firebase';
import {User} from '@firebase/auth';

export const getUserCredentials = (): User | null => firebaseAuth.currentUser;

export const createEndpointWithUser = (endpoint: EndpointsList, itemId: string = ''): string => {
  // TODO Fix it: The first time of all data is fetched an error "User not found" appears
  try {
    const userUid = firebaseAuth.currentUser.uid;
    return `${endpoint}`.replace('_userUID_', userUid).replace('[id]', itemId);
  } catch (err) {
    throw new Error(`An error occurred. User is not defined.\n${err}`);
  }
};
