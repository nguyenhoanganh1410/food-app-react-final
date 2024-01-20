import { useCallback, useContext, useEffect, useState } from 'react';
import './styles.scss';
import Contex from '../../store/Context';
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../../firebase';
import { formatCash, handleGoToTop } from '../../utils';
import { orderStatus } from '../checkout/CheckOut';

const MyOrder = () => {
  const [orders, setOrders] = useState([]);
  const { state, depatch } = useContext(Contex);
  //detructering...
  const { url, isSignedIn, user, cart, firstAdd } = state;

  const getOrders = useCallback(() => {
    try {
      const q = query(
        collection(db, 'orders'),
        where('deleted', '==', false),
        where('owner', '==', user.uid),
        orderBy('createdAt', 'desc')
      );
      const clientsLister = onSnapshot(q, (querySnapshot) => {
        let data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(data);
      });
      return () => clientsLister();
    } catch (e) {
      console.error(e);
    }
  }, [user]);

  useEffect(() => {
    //TODO: GET ORDERS
    user && getOrders();
  }, [user]);

  useEffect(() => {
    handleGoToTop();
  }, []);

  return (
    <div className='my-order'>
      <div className='container my-order-container'>
        <h4>Danh sách các đơn hàng</h4>
        <table>
          <thead>
            <tr>
              <th>Mã đơn hàng</th>
              <th>Họ và tên</th>
              <th>Địa chỉ</th>
              <th>Số điện thoại</th>
              <th>Email</th>
              <th>Tổng tiền</th>
              <th>Trạng thái</th>
              <th>Chi tiết</th>
            </tr>
          </thead>
          {orders.length == 0 && (
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <p style={{ marginTop: '1rem' }}>Không có đơn hàng!</p>
            </div>
          )}
          <tbody>
            {orders?.map((order) => {
              const handleStatus = () => {
                if(order.status === orderStatus.newOrder) return 'Chờ xác nhận'
                else if(order.status === orderStatus.shipping) return 'Đang giao hàng'
                else if(order.status === orderStatus.pending) return 'Đang làm món'
                else return 'Hoàn thành'
              }
              return (
                <tr>
                  <td>{order.id}</td>
                  <td>{order.fullName}</td>
                  <td>{order.address}</td>
                  <td>{order.phone}</td>
                  <td>{order.email}</td>

                  <td>{formatCash(order.total)}</td>
                  <td>{handleStatus()}</td>
                  <td>Chi tiết</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrder;
