import React, { useEffect, useState } from "react";
import styles from "../styles/AccountsModal.module.css";
import axios from "axios";
import HoldingsPieChart from "./HoldingsPieChart";

import AccountInterface from "../Interfaces/AccountInterface";

interface AccountsModalProps {
  advisorId: string | number;
  advisorName: string;
  onClose: () => void;
}

const AccountsModal: React.FC<AccountsModalProps> = ({
  advisorId,
  advisorName,
  onClose,
}) => {
  const [accounts, setAccounts] = useState<AccountInterface[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("AccountsModal - VITE_API_URL: ", import.meta.env.VITE_API_URL);
    axios;
    // .get(`http://localhost:5001/advisors/${advisorId}/accounts`)
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/advisors/${advisorId}/accounts`)
      .then((res) => setAccounts(res.data))
      .catch((err) => console.error("Error fetching accounts:", err))
      .finally(() => setLoading(false));
  }, [advisorId]);

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <h2>{advisorName}'s Accounts</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          accounts.map((account) => (
            <div key={account.id} className={styles.accountContainer}>
              <div className={styles.holdingsSection}>
                <div>
                  <h3>{account.name}</h3>
                  <p>
                    <strong>Account Number:</strong> {account.number}
                  </p>
                  <p>
                    <strong>Custodian:</strong> {account.custodian}
                  </p>

                  <h4>Holdings</h4>
                  {account.holdings.length > 0 ? (
                    <ul className={styles.custodianList}>
                      {account.holdings.map((h, index) => (
                        <li key={index}>
                          <strong>{h.ticker}</strong>: {h.units} units @ $
                          {h.unitprice.toLocaleString()} ({h.percentage}%)
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No holdings found.</p>
                  )}
                </div>

                <div className={styles.pieChartContainer}>
                  <HoldingsPieChart holdings={account.holdings} />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AccountsModal;
