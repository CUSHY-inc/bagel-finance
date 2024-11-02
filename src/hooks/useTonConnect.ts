import { useInitData } from "@telegram-apps/sdk-react";
import {
  useIsConnectionRestored,
  useTonAddress,
  useTonConnectUI,
  useTonWallet,
} from "@tonconnect/ui-react";
import { useRef } from "react";
import { Address, SenderArguments } from "ton-core";
import { upsertWallet } from "./actions";

export function useTonConnect() {
  const initData = useInitData();
  const [tonConnectUI] = useTonConnectUI();
  const isConnectionRestored = useIsConnectionRestored();
  const wallet = useTonWallet();
  const address = useTonAddress();
  const walletConnectedRef = useRef(false);

  tonConnectUI.onStatusChange(async (wallet) => {
    if (initData?.user?.id && wallet) {
      if (walletConnectedRef.current) {
        return;
      }
      upsertWallet({
        userId: initData.user.id.toString(),
        address: wallet.account.address,
      });
      walletConnectedRef.current = true;
    }
  });

  return {
    tonConnectUI,
    isConnectionRestored,
    isConnected: !!address,
    address,
    network: wallet?.account.chain ?? null,
    sender: {
      send: async (args: SenderArguments) => {
        tonConnectUI.sendTransaction({
          messages: [
            {
              address: args.to.toString(),
              amount: args.value.toString(),
              payload: args.body?.toBoc().toString("base64"),
            },
          ],
          validUntil: Date.now() + 5 * 60 * 1000,
        });
      },
      address: wallet?.account.address
        ? Address.parse(wallet.account.address as string)
        : undefined,
    },
  };
}
