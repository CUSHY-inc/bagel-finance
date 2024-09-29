import BagelPoint from "./_components/BagelPoint";
import PlayArea from "./_components/PlayArea";
import BaseScreen from "@/components/layouts/BaseScreen";

export default function Page() {
  return (
    <BaseScreen color="blue.500">
      <BagelPoint />
      <PlayArea />
    </BaseScreen>
  );
}
