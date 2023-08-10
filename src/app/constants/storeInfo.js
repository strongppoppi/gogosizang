import { firebaseDatabase } from "../../../firebase-config";
import { ref, get } from "firebase/database";

// 개별 점포 정보 불러오기
export function getStoreInfo({ marketKey, storeKey }) {
  const storeRef = ref(firebaseDatabase, `stores/${marketKey}/${storeKey}`);
  get(storeRef)
    .then((data) => {
      if (data.exists()) {
        return data.val();
      } else {
        console.log("No Data Available");
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
