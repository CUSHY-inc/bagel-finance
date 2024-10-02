import BaseScreen from "@/components/layouts/BaseScreen";
import Vote from "./_components/Vote";

export default function Page() {
  return (
    <BaseScreen hasBackButton>
      <Vote />
    </BaseScreen>
  );
}
