# Compound Dashboard

## Overview

Compound Dashboard is a fully responsive web application that allows users to learn more about their financial advisors and make informed decisions. Users can explore advisors' personal details, specializations, holdings, and assets.

---

## **🎥 Video**

Below is a demo video of the application.

- [Video - Desktop](https://youtu.be/LmBuaGtzRY0)

---

## Deployment

The project is deployed on **Vercel**.

- [Live Demo](https://compound-dashboard-f22r0dyci-dev94s-projects-9a098fa3.vercel.app)

---

## Tech Stack

- **Frontend:** React, TypeScript
- **Styles:** RadixUI, CSS Modules, Recharts
- **Backend:** Node.js, AWS RDS (PostgreSQL)
- **Deployment:** Vercel

---

## Features

### **Backend**

- `GET /advisors`: Retrieves a list of financial advisors.
- `GET /advisors/:id/accounts`: Fetches accounts managed by a specific advisor.
- `GET /accounts/:number/holdings`: Retrieves holdings within an investment account.

### **Frontend**

- Fully responsive design for desktop, tablet, and mobile.
- Users can:
  - View advisor profiles, bios, and assets.
  - Explore advisors' investment accounts and holdings.
  - Interact with **dynamic Pie Charts** for holdings breakdown.
  - Sort and search advisors based on name, assets, and custodians.
- **Modals for enhanced user interaction**:
  - Bio Modal (Shows advisor bio and contact details).
  - Accounts Modal (Displays holdings and an interactive Pie Chart).

---

## **💳 Payment Information**

- **Any credit card will work** – this is a mock integration.
- Simply click **"Pay Now"** to book an experience.
- No real payment is processed.

---

## Setup Instructions

### **1. Clone the Repository**

```
git clone https://github.com/d0uble0deven/compound-advisors-react-aws.git
```

### **2. Environment Variables**

Create a `.env` file in the project root and add:

```
DB_PASSWORD=your_postgresql_password_string

SERVER_PORT=5001
APP_URL=http://localhost:5173
```

### **3. Install Dependencies & Run the Project**

```
cd client
npm install
npm run dev
cd ..
cd server
npm install
npm run start
cd ..
```

Then, open `http://localhost:5173/` in your browser.

---

## API Endpoints

### `GET /advisors`

```
[
  {
    "id": "1",
    "name": "Michael Smith",
    "email": "michael@example.com",
    "totalAssets": 7500000,
    "custodians": [
      { "name": "Fidelity", "repId": "1345" },
      { "name": "Vanguard", "repId": "2764" }
    ]
  }
]

```

### `GET /advisors/:id/accounts`

```
[
  {
    "id": 4,
    "name": "Randall Taylor - Alternative Investments",
    "number": "404445",
    "custodian": "Schwab",
    "holdings": [
      { "ticker": "BTC-USD", "units": 2, "unitprice": 45000, "percentage": 55.0 },
      { "ticker": "ETH-USD", "units": 10, "unitprice": 3200, "percentage": 30.0 }
    ]
  }
]
```

### `GET /accounts/:number/holdings`

```
[
  {
    "ticker": "AAPL",
    "units": 100,
    "unitprice": 150,
    "percentage": 50
  },
  {
    "ticker": "GOOGL",
    "units": 50,
    "unitprice": 2800,
    "percentage": 50
  }
]


```

---

## **🎉If I Had More Time**

- Fix spacing - some bullet points and icons are not perfectly aligned.
- Add in skeleton loading for initial render.
- Add in "No search results found" message when filtering returns no results.
- If the app was more robust and needed to be more scalable - use **Atomic Design Principles** for splitting components, with **table cells as the atoms** and moving up from there.

---

## Author

Developed by Dev Govindji

- GitHub: [Your GitHub](https://github.com/d0uble0deven)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/DevGovindji)
