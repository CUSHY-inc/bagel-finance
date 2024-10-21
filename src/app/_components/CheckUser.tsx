"use client";

import { fetcher } from "@/lib/swr";
import { useInitData } from "@telegram-apps/sdk-react";
import useSWR, { mutate } from "swr";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loading from "@/app/loading";
import Error from "@/app/error";
import { initUser, sendFirstMessage, updateUser } from "./actions";
import { UserWithLogin } from "@/types/prisma";

export default function CheckUser({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const initData = useInitData();
  const { data, error, isLoading } = useSWR<UserWithLogin>(
    initData?.user?.id ? `/api/users/${initData.user.id}` : null,
    fetcher
  );

  useEffect(() => {
    async function process() {
      if (data === null && initData?.user) {
        await initUser(initData.user, initData.startParam);
        await mutate(
          initData.user?.id ? `/api/users/${initData.user?.id}` : null
        );
      } else if (data && initData?.user) {
        await updateUser(initData.user);
      }
      if (data && !data.login.sentWelcomeMsg && initData?.user?.id) {
        await sendFirstMessage(initData.user.id.toString());
        await mutate(
          initData.user?.id ? `/api/users/${initData.user?.id}` : null
        );
      }
    }

    process();
  }, [data, initData, router]);

  if (isLoading || !data) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  return children;
}
