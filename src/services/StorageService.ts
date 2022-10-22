/*---------- Constant ----------*/
const ITENS_PREFIX = "chat-app";

export const setItem = (
  key: string,
  payload: string | Record<string, unknown>
): void => {
  const item = typeof payload !== "string" ? JSON.stringify(payload) : payload;
  localStorage.setItem(`${ITENS_PREFIX}:${key}`, item);
};

export const getItem = <T = string>(key: string): T | undefined => {
  const item = localStorage.getItem(`${ITENS_PREFIX}:${key}`);

  if (!item) return undefined;

  let typedItem: T;

  try {
    const parsedItem = JSON.parse(item);
    typedItem = parsedItem;
  } catch (_error) {
    typedItem = item as unknown as T;
  }

  return typedItem;
};

export const deleteItem = (key: string): void => {
  localStorage.removeItem(`${ITENS_PREFIX}:${key}`);
};
