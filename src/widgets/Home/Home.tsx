import {FC, ReactElement} from 'react';
import {APP_DESCRIPTION, APP_NAME} from '@/shared/appConstants';

const Home: FC = (): ReactElement => {
  return (
    <div
      className={
        'flex h-full w-full flex-col items-center justify-center gap-6 py-6'
      }
    >
      <h1 className="text-4xl font-bold">{APP_NAME}</h1>

      <p>{APP_DESCRIPTION}</p>
    </div>
  );
};

export default Home;
