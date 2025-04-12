import { doc, getDoc} from "firebase/firestore";
import { db } from "../firebase";

export const fetchSubscriptionDataByEmail = async (email) => {
  try {
    const userRef = doc(db, "subscriptions", email);  
    const docSnapshot = await getDoc(userRef);

    if (docSnapshot.exists()) {

      const subData = docSnapshot.data();
      const isExpired = new Date(subData.age).toISOString<=(new Date().toISOString());
      if(isExpired){
        return null;
      }
      return subData;
    } else {
      return null; 
    }
  } catch (error) {
    console.error("Error fetching subscription data:", error);
  }
};
