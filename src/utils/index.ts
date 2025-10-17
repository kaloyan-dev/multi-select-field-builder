const toCamelCase = (text?: string) => {
  if (!text) {
    return "";
  }

  return text
    .trim()
    .split(/\s+/)
    .map((word, index) =>
      index === 0
        ? word.toLowerCase()
        : word[0].toUpperCase() + word.slice(1).toLowerCase()
    )
    .join("");
};

const storageGet = (key: string) => {
  const item = localStorage.getItem(key);

  if (!item) {
    return null;
  }

  return JSON.parse(item);
};

const storageSet = (key: string, value: Record<string, unknown>) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const storageClean = (key: string) => {
  localStorage.removeItem(key);
};

export { toCamelCase, storageGet, storageSet, storageClean };
