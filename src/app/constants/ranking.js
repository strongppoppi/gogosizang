import { firebaseDatabase } from "../../../firebase-config";
import { ref, set, onValue, get } from "firebase/database";

// 점포 평점 입력하기
export function addRankingData({
  marketKey,
  storeKey,
  rating,
  marketName,
  storeName,
}) {
  const rankingRef = ref(firebaseDatabase, `rankings/${marketKey}-${storeKey}`);
  get(rankingRef).then((snapshot) => {
    if (snapshot.exists()) {
      const existingData = snapshot.val();
      const newTotalStars = existingData.totalStars + rating;
      const newCount = existingData.count + 1;

      set(rankingRef, {
        totalStars: newTotalStars,
        count: newCount,
        marketName: marketName,
        storeName: storeName,
      }).then(() => {
        console.log("평점 갱신 완료");
      });
    } else {
      // 기존 데이터가 없을 경우 새로 생성
      set(rankingRef, {
        totalStars: rating,
        count: 1,
        marketName: marketName,
        storeName: storeName,
      }).then(() => {
        console.log("신규 평점 등록 완료");
      });
    }
  });
}

// 점포 평점 데이터 가져오기
export function fetchRankingData({ rankingData, setRankingData }) {
  if (rankingData.length === 0) {
    get(ref(firebaseDatabase, `rankings`))
      .then((data) => {
        if (data.exists()) {
          const rankingData = data.val();
          if (rankingData) {
            const newDataArray = [];
            const rankingsArray = Object.entries(rankingData);
            rankingsArray.forEach(([outerKey, innerData]) => {
              const parsedArray = outerKey.split("-");
              const marketId = parsedArray[0];
              const storeId = parsedArray[1];
              const averageRating = Number(
                innerData.totalStars / innerData.count
              );
              const marketName = innerData.marketName;
              const storeName = innerData.storeName;
              newDataArray.push({
                marketId,
                storeId,
                averageRating,
                marketName,
                storeName,
              });
            });

            setRankingData(newDataArray);
          }
        } else {
          console.log("No Data Available");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
