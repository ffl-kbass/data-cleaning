import styles from "./Edit.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useContext, useEffect } from "react";
import { SelectedContext } from "../../Context/context";
import { useToastContext, ADD, REMOVE_ALL } from "../../Context/ToastContext";
import Add from "./Add";
import Edit from "./Edit";

const EditBar = () => {
  const { toastDispatch } = useToastContext();
  const [modal, setModal] = useState({
    edit: false,
    add: false,
  });
  const { selected } = useContext(SelectedContext);

  const toggleModal = (target) => {
    const items = Object.keys(modal).reduce((accumulator, key) => {
      return { ...accumulator, [key]: target == key ? !modal[key] : false };
    }, {});

    setModal(items);
  };

  return (
    <>
      {modal.edit && <Edit />}
      {modal.add && <Add />}
      <div className="flex flex-col w-auto fixed z-40 bottom-36 gap-2">
        {/* <p className='font-bold text-xs pl-2'>Services</p> */}
        <nav className={styles.container}>
          {selected.length == 0 && (
            <motion.div initial={{ y: "2rem" }} animate={{ y: "0rem" }}>
              <button onClick={() => toggleModal("add")}>Add</button>
            </motion.div>
          )}
          {selected.length == 1 && (
            <motion.div initial={{ y: "2rem" }} animate={{ y: "0rem" }}>
              <button onClick={() => toggleModal("add")}>Add</button>
              <button>Delete</button>
              <button onClick={() => toggleModal("edit")}>Edit</button>
              <button>Deallocate</button>
            </motion.div>
          )}
          {selected.length > 1 && (
            <motion.div initial={{ y: "2rem" }} animate={{ y: "0rem" }}>
              <button onClick={() => toggleModal("add")}>Add</button>
              <button>Delete</button>
              <button>Deallocate</button>
            </motion.div>
          )}
        </nav>
      </div>
    </>
  );
};

export default EditBar;
