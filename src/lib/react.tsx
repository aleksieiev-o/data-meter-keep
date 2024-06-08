import {
  Context,
  createContext,
  useContext,
  startTransition,
  useEffect,
  useState,
  Children,
  isValidElement,
  createElement,
  useMemo,
  useRef,
  FC,
  PropsWithChildren,
  ReactElement,
} from 'react';

export function useStrictContext<T>(context: Context<T | null>) {
  const value = useContext(context);
  if (value === null) throw new Error('Strict context not passed');
  return value as T;
}

export function createStrictContext<T>() {
  return createContext<T | null>(null);
}

interface IAppearanceDelayOptions {
  defaultValue?: boolean;
  appearanceDelay?: number;
  minDisplay?: number;
}

export const useAppearanceDelay = (
  show?: boolean,
  options = {} as IAppearanceDelayOptions,
) => {
  const {
    minDisplay = 500,
    defaultValue = false,
    appearanceDelay = 500,
  } = options;
  const [delayedShow, setDelayedShow] = useState(defaultValue);

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        startTransition(() => setDelayedShow(true));
      }, appearanceDelay);

      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        startTransition(() => setDelayedShow(false));
      }, minDisplay);

      return () => clearTimeout(timer);
    }
  }, [appearanceDelay, show, minDisplay]);

  return delayedShow;
};

export const ComposeChildren: FC<PropsWithChildren> = ({
  children,
}): ReactElement => {
  const array = Children.toArray(children);
  const last = array.pop();

  return (
    <>
      {array.reduceRight(
        (child, element) =>
          isValidElement(element)
            ? createElement(element.type, element.props, child)
            : child,
        last,
      )}
    </>
  );
};

type Fn<ARGS extends any[], R> = (...args: ARGS) => R;

export const useEventCallback = <A extends any[], R>(
  fn: Fn<A, R>,
): Fn<A, R> => {
  const ref = useRef<Fn<A, R>>(fn);

  useEffect(() => {
    ref.current = fn;
  });

  return useMemo(
    () =>
      (...args: A): R => {
        const {current} = ref;
        return current(...args);
      },
    [],
  );
};
