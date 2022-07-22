import React from "react";
import { useToastContext, ADD, REMOVE_ALL } from "../Context/ToastContext";

const Danger = () => {
  const { toastDispatch } = useToastContext();
  return (
    <div>
      <button
        onClick={() =>
          toastDispatch({
            type: ADD,
            payload: {
              content: { sucess: "FAIL", message: "Something nasty!" },
              type: "emergency",
            },
          })
        }
      >
        Show danger notification
      </button>
    </div>
  );
};

export default Danger;
