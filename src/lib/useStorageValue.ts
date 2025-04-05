import { useState, useLayoutEffect } from "react";

export const useStorageValue = <T>(
  key: string,
  def: string | null = null,
  replacer: (x: string) => T,
  reviver?: (x: T) => string,
) => {
  const [value, setValue] = useState<T>(
    replacer(localStorage.getItem(key) ?? def!),
  );

  useLayoutEffect(() => {
    localStorage.setItem(key, (reviver ?? String)(value));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return [value, setValue] as const;
};
