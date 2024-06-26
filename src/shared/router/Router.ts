import {RouteName, RoutePath} from '@/shared/router/Routes.enum';

export interface Rout {
  href: RoutePath;
  name: RouteName;
}

type Router = Array<Rout>;

export const router: Router = [
  {href: RoutePath.CATEGORY_LIST, name: RouteName.CATEGORY_LIST},
  {href: RoutePath.NOTE_LIST, name: RouteName.NOTE_LIST},
  {href: RoutePath.ANALYTICS, name: RouteName.ANALYTICS},
];
