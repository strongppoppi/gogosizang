import Image from "next/image";

import defaultImage from "/public/images/defaultImage.png";

export default function FestivalCard() {
  const imageStyle = {
    borderRadius: "0.75rem",
  };

  return (
    <button>
      <div className="flex flex-col justify-center items-center">
        <Image
          src={defaultImage}
          width={250}
          height={250}
          alt="시장 콘텐츠 사진"
          style={imageStyle}
        />
      </div>
    </button>
  );
}
