import Image from "next/image";
import editIcon from "/public/icons/edit_white.png";
import defaultProfile from "/public/images/default_profile.png";
import chevronRight from "/public/icons/chevron_right_grey.png";

export default function MyPage() {

  const LoggedIn = () => (
    <div className="w-full p-5 flex flex-col items-end">
      <div className="w-[94px] h-[31px] bg-black rounded-[10px] flex flex-row justify-evenly items-center mb-2.5">
        <Image src={editIcon} width={14} height={14} alt="편집 아이콘"/>
        <h5 className="text-sm text-white font-normal">편집하기</h5>
      </div>
      <div className="w-full h-[111px] bg-white rounded-[20px] flex flex-row justify-start items-center p-2.5 mb-5">
        <div className="w-14 h-14 rounded-full relative overflow-hidden">
          <Image src={defaultProfile} fill={true} alt="프로필 사진" />
        </div>
        <div className="ml-2.5">
          <h1 className="text-[17px] text-gray-800 font-medium leading-6">심효훈</h1>
          <h1 className="text-[15px] text-gray-500 font-normal leading-6">go-sijang@eojin.com</h1>
        </div>
      </div>
      <div className="w-full h-[74px] flex flex-row justify-stretch">
        <div className="grow h-full bg-white rounded-[20px] mr-5 text-[15px] text-black font-normal text-center leading-[74px]">
          내가 쓴 리뷰
        </div>
        <div className="grow h-full bg-white rounded-[20px] text-[15px] text-black font-normal text-center leading-[74px]">
          스크랩한 글
        </div>
      </div>
    </div>
  );

  const LoggedOut = () => (
    <div className="w-full p-5 flex flex-col">
      <div className="w-full h-[111px] bg-white rounded-[20px] flex flex-row justify-between items-center mt-[41px]">
        <div className="ml-[25px]">
          <h1 className="text-[17px] text-gray-800 font-medium leading-6">로그인하기</h1>
          <h1 className="text-[15px] text-gray-500 font-normal leading-6">로그인하면 더 많은 기능을 이용할 수 있어요!</h1>
        </div>
        <Image src={chevronRight} width={42} height={42} alt="프로필 사진" className="mr-[5px]" />
      </div>
    </div>
  )

  return (
    <div className="grow flex flex-col bg-gray-100 overflow-y-scroll">
      <LoggedOut />
      <div className="w-full h-[14px] bg-gray-200"/>
      <div className="w-full p-5 flex flex-col space-y-3">
        <div className="w-full h-11 rounded-[10px] bg-white px-4 text-[15px] text-black font-normal leading-[44px]">
          알림 설정
        </div>
        <div className="w-full h-11 rounded-[10px] bg-white px-4 text-[15px] text-black font-normal leading-[44px]">
          이용 안내
        </div>
        <div className="w-full h-11 rounded-[10px] bg-white px-4 text-[15px] text-black font-normal leading-[44px]">
          서비스 문의
        </div>
        <div className="w-full h-11 rounded-[10px] bg-white px-4 text-[15px] text-black font-normal leading-[44px]">
          계정 관리
        </div>
        <div className="w-full h-11 rounded-[10px] bg-white px-4 text-[15px] text-black font-normal leading-[44px]">
          버전 정보
        </div>
      </div>
    </div>
  );
}
