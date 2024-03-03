import {RoutePath} from '@/shared/router/Routes.enum';
import {usePathname, useRouter} from 'next/navigation';

interface IUseChangeRoute {
  changeRoute: (to: RoutePath) => void;
}

export const useChangeRoute = (): IUseChangeRoute => {
  const {push} = useRouter();
  const pathname = usePathname();

  const changeRoute = (to: RoutePath) => {
    if (pathname !== to) {
      push(to);
    }
  };
  
  return { changeRoute };
};
