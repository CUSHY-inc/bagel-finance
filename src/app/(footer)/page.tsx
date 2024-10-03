"use client";

import BaseScreen from "@/components/layouts/BaseScreen";
import { fetcher } from "@/lib/swr";
import { VoteWithRoundAndChoiceWithDetails } from "@/types/prisma";
import { useInitData } from "@telegram-apps/sdk-react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import Loading from "../loading";
import Error from "../error";
import Home from "./_components/Home";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();
  const initData = useInitData();
  const userId = initData?.user?.id;
  const { data, error, isLoading } = useSWR<VoteWithRoundAndChoiceWithDetails>(
    userId ? `/api/users/${userId}/votes/result` : null,
    fetcher
  );

  useEffect(() => {
    if (data) {
      router.replace("/result");
    }
  }, [data, router]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  return data ? (
    <Loading />
  ) : (
    <BaseScreen footerPadding>
      <Home />
    </BaseScreen>
  );
}
