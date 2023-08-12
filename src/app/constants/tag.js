import { firebaseDatabase } from "../../../firebase-config";
import { ref, get, onValue } from "firebase/database";

const tagEmoji = {
  카드가능: "카드가능 💳",
  가성비: "가성비 💰",
  위생적: "위생적 ✨",
  존맛탱: "존맛탱 😍",
  친절: "친절 ☺️",
};

export function getTag(marketKey, storeKey, setTagData) {
  const tagRef = ref(firebaseDatabase, `tags/${marketKey}/${storeKey}`);

  get(tagRef)
    .then((data) => {
      if (data.exists()) {
        const tagData = data.val();
        let tagListDescOrder = [];
        for (const tag in tagData) {
          if (tagData[tag] > 0) tagListDescOrder.push(tag);
        }
        tagListDescOrder.sort((a, b) => tagData[b] - tagData[a]);
        setTagData(tagListDescOrder.map((tag) => tagEmoji[tag]));
      } else {
        console.log("점포에 태그가 없네요.");
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
