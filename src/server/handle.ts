import type { Context } from 'hono';
import { wait } from "@/helpers";

export const handle = async (c: Context) => {

    await wait(100)

    return c.json({ status: 'ok' });
}