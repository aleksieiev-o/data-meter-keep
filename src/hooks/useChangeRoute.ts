import {RoutePath} from '@/router/Routes.enum';
import {usePathname, useRouter} from 'next/navigation';

interface IUseChangeRoute {
  changeRoute: (to: RoutePath) => void;
}

export const useChangeRoute = (): IUseChangeRoute => {
  const {push} = useRouter();
  const pathname = usePathname();
  // eslint-disable-next-line no-console
  console.log(111, pathname);
  
  const changeRoute = (to: RoutePath) => {
    if (pathname !== to) {
      push(to);
    }
  };
  
  return { changeRoute };
};
