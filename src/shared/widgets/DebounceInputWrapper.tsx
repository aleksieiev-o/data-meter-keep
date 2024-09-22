import {FC, ReactElement, PropsWithChildren, useEffect, useState} from 'react';

interface Props extends PropsWithChildren {
  initialValue: string;
  onChange: (event: any) => void;
  debounce: number;
}

const DebounceInputWrapper: FC<Props> = (props): ReactElement => {
  const {children, initialValue, onChange, debounce = 500} = props;
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [debounce, onChange, value]);

  return (
    <input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default DebounceInputWrapper;
