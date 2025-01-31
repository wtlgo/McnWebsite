import { H3Event } from "h3";

export const enforceCooldown = async <Event extends H3Event = H3Event>(
    event: Event,
    force: boolean,
    key: string,
    timeoutSec: number = 60
) => {
    if (!force) return false;

    const ip = getRequestIP(event, { xForwardedFor: true }) ?? "unknown";
    const storage = useStorage("cache");
    const storageKey = `misc:force_cooldown:${key}:${ip}`;

    const lastRequestTime = await storage.getItem<number>(storageKey);

    if (lastRequestTime && Date.now() - lastRequestTime < timeoutSec * 1000) {
        return false;
    }

    await storage.setItem(storageKey, Date.now(), { ttl: timeoutSec });
    return true;
};
