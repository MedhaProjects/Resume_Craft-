import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

export const fetchSubscriptionDataByEmail = async (email) => {
  try {
    const userRef = doc(db, "subscriptions", email);
    const docSnapshot = await getDoc(userRef);

    if (docSnapshot.exists()) {
      const subData = docSnapshot.data();
      const isExpired =
        new Date(subData.age).toISOString <= new Date().toISOString();
      if (isExpired) {
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

export const storeResume = async (template, content) => {
  try {
    let user = auth.currentUser;
    if (!user || !user.email) throw new Error("Invalid user object");
    if (typeof template !== "string")
      throw new Error("Template must be a string");
    if (!content) throw new Error("Content is required");
    const docRef = doc(db, "resumes", user.email, "templates", template);

    await setDoc(
      docRef,
      {
        uid: user.uid,
        email: user.email,
        createdAt: new Date(),
        template: String(template),
        content,
        lastModified: new Date(),
      },
      { merge: true }
    );

    console.log("Resume saved successfully");
    return true;
  } catch (error) {
    console.error("Error saving resume:", error);
    throw error; // Re-throw to handle in calling function
  }
};
