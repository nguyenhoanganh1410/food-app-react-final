import { toast, ToastOptions } from 'react-toastify';

//Toast Notification
export const toastConfig = {
  position: 'bottom-left',
  autoClose: 3000,
  theme: 'light',
  hideProgressBar: true,
};

export const toastError = (message) => {
  toast.error(message);
};

export const toastSuccess = (message) => {
  toast.success(message);
};

export const toastInfo = (message) => {
  toast.info(message);
};

export const toastWarning = (message) => {
  toast.warning(message);
};

export const handleGoToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

export function formatCash(str) {
  const data = str
    .toString()
    .split('')
    .reverse()
    .reduce((prev, next, index) => {
      return (index % 3 ? next : next + ',') + prev;
    });

  return data + ' ' + 'đ';
}
