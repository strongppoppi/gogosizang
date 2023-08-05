"use client";

import { useState, useEffect } from "react";
import { firebaseDatabase, firebaseStorage } from "../../../../firebase-config";
import { ref as databaseRef, set, onValue } from "firebase/database";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import Image from "next/image";

import { addRankingData } from "@/app/constants/ranking";

import backIcon from "public/icons/arrow_left_black.png";
import yellowStar from "public/icons/rating_star_yellow.png";
import greyStar from "public/icons/rating_star_grey.png";
import addPhotoIcon from "public/icons/add_photo.png";
import marketsJson from "public/data/markets.json";

export default function ReviewModal({
  marketKey,
  storeKey,
  setShowReviewModal,
}) {
  const [storeName, setStoreName] = useState("");
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [images, setImages] = useState(null);
  const [cardTag, setCardTag] = useState(false);
  const [cheapTag, setCheapTag] = useState(false);
  const [cleanTag, setCleanTag] = useState(false);
  const [yummyTag, setYummyTag] = useState(false);
  const [kindTag, setKindTag] = useState(false);
  const [postAbled, setPostAbled] = useState(false);

  // 추후 로그인 기능 추가되면 수정
  const userId = "user";

  // 상점 이름 불러오기
  useEffect(() => {
    onValue(
      databaseRef(firebaseDatabase, `stores/${marketKey}/${storeKey}/점포명`),
      (snapshot) => {
        if (snapshot.exists()) {
          setStoreName(snapshot.val());
        } else {
          console.log("No data available");
        }
      },
      { onlyOnce: true },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  // 별점 입력하면 등록 버튼 활성화
  useEffect(() => {
    if (!postAbled && rating > 0) setPostAbled(true);
  }, [rating, postAbled]);

  const handleImageInput = (event) => {
    const images = Object.values(event.target.files);
    if (images.length > 0) {
      setImages(images);
    } else {
      setImages(null);
    }
  };

  const handlePostClick = async () => {
    const marketName = marketsJson[marketKey]["mrktNm"];

    if (!postAbled) return;

    const now = Date.now();

    // 이미지 업로드 (storage)
    var imageURLs = [];
    if (images) {
      const uploadImagePromises = images.map(async (image, index) => {
        const uploadResult = await uploadBytes(
          storageRef(firebaseStorage, `images/reviews/${userId}${now}${index}`),
          image
        );
        const downloadURL = await getDownloadURL(uploadResult.ref);
        return downloadURL;
      });
      imageURLs = await Promise.all(uploadImagePromises);
    }

    // 텍스트 업로드 (realtime database)
    set(
      databaseRef(
        firebaseDatabase,
        `reviews/${marketKey}/${storeKey}/${userId}${now}`
      ),
      {
        userId: userId,
        date: now,
        marketName: marketName,
        storeName: storeName,
        rating: rating,
        content: text,
        imageUrl: imageURLs,
        tags: [
          cardTag && "카드가능",
          cheapTag && "가성비",
          cleanTag && "위생적",
          yummyTag && "존맛탱",
          kindTag && "친절",
        ].filter(Boolean),
      }
    )
      .then(() => {
        console.log("리뷰 등록 완료");
        setShowReviewModal(false);
      })
      .catch((error) => {
        console.log("리뷰 등록 실패", error);
      });

    // reviews 외에 추가로 업데이트해야 하는 것들
    // 평균 별점 등록
    addRankingData({ marketName, storeName, rating, marketKey, storeKey });

    // tags - 태그 개수
  };

  return (
    <div className="absolute z-[100] inset-0 bg-white flex flex-col items-center">
      <div
        onClick={() => setShowReviewModal(false)}
        className="absolute top-5 left-5 w-11 h-11 rounded-lg bg-white shadow-md flex justify-center items-center"
      >
        <Image src={backIcon} width={24} height={24} alt="아이콘" />
      </div>
      <h1 className="text-base text-black font-bold mt-8 mb-14">{storeName}</h1>
      <div className="w-11/12 h-[82px] mb-6 flex flex-col justify-around items-center border-y border-solid border-gray-200 p-2.5">
        <h3 className="text-[15px] text-black font-normal">
          이 상점은 어떠셨나요?
        </h3>
        <Rating rating={rating} setRating={setRating} />
      </div>
      <div className="w-11/12 h-[130px] mb-5 flex flex-col justify-center items-center border-y border-solid border-gray-200 p-2.5">
        <h3 className="text-[15px] text-black font-normal">
          특히 이런 점이 좋았어요!
        </h3>
        <div className="w-11/12 flex flex-row justify-center flex-wrap">
          <Tag state={cardTag} setState={setCardTag}>
            카드가능
          </Tag>
          <Tag state={cheapTag} setState={setCheapTag}>
            가성비
          </Tag>
          <Tag state={cleanTag} setState={setCleanTag}>
            위생적
          </Tag>
          <Tag state={yummyTag} setState={setYummyTag}>
            존맛탱
          </Tag>
          <Tag state={kindTag} setState={setKindTag}>
            친절
          </Tag>
        </div>
      </div>
      <textarea
        className="w-[350px] min-h-[103px] resize-none bg-gray-100 border border-gray-200 rounded-[15px] px-3 py-2.5"
        placeholder="내용을 입력하세요 (선택)"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="w-[350px] py-4 space-x-2.5 flex flex-row-reverse justify-start flex-nowrap overflow-x-visible">
        <div className="w-[72px] h-[72px] shrink-0 ml-2.5 rounded-[15px] border border-gray-300 overflow-hidden">
          <label htmlFor="input-image" className="text-center align-middle">
            <div className="w-full h-full flex justify-center items-center">
              <Image
                src={addPhotoIcon}
                width={32}
                height={32}
                alt="사진 아이콘"
              />
            </div>
          </label>
          <input
            id="input-image"
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageInput}
            className="hidden"
          />
        </div>
        {images &&
          images.map((image, index) => (
            <div
              key={index}
              className="w-[72px] h-[72px] shrink-0 rounded-[15px] relative overflow-hidden"
            >
              <Image
                src={URL.createObjectURL(image)}
                fill={true}
                alt="선택한 이미지"
                className="object-cover"
              />
            </div>
          ))}
      </div>
      <div className="grow" />
      <div
        onClick={handlePostClick}
        className={`w-[330px] h-[50px] mb-5 rounded-[5px] text-center leading-[50px] text-[17px] font-medium ${
          postAbled ? "bg-main text-white" : "bg-gray-200 text-gray-600"
        }`}
      >
        등록하기
      </div>
    </div>
  );
}

function Rating({ rating, setRating }) {
  return (
    <div className="flex flex-row justify-center space-x-2">
      <Image
        src={rating >= 1 ? yellowStar : greyStar}
        width={25}
        height={24}
        alt="별 아이콘"
        onClick={() => setRating(1)}
      />
      <Image
        src={rating >= 2 ? yellowStar : greyStar}
        width={25}
        height={24}
        alt="별 아이콘"
        onClick={() => setRating(2)}
      />
      <Image
        src={rating >= 3 ? yellowStar : greyStar}
        width={25}
        height={24}
        alt="별 아이콘"
        onClick={() => setRating(3)}
      />
      <Image
        src={rating >= 4 ? yellowStar : greyStar}
        width={25}
        height={24}
        alt="별 아이콘"
        onClick={() => setRating(4)}
      />
      <Image
        src={rating >= 5 ? yellowStar : greyStar}
        width={25}
        height={24}
        alt="별 아이콘"
        onClick={() => setRating(5)}
      />
    </div>
  );
}

function Tag({ children, state, setState }) {
  const emoji = {
    카드가능: "💳",
    가성비: "💰",
    위생적: "✨",
    존맛탱: "😍",
    친절: "☺️",
  };

  return (
    <div
      onClick={() => setState(!state)}
      className={`h-[30px] align-middle rounded px-2.5 mx-2.5 my-1.5 ${
        state ? "bg-main" : "bg-gray-100"
      }`}
    >
      <h5
        className={`text-[15px] leading-[30px] ${
          state ? "font-medium text-white" : "font-normal text-gray-900"
        }`}
      >
        {`${emoji[children]} ${children}`}
      </h5>
    </div>
  );
}
