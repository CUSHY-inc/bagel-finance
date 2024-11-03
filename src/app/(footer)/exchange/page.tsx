"use client";

import DisconnectButton from "@/components/button/DisconnectButton";
import BaseScreen from "@/components/layouts/BaseScreen";
import { useCopy } from "@/hooks/useCopy";
import { useTonConnect } from "@/hooks/useTonConnect";
import { shortenStr } from "@/lib/common";
import { fetcher } from "@/lib/swr";
import {
  Box,
  Button,
  Card,
  HStack,
  IconButton,
  Image,
  ListItem,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Select,
  Skeleton,
  Spinner,
  Text,
  UnorderedList,
  VStack,
} from "@chakra-ui/react";
import { useInitData, useInvoice } from "@telegram-apps/sdk-react";
import { useEffect, useState } from "react";
import { LuChevronDown, LuCopy, LuHistory } from "react-icons/lu";
import useSWR from "swr";
import { getExchangeLink } from "./_components/actions";
import { COIN } from "@prisma/client";
import { useRouter } from "next/navigation";
import { CHAIN } from "@tonconnect/ui-react";

const coins = [
  {
    label: COIN.TON,
    image: "/images/ton-logo.png",
    coinGeckoId: "the-open-network",
  },
  { label: COIN.USDT, image: "/images/tether-logo.png", coinGeckoId: "tether" },
];

function Item({ image, label }: { image: string; label: string }) {
  return (
    <HStack>
      <Image src={image} alt="" boxSize={6} />
      <Text>{label}</Text>
    </HStack>
  );
}

export default function Page() {
  const router = useRouter();
  const initData = useInitData();
  const invoice = useInvoice();
  const { isConnectionRestored, tonConnectUI, isConnected, address, network } =
    useTonConnect();
  const displayAddress = address?.toString({
    bounceable: false,
    testOnly: network === CHAIN.TESTNET,
  });
  const [stars, setStars] = useState(1000);
  const [amount, setAmount] = useState<number | null>(null);
  const [idx, setIdx] = useState(0);
  const { onCopy } = useCopy(displayAddress as string);
  const { data, error, isLoading, isValidating } = useSWR<{ usd: number }>(
    `/api/coinGecko/coins/${coins[idx].coinGeckoId}`,
    fetcher,
    { refreshInterval: 15000 }
  );

  useEffect(() => {
    if (isLoading || isValidating || !data) {
      setAmount(null);
      return;
    }
    if (error) {
      setAmount(null);
      return;
    }
    const starsUsd = (stars / 50) * 0.99;
    setAmount((starsUsd / data.usd) * 0.6);
  }, [stars, idx, isLoading, isValidating, data, error]);

  async function onClick() {
    if (initData?.user?.id && amount && address) {
      const invoiceLink = await getExchangeLink({
        userId: initData.user.id.toString(),
        stars,
        coin: coins[idx].label,
        amount,
        toAddress: address.toRawString(),
      });
      invoice.open(invoiceLink, "url");
    }
  }

  return (
    <BaseScreen hasBottomPadding>
      <VStack p={4} align={"stretch"} spacing={4}>
        <HStack py={4}>
          <Text flex={1} as={"b"} fontSize={"lg"} textAlign={"center"}>
            Buy crypto by Telegram Stars
          </Text>
          <IconButton
            icon={<LuHistory />}
            aria-label={""}
            onClick={() => router.push("/exchange/history")}
          />
        </HStack>
        <Card p={4}>
          <VStack align={"stretch"}>
            <Text>You spend</Text>
            <HStack>
              <Select
                variant={"unstyled"}
                size={"lg"}
                fontSize="xl"
                fontWeight="bold"
                value={stars}
                onChange={(e) => setStars(Number(e.target.value))}
              >
                <option value="1000">1000</option>
                <option value="3000">3000</option>
                <option value="5000">5000</option>
                <option value="10000">10000</option>
                <option value="20000">20000</option>
                <option value="30000">30000</option>
                <option value="50000">50000</option>
                <option value="100000">100000</option>
              </Select>
              <Text as={"b"} whiteSpace={"nowrap"} p={2}>
                ⭐️ Stars
              </Text>
            </HStack>
          </VStack>
        </Card>
        <Card p={4}>
          <VStack align={"stretch"}>
            <Text>You get</Text>
            <HStack>
              {amount ? (
                <Text flex={1} fontSize={"xl"} as={"b"}>
                  {amount.toPrecision(4)}
                </Text>
              ) : (
                <Box flex={1}>
                  <Spinner size={"sm"} />
                </Box>
              )}
              <Menu>
                <MenuButton as={Button} rightIcon={<LuChevronDown />}>
                  <Item image={coins[idx].image} label={coins[idx].label} />
                </MenuButton>
                <MenuList>
                  {coins.map((option, idx) => (
                    <MenuItem key={option.label} onClick={() => setIdx(idx)}>
                      <Item image={option.image} label={option.label} />
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
            </HStack>
          </VStack>
        </Card>
        {isConnectionRestored ? (
          isConnected ? (
            <VStack align={"stretch"}>
              <HStack>
                <Text fontSize={"sm"}>
                  To: {shortenStr(displayAddress, 6, 4)}
                </Text>
                <IconButton
                  size={"xs"}
                  icon={<LuCopy />}
                  aria-label={"Copy"}
                  onClick={onCopy}
                />
              </HStack>
              <Button colorScheme="blue" isDisabled={!amount} onClick={onClick}>
                Exchange
              </Button>
              <DisconnectButton>Disconnect</DisconnectButton>
            </VStack>
          ) : (
            <Button colorScheme="blue" onClick={() => tonConnectUI.openModal()}>
              Wallet Connect
            </Button>
          )
        ) : (
          <Button>
            <Skeleton>Wallet Connect</Skeleton>
          </Button>
        )}
        <UnorderedList color={"gray"} fontSize={"sm"}>
          <ListItem>Transaction fee:</ListItem>
          <UnorderedList pl={2}>
            <ListItem>Apple/Google: 35%</ListItem>
            <ListItem>Bagel Finance: 5%</ListItem>
            <ListItem>No gas fee</ListItem>
          </UnorderedList>
        </UnorderedList>
      </VStack>
    </BaseScreen>
  );
}
