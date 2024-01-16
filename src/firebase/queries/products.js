import { collection, doc, getDoc, getDocs, orderBy, query, where } from 'firebase/firestore';
import { db } from './../index.js';

export const getProducts = async (category, priceParam) => {
  let q;

  if (category) {
    q = query(
      collection(db, 'products'),
      where('deleted', '==', false),
      where('category', '==', category),
      where('status', '==', 'active'),
      orderBy('price', priceParam ? priceParam : 'desc')
    );
  } else {
    q = query(
      collection(db, 'products'),
      where('deleted', '==', false),
      where('status', '==', 'active'),
      orderBy('price', priceParam ? priceParam : 'desc')
    );
  }
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((it) => ({
    id: it.id,
    ...it.data(),
  }));
};

export const getProductById = async (productId) => {
  const docRef = doc(db, "products", productId);
  const result = await getDoc(docRef);
  if (result.exists()) {
    return result.data();
  } else {
    return null;
  }
}