import {
  Timestamp,
  addDoc,
  collection,
  query,
  where,
  orderBy,
  getDocs,
  limit,
} from 'firebase/firestore';
import { db } from '../index.js';

export const addOrder = async (data) => {
  const commentDocument = await addDoc(collection(db, 'orders'), {
    phone: data.phone,
    email: data.email,
    address: data.address,
    fullName: data.fullName,
    owner: data.owner,
    total: data.total,
    status: data.status,
    payment: data.payment,
    products: data.products,
    createdAt: Timestamp.now(),
    deleted: false
  });
  return commentDocument;
};

// export const getComments = async (
//   chapterId: string,
//   _limit?: number
// ): Promise<ICommentData[]> => {
//   const q = query(
//     collection(db, "comments"),
//     where("chapterId", "==", chapterId),
//     orderBy("createdAt", "desc"),
//     limit(_limit || 999)
//   );
//   const querySnapshot = await getDocs(q);
//   return querySnapshot.docs.map((it) => ({
//     id: it.id,
//     ...it.data(),
//   })) as ICommentData[];
// };
