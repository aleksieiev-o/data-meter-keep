export type TSimpleSpread<L, R> = R & Pick<L, Exclude<keyof L, keyof R>>;
