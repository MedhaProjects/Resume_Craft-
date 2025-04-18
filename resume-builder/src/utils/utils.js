import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

export const getUser = () => {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe(); // stop listening once user is found
      resolve(user);
    });
  });
};

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
    let user = auth.currentUser || await getUser();
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
      }
    );

    console.log("Resume saved successfully");
    return true;
  } catch (error) {
    console.error("Error saving resume:", error);
    throw error; // Re-throw to handle in calling function
  }
};



export const getResume = async (template) => {
  try {
    const user =  await getUser();
    if (!user || !user.email) throw new Error("User not authenticated");
    const docRef = doc(db, "resumes", user.email, "templates", template);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      const resumeData = docSnapshot.data();
      return resumeData?.content;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching resume:", error);
    throw error;
  }
};


export const getAllResumes = async (email) => {
  try {
    const resumesRef = collection(db, "resumes",email,"templates");
    const snapshot = await getDocs(resumesRef);
    const resumes = snapshot.docs.map((doc,index) => ({
      id: doc.id,
      title:`Resume - ${index+1}`,
      ...doc.data(),
    }));
    return resumes;
   
  } catch (error) {
    console.log(error)
  }

};

