import { NextRouter } from 'next/router';
import * as R from 'ramda';
import { Player } from '../../pages/api/players';

export const sortByElo = (players: Player[]) => R.sortWith([R.descend(R.prop('elo'))], players);

export const postData = (url: string, data: Record<string, unknown> | Array<Record<string, unknown>>) =>
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());

export const refreshServerSideProps = (router: NextRouter) => router.replace(router.asPath);
