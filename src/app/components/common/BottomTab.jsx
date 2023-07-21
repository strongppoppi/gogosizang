import Link from "next/link";
import Image from "next/image";

import home_grey from "/public/icons/homeIcon_grey.png";
import home_white from "/public/icons/homeIcon_white.png";
import map_grey from "/public/icons/mapIcon_grey.png";
import map_white from "/public/icons/mapIcon_white.png";
import setting_grey from "/public/icons/settingIcon_grey.png";


export default function BottomTab() {
  return (
    <footer>
      <div className="flex flex-row justify-around mb-6 border-t-2 py-4">
        <Link href="/" className="grow justify-center items-center">
          <div className="flex-col justify-center items-center text-center space-y-1">
            <Image
              src={home_grey}
              width={25}
              height={25}
              alt="홈 아이콘"
              className="mx-auto"
            />
            <h4 className="text-base font-regular tracking-tight text-gray-500">홈</h4>
          </div>
        </Link>
        <Link href="/map" className="grow justify-center items-center">
          <div className="flex-col justify-center items-center text-center space-y-1">
            <Image
              src={map_grey}
              width={25}
              height={25}
              alt="홈 아이콘"
              className="mx-auto"
            />
            <h4 className="text-base font-regular tracking-tight text-gray-500">시장찾기</h4>
          </div>
        </Link>
        <Link href="/mypage" className="grow justify-center items-center">
          <div className="flex-col justify-center items-center text-center space-y-1">
            <Image
              src={setting_grey}
              width={25}
              height={25}
              alt="홈 아이콘"
              className="mx-auto"
            />
            <h4 className="text-base font-regular tracking-tight text-gray-500">설정</h4>
          </div>
        </Link>
      </div>
    </footer>
  );
};