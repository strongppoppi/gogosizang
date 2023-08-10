import emojiMegaphone from "public/images/emoji_megaphone.png";
import emojiSmile from "public/images/emoji_smile.png";
import emojiFire from "public/images/emoji_fire.png";

import ContentGallery from "./components/Home/ContentGallery";
import ContentHeader from "./components/Home/ContentHeader";
import FestivalCarousel from "./components/Home/FestivalCarousel";
import ShopCarousel from "./components/Home/ShopCarousel";

export default function Home() {
  return (
    <div className="flex-col grow overflow-y-scroll bg-gray-100">
      <div className="flex-col grow px-4">
        <ContentHeader
          headerText="오늘의 인기 상점"
          subText="나도 인기 상품 즐겨보기"
          linkPath="/popular"
          emoji={emojiFire}
        />
        <ShopCarousel />
      </div>
      <div className="flex grow mt-8 border-b-[1rem] border-gray-200" />
      <div className="flex-col grow px-4">
        <ContentHeader
          headerText="시장 더 즐기기"
          subText="시장을 더 재밌게 즐기는 방법들"
          linkPath="/editor"
          emoji={emojiSmile}
        />
        <ContentGallery />
      </div>
      <div className="flex grow mt-8 border-b-[1rem] border-gray-200" />
      <div className="flex-col grow px-4">
        <ContentHeader
          headerText="전국시장 축제 소식"
          subText="우리 동네의 즐거운 일들"
          emoji={emojiMegaphone}
        />
        <FestivalCarousel />
      </div>
      <div className="flex grow mt-[7rem]" />
    </div>
  );
}
