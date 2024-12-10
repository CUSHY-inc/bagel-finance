"use client";

import { fetcher } from "@/lib/swr";
import { useInitData } from "@telegram-apps/sdk-react";
import useSWR, { mutate } from "swr";
import { useEffect } from "react";
import Loading from "@/app/loading";
import Error from "@/app/error";
import { initUser, sendFirstMessage, updateUser } from "./actions";
import { UserWithLogin } from "@/types/prisma";

export default function CheckUser({ children }: { children: React.ReactNode }) {
  const initData = useInitData();
  const { data, error, isLoading } = useSWR<UserWithLogin>(
    initData?.user?.id ? `/api/users/${initData?.user?.id}` : null,
    fetcher
  );

  useEffect(() => {
    async function process() {
      if (!initData || !initData.user) {
        return;
      }
      if (data === null) {
        await initUser(initData.user, initData.startParam);
        await mutate(`/api/users/${initData.user.id}`);
      } else if (data) {
        await updateUser(initData.user);
        if (!data.login.sentWelcomeMsg) {
          await sendFirstMessage(initData.user.id.toString());
          await mutate(`/api/users/${initData.user.id}`);
        }
      }
    }

    process();
  }, [data, initData]);

  if (isLoading || !data) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  return children;
}
