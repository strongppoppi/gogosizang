import { useState } from "react";
import { firebaseDatabase, firebaseStorage } from "../../../../firebase-config";
import { ref as databaseRef, set } from "firebase/database";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import Image from "next/image";

export default function PostReview({ marketKey, storeKey }) {
    const [text, setText] = useState("");
    const [rating, setRating] = useState(0);
    const [images, setImages] = useState(null);

    const userId = "user";

    const handleImageInput = (event) => {
        const images = Object.values(event.target.files);
        console.log(images);
        setImages(images);
    };

    const handlePostClick = async () => {
        const now = Date.now();

        // 리뷰 등록 조건
        if (!images) {
            console.log("이미지 1개 이상 등록");
            return;
        }
        if (text === "") {
            console.log("리뷰 0자 이상 입력");
            return;
        }

        // 이미지 업로드 (storage)
        const uploadImagePromises = images.map(async (image, index) => {
            const uploadResult = await uploadBytes(storageRef(firebaseStorage, `images/reviews/${userId}${now}${index}`), image);
            const downloadURL = await getDownloadURL(uploadResult.ref);
            return downloadURL;
        });
        const imageURLs = await Promise.all(uploadImagePromises);

        // 텍스트 업로드 (realtime database)
        set(databaseRef(firebaseDatabase, `reviews/${marketKey}/${storeKey}/${userId}${now}`), {
            'userId': userId,
            'date': now,
            'marketName': '시장이름',
            'storeName': '상점이름',
            'rating': rating,
            'content': text,
            'imageUrl': imageURLs
        }).then(() => {
            console.log("리뷰 등록 완료");
        }).catch((error) => {
            console.log("리뷰 등록 실패", error);
        });
    };

    return (
        <div className="w-screen h-80 bg-white p-2.5">
            <div className="flex flex-row">
                <div className="w-[100px] h-[100px]">
                    <label htmlFor="input-image" >
                        <div className="w-[100px] h-[100px] bg-gray-300">사진 선택</div>
                    </label>
                    <input
                        id="input-image"
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageInput}
                        className="hidden" />
                </div>
                {images &&
                    images.map((image, index) =>
                        <div key={index} className="w-[100px] h-[100px] relative">
                            <Image src={URL.createObjectURL(image)} fill={true} alt="선택한 이미지" className="object-cover" />
                        </div>
                    )
                }
            </div>
            <textarea
                className="w-full h-20 resize-none"
                placeholder="리뷰를 작성해주세요"
                rows="7"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <div
                onClick={handlePostClick}
                className="bg-main text-center">등록하기</div>
        </div>
    )
}