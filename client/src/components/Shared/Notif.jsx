import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { setErrors } from "../../store/auth/auth";
import { useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const notify = (msg, type) =>
  toast[type](msg, {
    position: "bottom-right",
  });

function Notif() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { errors } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(setErrors([]));
  }, [dispatch, location]);

  useEffect(() => {
    if (errors?.length) notify(errors[0], "error");
  }, [errors]);

  return (
    <div>
      <ToastContainer />
    </div>
  );
}

export default Notif;
