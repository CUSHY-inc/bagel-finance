"use client";

import { fetcher } from "@/lib/swr";
import { useInitData } from "@telegram-apps/sdk-react";
import useSWR, { mutate } from "swr";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loading from "@/app/loading";
import Error from "@/app/error";
import { initUser, sendFirstMessage } from "./actions";
import { UserWithLogin } from "@/types/prisma";

export default function CheckUser({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const initData = useInitData();
  const userId = initData?.user?.id;
  const { data, error, isLoading } = useSWR<UserWithLogin>(
    userId ? `/api/users/${userId}` : null,
    fetcher
  );

  useEffect(() => {
    async function initialize() {
      if (data === null && initData?.user) {
        await initUser(initData.user);
        await mutate(userId ? `/api/users/${userId}` : null);
      }
      if (data && !data.login.sentWelcomeMsg && initData?.user) {
        await sendFirstMessage(initData.user.id.toString());
        await mutate(userId ? `/api/users/${userId}` : null);
      }
    }

    initialize();
  }, [data, initData, router, userId]);

  if (isLoading || !data) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  return children;
}
