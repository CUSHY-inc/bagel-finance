"use client";

import { useBackButton } from "@telegram-apps/sdk-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  const bb = useBackButton();
  bb.on("click", () => {
    bb.hide();
    router.back();
  });
  bb.show();

  return <></>;
}
