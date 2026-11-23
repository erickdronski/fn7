export const BASKET_KEY = "fn7-basket";
export const BASKET_EVENT = "fn7-basket";

export function readBasket(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(BASKET_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((slug): slug is string => typeof slug === "string");
  } catch {
    return [];
  }
}

export function writeBasket(slugs: string[]) {
  window.localStorage.setItem(BASKET_KEY, JSON.stringify(slugs));
  window.dispatchEvent(new Event(BASKET_EVENT));
}

export function grabSlug(slug: string) {
  const current = readBasket();
  if (current.includes(slug)) return;
  writeBasket([...current, slug]);
}

export function dropSlug(slug: string) {
  writeBasket(readBasket().filter((item) => item !== slug));
}

export function subscribeBasket(onStoreChange: () => void) {
  window.addEventListener(BASKET_EVENT, onStoreChange);
  window.addEventListener("storage", onStoreChange);
  return () => {
    window.removeEventListener(BASKET_EVENT, onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

export function basketSnapshot(): string {
  return JSON.stringify(readBasket());
}
