import { useEffect, useState } from "react";
import axios from "axios";
import { Table, Callout } from "@radix-ui/themes";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import styles from "./styles/App.module.css";
import BioModal from "./Components/BioModal";
import AccountsModal from "./Components/AccountsModal";
import Navbar from "./Components/NavBar";
import Footer from "./Components/Footer";

import AdvisorInterface from "./Interfaces/AdvisorInterface";

function App() {
  const [advisors, setAdvisors] = useState([]);
  const [filteredAdvisors, setFilteredAdvisors] = useState([]);
  const [selectedAdvisor, setSelectedAdvisor] = useState(null);
  const [selectedAccountAdvisor, setSelectedAccountAdvisor] =
    useState<AdvisorInterface | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  useEffect(() => {
    console.log("App - VITE_API_URL: ", import.meta.env.VITE_API_URL);
    axios.get(`${import.meta.env.VITE_API_URL}/api/advisors`).then((res) => {
      setAdvisors(res.data);
      setFilteredAdvisors(res.data);
    });
  }, []);

  const handleSearch = (event: any) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = advisors.filter((advisor: AdvisorInterface) => {
      return (
        advisor.name.toLowerCase().includes(query) ||
        advisor.totalassets?.toString().includes(query) ||
        advisor.custodians.some((c) => c.name.toLowerCase().includes(query))
      );
    });

    setFilteredAdvisors(filtered);
  };

  const handleSort = (column: any) => {
    let direction = sortDirection === "asc" ? "desc" : "asc";
    setSortDirection(direction);
    setSortColumn(column);

    const sortedData = [...filteredAdvisors].sort((a: any, b: any) => {
      let aValue, bValue;

      if (column === "totalAssets") {
        aValue = a.totalassets;
        bValue = b.totalassets;
      } else if (column === "name") {
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
      }

      if (direction === "asc") return aValue > bValue ? 1 : -1;
      return aValue < bValue ? 1 : -1;
    });

    setFilteredAdvisors(sortedData);
  };

  return (
    <div className={styles.container}>
      <Navbar />

      <h1>Compound Advisors</h1>

      <Callout.Root size="2" variant="soft" className={styles.callout}>
        <Callout.Icon>
          <InfoCircledIcon />
        </Callout.Icon>
        <Callout.Text>
          Interact with the table below to learn more about the advisors of
          Compound Planning.
        </Callout.Text>
      </Callout.Root>

      <input
        type="text"
        placeholder="Search advisors, assets, or custodians..."
        className={styles.searchBar}
        value={searchQuery}
        onChange={handleSearch}
      />

      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell onClick={() => handleSort("name")}>
              Advisor
              {sortColumn === "name"
                ? sortDirection === "asc"
                  ? "⬆"
                  : "⬇"
                : ""}
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell onClick={() => handleSort("totalAssets")}>
              Total Assets
              {sortColumn === "totalAssets"
                ? sortDirection === "asc"
                  ? "⬆"
                  : "⬇"
                : ""}
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Custodians</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Accounts</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {filteredAdvisors.map((advisor: any) => (
            <Table.Row key={advisor.id}>
              <Table.RowHeaderCell className={styles.advisorCell}>
                <img
                  src={advisor.photourl}
                  alt={advisor.name}
                  className={styles.advisorImage}
                />
                <div>{advisor.name}</div>
                <button
                  onClick={() => setSelectedAdvisor(advisor)}
                  className={styles.bioButton}
                >
                  View Bio
                </button>
              </Table.RowHeaderCell>

              <Table.Cell>${advisor.totalassets.toLocaleString()}</Table.Cell>

              <Table.Cell>
                <ul className={styles.custodianList}>
                  {advisor.custodians?.length > 0 ? (
                    advisor.custodians.map((c: any, index: any) => (
                      <li key={index}>{c.name}</li>
                    ))
                  ) : (
                    <li>N/A</li>
                  )}
                </ul>
              </Table.Cell>

              <Table.Cell>
                <button
                  onClick={() => setSelectedAccountAdvisor(advisor)}
                  className={styles.accountButton}
                >
                  Show Accounts
                </button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>

      {selectedAdvisor && (
        <BioModal
          advisor={selectedAdvisor}
          onClose={() => setSelectedAdvisor(null)}
        />
      )}

      {selectedAccountAdvisor && (
        <AccountsModal
          advisorId={selectedAccountAdvisor.id}
          advisorName={selectedAccountAdvisor.name}
          onClose={() => setSelectedAccountAdvisor(null)}
        />
      )}
      <Footer />
    </div>
  );
}

export default App;
