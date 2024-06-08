'use client';

import {FC, PropsWithChildren, ReactElement, useState} from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';

const queryClientOptions = {
  defaultOptions: {
    queries: {
      gcTime: 3 * 24 * 60 * 60 * 1000,
    },
  },
};

const AppReactQueryProvider: FC<PropsWithChildren> = (props): ReactElement => {
  const {children} = props;
  const [queryClient] = useState(() => new QueryClient(queryClientOptions));

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default AppReactQueryProvider;
