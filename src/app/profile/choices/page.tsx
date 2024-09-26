import PageTitle from "@/components/common/PageTitle";
import BackGround from "@/components/layouts/BackGround";
import BackButton from "@/components/telegram/BackButton";

export default function Page() {
  return (
    <BackGround color="blue.500">
      <BackButton />
      <PageTitle title="Previous choices" />
    </BackGround>
  );
}
