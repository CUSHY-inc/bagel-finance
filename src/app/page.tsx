import NoBackButton from "@/components/telegram/NoBackButton";
import BagelPoint from "./_components/BagelPoint";
import PlayArea from "./_components/PlayArea";
import BackGround from "@/components/layouts/BackGround";

export default function Page() {
  return (
    <BackGround color="blue.500">
      <NoBackButton />
      <BagelPoint />
      <PlayArea />
    </BackGround>
  );
}
