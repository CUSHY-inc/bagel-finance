import BaseScreen from "@/components/layouts/BaseScreen";
import Game from "./_components/Game";

export default function Page() {
  return (
    <BaseScreen hasBottomPadding>
      <Game />
    </BaseScreen>
  );
}
