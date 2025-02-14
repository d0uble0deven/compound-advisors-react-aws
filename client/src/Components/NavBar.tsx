import styles from "../styles/NavBar.module.css";

const Navbar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navLinks}>
        <li className={styles.leftNav}>
          <a
          // to="/"
          >
            <svg
              className={styles.icon}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              // className="lucide lucide-house"
            >
              <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
              <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            </svg>
            {/* <Home className={styles.icon} /> */}
          </a>
        </li>
        <li className={styles.centerNav}>
          <a
            // to="https://www.fanzoo.com/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.logo}
          >
            <img
              src="/logo.png"
              // src="assets/fanzoo_logo.jpeg"
              // src="assets/FanZooLogo.png"
              alt="Compound Logo"
              className={styles.logoImage}
            />
          </a>
        </li>
        <li className={styles.rightNav}>
          <a
          // to="/Bookings"
          >
            {/* <Calendar className={styles.icon} /> */}
            <svg
              className={styles.icon}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              // className="lucide lucide-calendar"
            >
              <path d="M8 2v4" />
              <path d="M16 2v4" />
              <rect width="18" height="18" x="3" y="4" rx="2" />
              <path d="M3 10h18" />
            </svg>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
