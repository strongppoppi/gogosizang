import { firebaseDatabase } from "../../../firebase-config";
import { ref, get } from "firebase/database";

const rankingDataRef = ref(firebaseDatabase, `rankings`);

// 점포 평점 입력하기
export function addRankingData() {}

// 점포 평점 데이터 가져오기
export function fetchRankingData({ rankingData, setRankingData }) {
  if (rankingData.length === 0) {
    get(rankingDataRef)
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
              newDataArray.push({ marketId, storeId, averageRating });
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
