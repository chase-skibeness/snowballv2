import React from "react";
import ReactDOM from "react-dom/client";
import App from "./containers/App";
import "./index.css";

import "primereact/resources/themes/lara-dark-teal/theme.css";
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import "primeflex/primeflex.css"; // flex

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
