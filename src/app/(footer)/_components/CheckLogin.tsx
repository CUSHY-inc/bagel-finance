"use client";

import { fetcher } from "@/lib/swr";
import { useInitData } from "@telegram-apps/sdk-react";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import { Login } from "@prisma/client";
import { useEffect } from "react";
import Loading from "@/app/loading";
import Error from "@/app/error";

export default function CheckLogin({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const initData = useInitData();
  const userId = initData?.user?.id;
  const { data, error, isLoading } = useSWR<Login>(
    userId ? `/api/users/${userId}/login` : null,
    fetcher
  );
  const resetTime = new Date();
  resetTime.setUTCHours(0, 0, 0, 0);
  const isFirst = data?.bonusDay === 0;
  const isDaily =
    data && (!data?.lastBonusDate || new Date(data.lastBonusDate) < resetTime);

  useEffect(() => {
    if (isFirst) {
      router.replace("/tutorial");
    } else if (isDaily) {
      router.replace("/daily");
    }
  }, [isDaily, isFirst, router]);

  if (isLoading || isFirst || isDaily) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  return children;
}
