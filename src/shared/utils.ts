import {EndpointsList} from '@/shared/Endpoints.enum';
import {firebaseAuth} from '@/lib/firebase';

export const createEndpointWithUser = (endpoint: EndpointsList): string => {
  const userUid = firebaseAuth.currentUser.uid;

  try {
    return `${endpoint}`.replace('[id]', userUid);
  } catch (e) {
    return e;
  }
};
