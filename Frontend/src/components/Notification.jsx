import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "src/assets/styles/Notification.css"

const notify = (message, type='success') => {
  if(type === 'success') toast.success(message, { autoClose: 1500, theme: "colored" });
  if(type === 'warn') toast.warn(message, { autoClose: 1500, theme: "colored" });
  if(type === 'error') toast.error(message, { autoClose: 1500, theme: "colored" });
  if(type === 'info') toast.info(message, { autoClose: 1500, theme: "colored" });
  if(type === 'default') toast(message, { autoClose: 1500, theme: "colored" });
};

window.Notification = notify;