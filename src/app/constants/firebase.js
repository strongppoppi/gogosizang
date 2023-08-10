import { firebaseDatabase as database, firebaseStorage as storage } from "../../../firebase-config";
import { ref as databaseRef, set, push, get } from "firebase/database";


export const setData = async (data, path) => {
    try {
        await set(databaseRef(database, path), data);
        console.log("Upload successful");
    } catch(error) {
        console.log("Upload failed");
        console.log(error);
    }
}


export const pushData = async (data, path) => {
    try {
        const dataKey = push(databaseRef(database, path)).key;
        await set(databaseRef(database, path + "/" + dataKey), data);
        console.log("Upload successful (" + dataKey + ")");
    } catch(error) {
        console.log("Upload failed");
        console.log(error);
    }
}


export const getData = async (path) => {
    try {
        const snapshot = await get(databaseRef(database, path));
        console.log("Download succesful");
        return snapshot.val();
    } catch(error) {
        console.log("Download failed");
        console.log(error);
    }
}
