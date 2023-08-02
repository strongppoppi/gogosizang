import Image from "next/image";
import ratingImage from "/public/images/rating_grey.png";

export default function ReviewPrompt({ setShowReviewModal }) {
    return (
        <div className="w-full flex justify-center">
            <div
                onClick={() => setShowReviewModal(true)}
                className="w-11/12 h-[82px] mb-5 flex flex-col justify-around items-center border-y border-solid border-gray-200 p-2.5">
                <h3 className="text-[15px] text-black font-normal">이 상점은 어떠셨나요?</h3>
                <Image src={ratingImage} width={161} height={24} alt="별점 이미지" />
            </div>
        </div>
    )
}