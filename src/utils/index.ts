import R from 'ramda';

export const findById = <T extends { id: string }>(id: string) => R.find<T>(R.propEq('id', id));
