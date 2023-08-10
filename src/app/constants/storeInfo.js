import { firebaseDatabase } from "../../../firebase-config";
import { firebaseStorage } from "../../../firebase-config";
import { ref as databaseRef, get } from "firebase/database";
import { ref as storageRef, getDownloadURL, listAll } from "firebase/storage";

// 개별 점포 정보 불러오기
export function getStoreInfo(marketKey, storeKey) {
  const storeRef = databaseRef(
    firebaseDatabase,
    `stores/${marketKey}/${storeKey}`
  );
  get(storeRef)
    .then((data) => {
      if (data.exists()) {
        console.log(data.val());
        return data.val();
      } else {
        console.log("No Data Available");
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

// 개별 점포 이미지 URL 불러오기
export function getStoreImage(marketKey, storeKey, setImage) {
  const imageRef = storageRef(
    firebaseStorage,
    `images/stores/${marketKey}/${storeKey}`
  );

  listAll(imageRef)
    .then((res) => {
      return res.items;
    })
    .then((list) => {
      if (list.length === 0) {
      } else {
        const itemRef = list[0];
        getDownloadURL(itemRef)
          .then((url) => {
            setImage(url);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
