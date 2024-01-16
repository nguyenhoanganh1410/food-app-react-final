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

export const getProductsInCart = async (userId) => {
  const q = query(
    collection(db, 'cart'),
    where('deleted', '==', false),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((it) => ({
    id: it.id,
    ...it.data(),
  }));
};

export const addToCart = async (product) => {
  const commentDocument = await addDoc(collection(db, 'cart'), {
    createdAt: Timestamp.now(),
    productId: product.productId,
    userId: product.userId,
    quality: product.quality,
  });
  return commentDocument;
};

export const deleteProductInCart = async (id) => {
  console.log(id);
  const cartRef = doc(db, 'cart', id);
  return await deleteDoc(cartRef);
};

export const updateProductInCart = async (id, productParams) => {
  const userRef = doc(db, 'cart', id);
  return await updateDoc(userRef, productParams);
};

export const getCartByProductId = async (productId) => {
  const q = query(
    collection(db, 'cart'),
    where('productId', '==', productId),
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((it) => ({
    id: it.id,
    ...it.data(),
  }));
};