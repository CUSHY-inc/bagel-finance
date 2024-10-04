import BaseScreen from "@/components/layouts/BaseScreen";
import PreviousChoices from "./_components/PreviousChoices";

export default function Page() {
  return (
    <BaseScreen hasBackButton>
      <PreviousChoices />
    </BaseScreen>
  );
}
