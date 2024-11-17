"use client";

import { delay } from "@/lib/common";
import { fetcher } from "@/lib/swr";
import { TaskWithUserTasks } from "@/types/prisma";
import { Button, HStack, StackDivider, Text, VStack } from "@chakra-ui/react";
import { useInitData, useUtils } from "@telegram-apps/sdk-react";
import { useState } from "react";
import { LuCheckCircle } from "react-icons/lu";
import useSWR, { mutate } from "swr";
import { claimTask, completeTask } from "./actions";
import { useAlert } from "@/app/_components/AlertProvider";

function Task({ task }: { task: TaskWithUserTasks }) {
  const utils = useUtils();
  const [isLoading, setIsLoading] = useState(false);
  const userTask = task.userTasks[0];
  const { showAlert } = useAlert();

  async function openUrl(url: string | null) {
    if (url) {
      if (url.startsWith("https://t.me")) {
        utils.openTelegramLink(url);
      } else {
        utils.openLink(url);
      }
    }
  }

  async function onClickGo(task: TaskWithUserTasks) {
    setIsLoading(true);
    const userTask = task.userTasks[0];
    await openUrl(task.url);
    await delay(5000);
    await completeTask(userTask);
    await mutate(`/api/users/${userTask.userId}/tasks`);
    setIsLoading(false);
  }

  async function onClickClaim(task: TaskWithUserTasks) {
    setIsLoading(true);
    const userTask = task.userTasks[0];
    await delay(1000);
    await claimTask(userTask, task.bagel);
    showAlert("success", `You got ${task.bagel.toLocaleString()} $BAGEL`);
    await mutate(`/api/users/${userTask.userId}/tasks`);
    await mutate(`/api/users/${userTask.userId}/tasks/new`);
    setIsLoading(false);
  }

  return (
    <HStack>
      <VStack spacing={0} flex={1} alignItems={"start"}>
        <Text fontSize={"sm"}>{task.title}</Text>
        <Text fontSize={"xs"} color={"gray"}>
          {task.bagel.toLocaleString()} $BAGEL
        </Text>
      </VStack>
      {userTask.status === "NONE" ? (
        <Button
          colorScheme="blue"
          size={"sm"}
          onClick={() => onClickGo(task)}
          isLoading={isLoading}
        >
          Go
        </Button>
      ) : userTask.status === "COMPLETED" ? (
        <Button
          colorScheme="blue"
          size={"sm"}
          onClick={() => onClickClaim(task)}
          isLoading={isLoading}
        >
          Claim
        </Button>
      ) : (
        <Button
          size={"sm"}
          onClick={() => openUrl(task.url)}
          isLoading={isLoading}
        >
          <LuCheckCircle />
        </Button>
      )}
    </HStack>
  );
}

export default function Tasks() {
  const initData = useInitData();
  const userId = initData?.user?.id;
  const { data, error, isLoading } = useSWR<TaskWithUserTasks[]>(
    userId ? `/api/users/${userId}/tasks` : null,
    fetcher
  );

  if (error) {
    throw error;
  }

  return (
    <VStack align={"stretch"} divider={<StackDivider />}>
      {isLoading || !data ? (
        <></>
      ) : (
        data.map((task) => <Task key={task.id} task={task} />)
      )}
    </VStack>
  );
}
