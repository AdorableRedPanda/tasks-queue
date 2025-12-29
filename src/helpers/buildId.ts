import type { ID } from '@/types';

export const buildId = () => crypto.randomUUID().slice(0, 6) as ID;
