import { NextRouter } from 'next/router';
import * as R from 'ramda';
import { Player } from '../../pages/api/players';

export const sortByElo = (players: Array<Player & any>) => R.sortWith([R.descend(R.prop('elo'))], players);

const dateProp = (prop: string) =>
  R.pipe(
    R.pathOr(new Date(), [prop]),
    (x) => new Date(x),
    (val) => val.getTime(),
  );

export const sortByDate = <T>(prop: string, list: T[]): T[] => R.sortWith<T>([R.descend(dateProp(prop))])(list);

export const postData = (url: string, data: Record<string, unknown> | Array<Record<string, unknown>>) =>
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());

export const refreshServerSideProps = (router: NextRouter) => router.replace(router.asPath);
