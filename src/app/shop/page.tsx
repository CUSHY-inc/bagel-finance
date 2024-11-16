"use client";

import BaseScreen from "@/components/layouts/BaseScreen";
import {
  Box,
  Button,
  Card,
  HStack,
  Image,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { getInvoiceLink } from "./_components/actions";
import { useInitData, useInvoice } from "@telegram-apps/sdk-react";
import useSWR from "swr";
import Loading from "@/app/loading";
import Error from "@/app/error";
import { fetcher } from "@/lib/swr";
import { formatNumber } from "@/lib/common";
import BaseAlertDialog from "@/components/alert/BaseAlertDialog";
import { useRouter } from "next/navigation";

export type BagelPack = {
  id: string;
  title: string;
  description: string;
  usd: number;
  stars: number;
  utility: { autoPick: number; earningMultiplier: number; airdrop: number };
  createdAt: Date;
  updatedAt: Date;
};

const sets = [
  { image: "/images/tonny-fire-1.png", value: 1000, bonus: 1000000 },
  { image: "/images/tonny-happy-1.png", value: 100, bonus: 50000 },
  { image: "/images/tonny-happy-2.png", value: 10, bonus: 0 },
];

export default function Page() {
  const router = useRouter();
  const disclosure = useDisclosure();
  const initData = useInitData();
  const invoice = useInvoice();
  const { data, error, isLoading } = useSWR<BagelPack>(
    "/api/packs/tasty-bagel-pack",
    fetcher
  );

  async function onClick({
    pack,
    quantity,
  }: {
    pack: BagelPack;
    quantity: number;
  }) {
    if (initData?.user?.id) {
      const invoiceLink = await getInvoiceLink({
        userId: initData?.user?.id!.toString(),
        pack,
        quantity,
      });
      invoice.open(invoiceLink, "url");
    }
  }

  if (isLoading || !data) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <BaseScreen hasBottomPadding hasBackButton>
      <VStack align={"stretch"} p={4} spacing={4}>
        <Text fontSize={"2xl"} as={"b"} textAlign={"center"}>
          Bagel Packs
        </Text>
        <Card direction={"row"} p={2} bg={"blue.200"} color={"black"}>
          <VStack align={"stretch"} w={"100%"}>
            <Text fontSize={"2xl"} as={"b"} textAlign={"center"}>
              Tasty Bagel Pack
            </Text>
            <HStack w={"100%"} align={"stretch"}>
              <Image src="/images/bagel-pack.png" alt="" boxSize={20} />
              <Box m={"auto"}>
                <Text fontSize={"sm"} as={"b"} display={"block"}>
                  🤖 Auto picking: {data.utility?.autoPick} days
                </Text>
                <Text fontSize={"sm"} as={"b"} display={"block"}>
                  🥯 Earning Multiplier: +{data.utility?.earningMultiplier} %
                </Text>
                <Text fontSize={"sm"} as={"b"} display={"block"}>
                  ⭐️ Potential for ${data.utility?.airdrop}+ airdrop
                </Text>
                <Text fontSize={"sm"} textAlign={"right"}>
                  / Pack
                </Text>
              </Box>
            </HStack>
          </VStack>
        </Card>
        <VStack align={"stretch"}>
          {sets.map((set) => (
            <Card key={set.value}>
              <HStack
                align={"stretch"}
                justifyContent={"start"}
                alignItems={"center"}
                p={2}
              >
                <Image src={set.image} alt="" boxSize={24} />
                <VStack
                  flex={1}
                  align={"stretch"}
                  justifyContent={"center"}
                  w={160}
                >
                  <VStack align={"stretch"} spacing={0}>
                    <Text fontSize={"2xl"} as={"b"} textAlign={"center"}>
                      {set.value.toLocaleString()} Packs
                    </Text>
                    {set.bonus && (
                      <Text
                        fontSize={"xs"}
                        textAlign={"center"}
                        color={"#EEC27D"}
                      >
                        +{formatNumber(set.bonus)} $BAGEL Bonus
                      </Text>
                    )}
                  </VStack>
                  <Button
                    colorScheme="blue"
                    size={"sm"}
                    onClick={() => {
                      if (set.value === 1000) {
                        disclosure.onOpen();
                      } else {
                        onClick({ pack: data, quantity: set.value });
                      }
                    }}
                  >
                    ${formatNumber(data.usd * set.value)}
                  </Button>
                </VStack>
              </HStack>
            </Card>
          ))}
          <Text fontSize={"sm"} color={"gray"} textAlign={"center"}>
            These utilities are coming soon...
          </Text>
        </VStack>
      </VStack>
      <BaseAlertDialog
        disclosure={disclosure}
        title={"Contact us"}
        body="Contact us for 1,000 Tasty Bagel Packs"
        yesButtonText="Contact"
        noButtonText="Cancel"
        onClick={() => router.push("https://t.me/Masashi_Ono0611")}
      />
    </BaseScreen>
  );
}
