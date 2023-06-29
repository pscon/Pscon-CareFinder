import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  QuerySnapshot,
  DocumentData,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD0K_Eo0mU27oF9hGP5CU-o7jQjKB-_G_0",
  authDomain: "pscon-carefinder-52436.firebaseapp.com",
  projectId: "pscon-carefinder-52436",
  storageBucket: "pscon-carefinder-52436.appspot.com",
  messagingSenderId: "173053611065",
  appId: "1:173053611065:web:08b9f5fe7f539473ab51e8",
  measurementId: "G-VNS4W4NS6K"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

interface HospitalData extends DocumentData {
  id: string;
  name: string;
  address: string;
  phoneNumber: string;
  createdAt: Date;
  city: string;
  state: string;
  website: string;
  description: string;
  nickname: string;
}

// Fetch hospitals from Firestore
export const fetchHospitalsFromFirestore = async (): Promise<
  HospitalData[]
> => {
  try {
    const hospitalsCollection = collection(db, "hospital");
    const querySnapshot: QuerySnapshot = await getDocs(hospitalsCollection);

    let hospitalsData: HospitalData[] = [];
    querySnapshot.forEach((doc) => {
      hospitalsData.push({ id: doc.id, ...doc.data() } as HospitalData);
    });

    // Listen for real-time changes in the Firestore collection
    onSnapshot(hospitalsCollection, (snapshot) => {
      const updatedHospitalsData: HospitalData[] = [];
      snapshot.forEach((doc) => {
        updatedHospitalsData.push({
          id: doc.id,
          ...doc.data(),
        } as HospitalData);
      });
      hospitalsData = updatedHospitalsData;
    });

    return hospitalsData;
  } catch (error) {
    throw new Error("Failed to fetch hospitals from Firestore.");
  }
};

// Add a new hospital to Firestore
export const addHospitalToFirestore = async (
  hospitalData: Record<string, string>
): Promise<void> => {
  try {
    const hospitalsCollection = collection(db, "hospital");

    await addDoc(hospitalsCollection, {
      name: hospitalData.name,
      address: hospitalData.address,
      phoneNumber: hospitalData.phoneNumber,
      createdAt: new Date(),
      city: hospitalData.city,
      state: hospitalData.state,
      website: hospitalData.website,
      description: hospitalData.description,
      nickname: hospitalData.nickname,
    });
  } catch (error) {
    throw new Error("Failed to add hospital to Firestore.");
  }
};

// Update a hospital in Firestore
export const updateHospitalInFirestore = async (
  id: string,
  updates: Partial<Hospital>
) => {
  const hospitalRef = doc(db, "hospitals", id);
  await updateDoc(hospitalRef, updates);
};

// Delete a hospital from Firestore
export const deleteHospitalFromFirestore = async (hospitalId: string) => {
  try {
    const hospitalRef = doc(db, "hospital", hospitalId);
    await deleteDoc(hospitalRef);
  } catch (error) {
    throw new Error("Failed to delete hospital from Firestore.");
  }
};

export default app;
