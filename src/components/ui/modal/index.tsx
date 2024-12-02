import { useState, useEffect } from "react";
import { Modal } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import styles from "./modal.module.css";

interface PropsModal {
  title?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  supplier?: { id: number; name: string }; // Replace with the appropriate type
  // Add any other relevant props here
}

const ModalComponent: React.FC<PropsModal> = ({ title, children, onClick, supplier }) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme(); // Obtén el tema actual

  useEffect(() => {
    if (supplier) {
      setOpen(true);
    }
  }, [supplier]);

  const openClose = () => {
    setOpen(!open);
  };

  return (
    <>
      <Modal open={open} onClose={openClose}>
        <div className={styles.modal_container}>
          <div className={styles.modal} style={{ boxShadow: theme.shadows[2] }}>
            <div className={styles.header_form}>
              <span>{title}</span>
            </div>
            <div className={styles.form}>
              <div className={styles.formulary}></div>
              <div className={styles.container_input_form}>
                {children}
              </div>
            </div>
            <div className={styles.button}>
              <button className={styles.button_cancel} onClick={openClose}>
                Cerrar
              </button>
              <button className={styles.button_confirm} onClick={onClick}>
                Confirmar
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ModalComponent;