import defaultImage from "/public/images/defaultImage.png";
import bubble from "/public/images/speech_bubble.png";
import backIcon from "/public/icons/arrow_left_white.png";
import uploadIcon from "/public/icons/upload_white.png";
import Image from "next/image";
import Link from "next/link";
import CurationItem from "@/app/components/Editor/CurationItem";
import MapButton from "@/app/components/Editor/MapButton";

export default function Page({ params }) {
  const slug = params.slug;

  return (
    <div className="flex-col grow overflow-y-scroll relative pb-12">
      <div id="background-image" className="w-full h-[450px] relative">
        <Image src={defaultImage} fill={true} alt="콘텐츠 사진" className="object-cover"/>
        <div className="absolute w-full h-full bg-black opacity-60"/>
        <Link href="/" className="absolute top-5 left-5">
          <Image src={backIcon} width={24} height={24} alt="뒤로가기 아이콘"/> 
        </Link>
        <Image src={uploadIcon} width={24} height={24} alt="공유하기 아이콘" className="absolute top-5 right-5"/> 
        <div className="w-full absolute bottom-0 px-[25px] pb-7">
          <div className="flex flex-row items-center">
            <div className="w-[34px] h-[34px] rounded-full relative overflow-hidden">
              <Image src={defaultImage} fill={true} alt="프로필 이미지" className="object-cover"/>
            </div>
            <h5 className="text-[15px] font-normal text-white ml-2.5">가무시&apos;s Pick!</h5>
          </div>
          <div className="text-[25px] font-bold text-white leading-8 mt-2 mb-5 break-keep">
            영천 시장에서 
            <span className="text-sub mx-1.5">무더위 날리는 방법</span>
            5가지!
          </div>
          <h3 className="text-[13px] font-normal text-white">이 무더위를 날려줄 곳들이 있다는데?</h3>
        </div>
      </div>
      <div id="curator-comment" className="w-full px-5 pt-6 mb-5 flex flex-col items-center">
        <div className="w-full flex flex-row items-center">
          <div className="w-[34px] h-[34px] rounded-full relative overflow-hidden ml-3">
            <Image src={defaultImage} fill={true} alt="프로필 이미지" className="object-cover"/>
          </div>
          <h5 className="text-[17px] font-medium text-black ml-2.5">큐레이터의 한 마디!</h5>
        </div>
        <div className="py-1">
          <div className="w-[340px] h-6 relative">
            <Image src={bubble} fill={true} alt="이미지" className="object-cover object-top" />
          </div>
          <div className="w-[340px] bg-gray-100 rounded-b-xl border-x border-b border-gray-300 px-3 pb-2.5 text-[15px] font-normal text-black break-all">
            큐레이터의 한 마디!큐레이터의 한 마디!큐레이터의 한 마디!큐레이터의 한 마디!큐레이터의 한 마디!큐레이터의 한 마디!큐레이터의 한 마디!큐레이터의 한 마디!
          </div>
        </div>
      </div>
      <CurationItem />
      <CurationItem />
      <MapButton />
    </div>
  );
}
