// https://sdk-web-app.dmtp.tech/

"use client";

import { useAlert } from "@/app/_components/AlertProvider";
import { HStack, Button, Text, VStack } from "@chakra-ui/react";
import { useInitData } from "@telegram-apps/sdk-react";
import { addPoint } from "./actions";

type Item = {
  click_id: string;
  action: string;
  tui: string;
  time: number;
  ads_id: string;
};

declare const TE: {
  offerWall: () => string;
};

export function OfferWall() {
  const initData = useInitData();
  const userId = initData?.user?.id;
  const { showAlert } = useAlert();

  async function onClick() {
    if (TE && typeof TE.offerWall === "function") {
      TE.offerWall();
    } else {
      console.error("TE is not defined or offerWall is not a function");
    }
  }

  async function checkAndRewardUser() {
    const apiUrl = `https://click.dmtp.tech/banners/events?wa=KOv0WbOcK194peIdQNvWd0nt2sfzjug6vpwyC2F%2BNVE%3D&offset=0&limit=10&tui=${userId}`;
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }
      const data = await response.json();
      if (data.items && data.items.length > 0) {
        const rewardPoints = data.items.length * 1000;
        const hasClickEvent = data.items.some(
          (item: Item) => item.action === "CLICK"
        );
        if (hasClickEvent) {
          console.log(
            `Rewarding user with ${rewardPoints} points for ${data.items.length} events`
          );
          await addPoint(userId!.toString(), rewardPoints);
          showAlert(
            "success",
            `You got ${rewardPoints.toLocaleString()} $BAGEL`
          );
        } else {
          showAlert("warning", "Nothing available to claim");
        }
      } else {
        showAlert("warning", "Nothing available to claim");
      }
    } catch (error) {
      console.error("Error checking and rewarding user:", error);
    }
  }

  return (
    <HStack>
      <VStack spacing={0} flex={1} alignItems={"start"}>
        <Text fontSize={"sm"}>Get More $BAGEL</Text>
        <Text fontSize={"xs"} color={"gray"}>
          Beta Version
        </Text>
      </VStack>
      <Button
        id="openOfferWallButton"
        colorScheme="blue"
        size={"sm"}
        onClick={onClick}
      >
        Go
      </Button>
      <Button
        id="openOfferWallButton"
        colorScheme="blue"
        size={"sm"}
        onClick={checkAndRewardUser}
      >
        Claim
      </Button>
      <div id="reward-info" style={{ display: "none" }}></div>
    </HStack>
  );
}
