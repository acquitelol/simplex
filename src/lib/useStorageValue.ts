import { useState, useLayoutEffect } from "react";

export const useStorageValue = <T>(
  key: string,
  def: string | null = null,
  cb: (x: string) => T,
  formatter?: (x: T) => string,
) => {
  const [value, setValue] = useState<T>(cb(localStorage.getItem(key) ?? def!));

  useLayoutEffect(() => {
    localStorage.setItem(key, (formatter ?? String)(value));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return [value, setValue] as const;
};
