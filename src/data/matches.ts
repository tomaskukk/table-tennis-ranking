import { Match } from '../../pages/api/matches';

const matches: Match[] = [
  {
    id: '1',
    winnerId: '1',
    loserId: '2',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    winnerId: '1',
    loserId: '2',
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    winnerId: '1',
    loserId: '2',
    createdAt: new Date().toISOString(),
  },
];

export default matches;
