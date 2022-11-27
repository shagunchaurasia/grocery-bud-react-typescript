import { useEffect } from "react";

interface GroceryItemInterface {
  id: string;
  title: string;
}
interface AlertInterface {
  message: string;
  timeOut: number;
  type: string;
  removeAlert: (
    show?: boolean,
    type?: string,
    message?: string,
    timeOut?: number
  ) => void;
  list: GroceryItemInterface[];
}
const Alert = (props: AlertInterface) => {
  const timeOutPassed = props.timeOut;

  useEffect(() => {
    const timeOutFunction = setTimeout(() => {
      props.removeAlert();
    }, timeOutPassed);
    return () => clearTimeout(timeOutFunction);
  },[props, props.list, timeOutPassed]);

  return <div className={`alert alert-${props.type}`}>{props.message}</div>;
};

export default Alert;
