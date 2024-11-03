"use client";

import { useCopy } from "@/hooks/useCopy";
import { shortenStr } from "@/lib/common";
import { fetcher } from "@/lib/swr";
import {
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  HStack,
  Text,
  IconButton,
  Spinner,
} from "@chakra-ui/react";
import { Exchange } from "@prisma/client";
import { useInitData } from "@telegram-apps/sdk-react";
import { LuCopy } from "react-icons/lu";
import useSWR from "swr";
import { Address } from "ton-core";

function ToAddress({ address }: { address: string }) {
  const displayAddress = Address.parse(address).toString({ bounceable: false });
  const { onCopy } = useCopy(displayAddress);

  return (
    <HStack>
      <Text>{shortenStr(displayAddress, 6, 4)}</Text>
      <IconButton
        icon={<LuCopy />}
        size={"xs"}
        onClick={onCopy}
        aria-label={""}
      />
    </HStack>
  );
}

function TxnHash({ hash }: { hash: string | null }) {
  const { onCopy } = useCopy(hash as string);

  return hash ? (
    <HStack>
      <Text>{shortenStr(hash, 6, 4)}</Text>
      <IconButton
        icon={<LuCopy />}
        size={"xs"}
        onClick={onCopy}
        aria-label={""}
      />
    </HStack>
  ) : (
    "-"
  );
}

export default function HistoryTable() {
  const initData = useInitData();
  const userId = initData?.user?.id;
  const { data, error, isLoading } = useSWR<Exchange[]>(
    userId ? `/api/users/${userId}/exchanges` : null,
    fetcher
  );

  if (error) {
    throw error;
  }

  return (
    <TableContainer>
      <Table variant="striped" size={"sm"}>
        {(isLoading || !data) && (
          <TableCaption>
            <Spinner size={"sm"} />
          </TableCaption>
        )}
        {data?.length === 0 && <TableCaption>No exchange history</TableCaption>}
        <Thead>
          <Tr>
            <Th>Status</Th>
            <Th isNumeric>TG Stars</Th>
            <Th>Coin</Th>
            <Th>To Address</Th>
            <Th>Txn Hash</Th>
            <Th>DateTime</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data?.map((exchange) => (
            <Tr key={exchange.id}>
              <Td>{exchange.status}</Td>
              <Td isNumeric>{exchange.stars}</Td>
              <Td>
                {exchange.coin}: {exchange.amount.toPrecision(4)}
              </Td>
              <Td>
                <ToAddress address={exchange.toAddress} />
              </Td>
              <Td>
                <TxnHash hash={exchange.hash} />
              </Td>
              <Td>
                {`${new Date(
                  exchange.createdAt
                ).toLocaleDateString()} ${new Date(
                  exchange.createdAt
                ).toLocaleTimeString()}`}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
