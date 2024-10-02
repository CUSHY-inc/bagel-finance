import BaseScreen from "@/components/layouts/BaseScreen";
import VoteChoice from "./_components/VoteChoice";

export default function Page({ params }: { params: { choiceId: string } }) {
  return (
    <BaseScreen hasBackButton>
      <VoteChoice choiceId={params.choiceId} />
    </BaseScreen>
  );
}
