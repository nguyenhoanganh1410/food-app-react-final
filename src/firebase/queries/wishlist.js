import {
  collection,
  getDocs,
  orderBy,
  query,
  where,
  Timestamp,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { db } from './../index.js';

export const getWishlistsInCart = async (userId) => {
  const q = query(
    collection(db, 'wishlist'),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((it) => ({
    id: it.id,
    ...it.data(),
  }));
};

export const addToWishlist = async (product) => {
  const commentDocument = await addDoc(collection(db, 'wishlist'), {
    createdAt: Timestamp.now(),
    productId: product.productId,
    userId: product.userId,
  });
  return commentDocument;
};

export const deleteProductInWishlist = async (id) => {
  const cartRef = doc(db, 'wishlist', id);
  return await deleteDoc(cartRef);
};

export const updateProductInWishlist = async (id, productParams) => {
  const userRef = doc(db, 'wishlist', id);
  return await updateDoc(userRef, productParams);
};

export const getWishlistByProductId = async (productId) => {
  const q = query(
    collection(db, 'wishlist'),
    where('productId', '==', productId)
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((it) => ({
    id: it.id,
    ...it.data(),
  }));
};
