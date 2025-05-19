import { doc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "./firebaseConfig"; // your firebase setup file

export const saveFavorite = async (afstemning) => {
  const user = getAuth().currentUser;
  if (!user) return;

  try {
    const favRef = doc(db, "users", user.uid, "favorites", afstemning.id.toString());  // ref create a reference (like a path/to/somewhere), in this case to users/{userId}/favorites
    await setDoc(favRef, { 
      id: afstemning.id,
      title: afstemning.Sagstrin?.Sag?.titel || "Ukendt titel",
      opdateringsdato: afstemning.opdateringsdato,  // maybe there are other metrics which would be nice to save
      timestamp: Date.now(),
    });
    console.log("Favorite saved!");
  } catch (error) {
    console.error("Error saving favorite:", error);
  }
};
