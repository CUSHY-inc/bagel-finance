"use client";

import DisconnectButton from "@/components/button/DisconnectButton";
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
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Select,
  Skeleton,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useInitData, useInvoice } from "@telegram-apps/sdk-react";
import { CHAIN } from "@tonconnect/ui-react";
import { useState, useEffect } from "react";
import { LuChevronDown, LuCopy, LuHistory } from "react-icons/lu";
import useSWR from "swr";
import { getExchangeLink } from "./actions";
import { COIN } from "@prisma/client";
import { useRouter } from "next/navigation";

const coins = [
  {
    label: COIN.TON,
    image: "/images/ton-logo.png",
    coinGeckoId: "the-open-network",
  },
  { label: COIN.USDT, image: "/images/tether-logo.png", coinGeckoId: "tether" },
];

function Item({ image, label }: { image?: string; label: string }) {
  return (
    <HStack>
      {image && <Image src={image} alt="" boxSize={6} />}
      <Text>{label}</Text>
    </HStack>
  );
}

export default function Exchange() {
  const router = useRouter();
  const initData = useInitData();
  const userId = initData?.user?.id;
  const invoice = useInvoice();
  const { isConnectionRestored, tonConnectUI, isConnected, address, network } =
    useTonConnect();
  const displayAddress = address?.toString({
    bounceable: false,
    testOnly: network === CHAIN.TESTNET,
  });
  const [stars, setStars] = useState(500);
  const [amount, setAmount] = useState<number | null>(null);
  const [coin, setCoin] = useState(coins[0]);
  const { onCopy } = useCopy(displayAddress as string);
  const { data, error, isLoading, isValidating } = useSWR<{ usd: number }>(
    `/api/coinGecko/coins/${coin.coinGeckoId}`,
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
    setAmount(Number(((starsUsd / data.usd) * 0.6).toPrecision(6)));
  }, [stars, isLoading, isValidating, data, error]);

  async function onClick() {
    if (userId && amount && address) {
      const invoiceLink = await getExchangeLink({
        userId: userId.toString(),
        stars,
        coin: coin.label,
        amount,
        toAddress: address.toRawString(),
      });
      invoice.open(invoiceLink, "url");
    }
  }

  return (
    <VStack align={"stretch"}>
      <HStack justifyContent={"space-between"}>
        {displayAddress ? (
          <HStack justifyContent={"center"}>
            <Text fontSize={"sm"}>To: {shortenStr(displayAddress, 6, 4)}</Text>
            <IconButton
              size={"xs"}
              icon={<LuCopy />}
              aria-label={"Copy"}
              onClick={onCopy}
            />
          </HStack>
        ) : (
          <Box></Box>
        )}
        <Button
          size={"sm"}
          leftIcon={<LuHistory />}
          onClick={() => router.push("/exchange/history")}
        >
          History
        </Button>
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
              <option value="100">100</option>
              <option value="150">150</option>
              <option value="250">250</option>
              <option value="350">350</option>
              <option value="500">500</option>
              <option value="750">750</option>
              <option value="1000">1000</option>
              <option value="3000">3000</option>
              <option value="5000">5000</option>
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
                {amount}
              </Text>
            ) : (
              <Box flex={1}>
                <Spinner size={"sm"} />
              </Box>
            )}
            <Menu>
              <MenuButton as={Button} rightIcon={<LuChevronDown />}>
                <Item image={coin.image} label={coin.label} />
              </MenuButton>
              <MenuList>
                {coins.map((option, idx) => (
                  <MenuItem
                    key={option.label}
                    onClick={() => setCoin(coins[idx])}
                  >
                    <Item image={option.image} label={option.label} />
                  </MenuItem>
                ))}
                <MenuItem>
                  <Item label={"TON+ (Coming soon)"} />
                </MenuItem>
                <MenuItem>
                  <Item label={"Meme Index (Coming soon)"} />
                </MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        </VStack>
      </Card>
      {isConnectionRestored ? (
        isConnected ? (
          <>
            <Button colorScheme="blue" isDisabled={!amount} onClick={onClick}>
              Exchange
            </Button>
            <DisconnectButton>Disconnect</DisconnectButton>
          </>
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
    </VStack>
  );
}
