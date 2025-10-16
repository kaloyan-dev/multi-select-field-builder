const toCamelCase = (text?: string) => {
  if (!text) {
    return "";
  }

  return text
    .toLowerCase()
    .split(" ")
    .map((word, index) =>
      index === 0 ? word : word[0].toUpperCase() + word.slice(1)
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
