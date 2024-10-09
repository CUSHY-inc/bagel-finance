"use client";

import { fetcher } from "@/lib/swr";
import { VoteWithDetails } from "@/types/prisma";
import { useInitData } from "@telegram-apps/sdk-react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { useEffect } from "react";
import Loading from "@/app/loading";
import Error from "@/app/error";

export default function CheckResult({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const initData = useInitData();
  const userId = initData?.user?.id;
  const { data, error, isLoading } = useSWR<VoteWithDetails>(
    userId ? `/api/users/${userId}/votes/result` : null,
    fetcher
  );

  useEffect(() => {
    if (data) {
      router.replace("/result");
    }
  }, [data, router]);

  if (isLoading || data || data === undefined) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  return children;
}
