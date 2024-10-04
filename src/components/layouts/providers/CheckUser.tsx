"use client";

import { fetcher } from "@/lib/swr";
import { useInitData } from "@telegram-apps/sdk-react";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import { initUser } from "@/services/initUser";
import { User } from "@prisma/client";
import { useEffect } from "react";
import Loading from "@/app/loading";
import Error from "@/app/error";

export default function CheckUser({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const initData = useInitData();
  const userId = initData?.user?.id;
  const { data, error, isLoading } = useSWR<User>(
    userId ? `/api/users/${userId}` : null,
    fetcher
  );

  useEffect(() => {
    if (data === null && initData?.user) {
      initUser(initData.user);
    }
  }, [data, initData, router]);

  if (isLoading || !data) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  return children;
}
