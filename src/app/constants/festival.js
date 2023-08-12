import { firebaseDatabase } from "../../../firebase-config";
import { ref, get } from "firebase/database";

// 개별 점포 정보 불러오기
export function getFestival() {
  const festivalRef = ref(firebaseDatabase, `festival/FESTIVAL_DATA`);
  return get(festivalRef) // return 문 추가
    .then((data) => {
      if (data.exists()) {
        console.log(data.val());
        return data.val();
      } else {
        console.log("No Data Available");
        return null;
      }
    })
    .catch((error) => {
      console.log(error);
      return null;
    });
}
