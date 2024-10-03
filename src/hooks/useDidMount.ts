import { initBackButton } from "@telegram-apps/sdk-react";
import { useEffect, useState } from "react";

/**
 * @return True, if component was mounted.
 */
export function useDidMount(): boolean {
  const [didMount, setDidMount] = useState(false);

  useEffect(() => {
    setDidMount(true);
    initBackButton();
  }, []);

  return didMount;
}
