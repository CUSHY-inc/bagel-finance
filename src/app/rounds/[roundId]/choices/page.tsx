import BaseScreen from "@/components/layouts/BaseScreen";
import Choices from "./_components/Choices";

export default function Page() {
  return (
    <BaseScreen hasBottomPadding hasBackButton>
      <Choices />
    </BaseScreen>
  );
}
