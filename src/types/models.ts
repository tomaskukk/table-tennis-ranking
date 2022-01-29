import { Prisma, users } from '@prisma/client';
import React from 'react';

export type ExtendedHtmlAttributes<T> = React.HTMLAttributes<T>;

const matches = Prisma.validator<Prisma.matchesArgs>()({ include: { winner: true, loser: true } });

export type MatchWithRelations = Prisma.matchesGetPayload<typeof matches>;

export type PlayerWithMatchCounts = users & {
  _count: {
    wins: number;
    losses: number;
  };
};
