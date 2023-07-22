import ContentHeader from "../components/Home/ContentHeader";

export default function Popular() {
  return (
    <div className="flex-col grow overflow-y-scroll px-4">
      <ContentHeader
        headerText="오늘의 인기 상점"
        subText="나도 인기 상품 즐겨보기"
        back={true}
      />
    </div>
  );
}
