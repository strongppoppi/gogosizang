import ContentHeader from "../components/Home/ContentHeader";
import DetailedContentCard from "../components/Home/DetailedContentCard";

import smileEmoji from "public/images/emoji_smile.png";

export default function Editor() {
  return (
    <div className="flex-col grow overflow-y-scroll px-4">
      <ContentHeader
        headerText="시장 더 즐기기"
        subText="시장을 더 재밌게 즐기는 방법들"
        back={true}
        emoji={smileEmoji}
      />
      <DetailedContentCard />
    </div>
  );
}
