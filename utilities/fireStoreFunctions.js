import { doc, setDoc, getDoc, getDocs, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "./firebaseConfig"; 
import { Alert } from "react-native";
export const saveFavorite = async (afstemning) => {
  const user = getAuth().currentUser;
  if (!user) return;

  try {
    const favRef = doc(db, "users", user.uid, "favorites", afstemning.id.toString());  //
    await setDoc(favRef, { 
      id: afstemning.id,
      title: afstemning.Sagstrin?.Sag?.titel || "Ukendt titel",
      opdateringsdato: afstemning.opdateringsdato,  // maybe there are other metrics which would be nice to save
      timestamp: Date.now(),
    });
    console.log("Favorite saved!");
    Alert.alert("Afstemning blev gemt!")
  } catch (error) {
    console.error("Error saving favorite:", error);
  }
};

export const getAllFavorites = async() => {
    const user= getAuth().currentUser;
    if (!user)
        return
    
        const favsRef = collection(db,"users", user.uid, "favorites")
        const snapshot = await getDocs(favsRef)
        return snapshot.docs.map(doc => doc.data())
    }

const isFavorite = async (afstemningId) => {
  const user = getAuth().currentUser;
  if (!user) return false;

  const favRef = doc(db, "users", user.uid, "favorites", afstemningId.toString());
  const snapshot = await getDoc(favRef);
  return snapshot.exists();
};

