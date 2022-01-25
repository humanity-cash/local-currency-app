import { useEffect, useState, useCallback } from "react";
import * as Brightness from "expo-brightness";
import { IMap } from "src/utils/types";

const defaultBrightness = 0.6;

const useBrightness = (): IMap => {
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [brightnessValue, setBrightnessValue] =
    useState<number>(defaultBrightness);

  useEffect(() => {
    (async () => {
      const { status } = await Brightness.requestPermissionsAsync();
      if (status === "granted") {
        setHasPermission(true);
        Brightness.getSystemBrightnessAsync().then((res) => {
          setBrightnessValue(res);
        });
      }
    })();
  }, []);

  const setMaxBrightness = useCallback(async () => {
    Brightness.setBrightnessAsync(1);
  }, []);

  const setDefaultBrightness = useCallback(async () => {
    Brightness.setBrightnessAsync(brightnessValue);
  }, []);

  return {
    hasPermission,
    setMaxBrightness,
    setDefaultBrightness,
  };
};

export default useBrightness;
