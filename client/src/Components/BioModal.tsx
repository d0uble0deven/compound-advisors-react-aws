import React from "react";
import styles from "../styles/BioModal.module.css";
import AdvisorInterface from "../Interfaces/AdvisorInterface";

interface BioModalProps {
  advisor: AdvisorInterface;
  onClose: () => void;
}

const BioModal: React.FC<BioModalProps> = ({ advisor, onClose }) => {
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <h2>{advisor.name}</h2>
        <img
          src={advisor.photourl || "/placeholder.svg"}
          alt={advisor.name}
          className={styles.advisorPhoto}
        />
        {advisor.bio && <p>{advisor.bio}</p>}
        <p>Email: {advisor.email}</p>
        {advisor.phone && <p>Phone: {advisor.phone}</p>}
      </div>
    </div>
  );
};

export default BioModal;
