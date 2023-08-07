import toast from "react-hot-toast";
import { Notify } from "../types/Notify.type";

export const getNotifications = (notifyEntity: Notify | null) => {
  if (!notifyEntity) return;
  console.log(notifyEntity);
  
  if (notifyEntity.type === 'success') {
    return toast.success(notifyEntity.message, {
      icon: '👏',
      style: {
        borderRadius: '10px',
        background: '#282E33',
        color: '#fff',
        textAlign: 'center',
        zIndex: 9999
      },
    });
  }
  return toast.error(notifyEntity.message, {
    // icon: '👏',
    style: {
      borderRadius: '10px',
      background: '#282E33',
      color: '#fff',
      textAlign: 'center',
      zIndex: 9999,
    },
  });
};