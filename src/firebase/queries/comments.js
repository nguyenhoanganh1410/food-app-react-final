import {
  Timestamp,
  addDoc,
  collection,
  query,
  where,
  orderBy,
  getDocs,
  limit,
} from "firebase/firestore";
import { db } from './../index.js';

export const addComment = async (commentData) => {
  const commentDocument = await addDoc(collection(db, 'comments'), {
    userId: commentData.userId,
    userName: commentData.userName,
    comment: commentData.comment,
    productId: commentData.productId,
    rate: commentData.rate,
    createdAt: Timestamp.now(),
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
