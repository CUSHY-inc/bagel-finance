import BaseScreen from "@/components/layouts/BaseScreen";
import VoteChoices from "./_components/VoteChoices";

export default function Page() {
  return (
    <BaseScreen hasBottomPadding hasBackButton>
      <VoteChoices />
    </BaseScreen>
  );
}
