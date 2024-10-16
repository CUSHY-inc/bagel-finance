"use client";

import { fetcher } from "@/lib/swr";
import { useInitData } from "@telegram-apps/sdk-react";
import useSWR, { mutate } from "swr";
import { useRouter } from "next/navigation";
import { User } from "@prisma/client";
import { useEffect } from "react";
import Loading from "@/app/loading";
import Error from "@/app/error";
import { initUser } from "./actions";

export default function CheckUser({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const initData = useInitData();
  const userId = initData?.user?.id;
  const { data, error, isLoading } = useSWR<User>(
    userId ? `/api/users/${userId}` : null,
    fetcher
  );

  useEffect(() => {
    async function initUserData() {
      if (data === null && initData?.user) {
        await initUser(initData.user);
        await mutate(userId ? `/api/users/${userId}` : null);
      }
    }

    initUserData();
  }, [data, initData, router, userId]);

  if (isLoading || !data) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  return children;
}
