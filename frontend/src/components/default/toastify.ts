import { toast, ToastOptions } from "react-toastify";

type ToastProps = {
  message: string;
  type?: "success" | "warning" | "error" | "info" | "default";
  theme?: "light" | "dark" | "colored";
};

export function Toast(props: ToastProps) {
  const { message, type, theme } = props;

  const options: ToastOptions = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    theme: theme,
  };

  switch (type) {
    case "success":
      toast.success(message, options);
      break;
    case "info":
      toast.info(message, options);
    case "warning":
      toast.warning(message, options);
      break;
    case "error":
      toast.error(message, options);
      break;
    default:
      toast(message, options);
      break;
  }
}
