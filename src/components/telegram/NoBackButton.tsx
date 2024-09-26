"use client";

import { useBackButton } from "@telegram-apps/sdk-react";

export default function NoBackButton() {
  const bb = useBackButton();
  bb.on("click", () => {});
  bb.hide();

  return <></>;
}
