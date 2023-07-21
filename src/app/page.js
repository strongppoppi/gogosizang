import ContentGallery from "./components/Home/ContentGallery";
import ContentHeader from "./components/Home/ContentHeader";
import FestivalCarousel from "./components/Home/FestivalCarousel";
import ShopCarousel from "./components/Home/ShopCarousel";

export default function Home() {
  return (
    <div className="flex-col grow overflow-y-scroll px-4">
      <ContentHeader
        headerText="오늘의 인기 상점"
        subText="나도 인기 상품 즐겨보기"
      />
      <ShopCarousel />
      <ContentHeader
        headerText="시장 더 즐기기"
        subText="시장을 더 재밌게 즐기는 방법들"
      />
      <ContentGallery />
      <ContentHeader
        headerText="전국시장 축제 소식"
        subText="우리 동네의 즐거운 일들"
      />
      <FestivalCarousel />
    </div>
  );
}
