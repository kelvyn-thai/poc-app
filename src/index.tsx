import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import "styles/tailwind.css";
import "antd/dist/antd.min.css";

/**
 * PingFang-SC
 */
import "assets/fonts/PingFang-SC/PingFang-SC-Regular.ttf";
import "assets/fonts/PingFang-SC/PingFang-SC-Medium.ttf";
import "assets/fonts/PingFang-SC/PingFang-SC-Heavy.ttf";
import "assets/fonts/PingFang-SC/PingFang-SC-Bold.ttf";

/**
 * Helvetica-Neue
 */
import "assets/fonts/Helvetica-Neue/Helvetica-Neue.ttf";
import "assets/fonts/Helvetica-Neue/Helvetica-Neue-Medium.ttf";
import "assets/fonts/Helvetica-Neue/Helvetica-Neue-Bold.ttf";
import "assets/fonts/Helvetica-Neue/Helvetica-Neue-Light.ttf";
import "assets/fonts/Helvetica-Neue/Helvetica-NeueBd.ttf";
import "assets/fonts/Helvetica-Neue/Helvetica-NeueHv.ttf";
import "assets/fonts/Helvetica-Neue/Helvetica-NeueIt.ttf";
import "assets/fonts/Helvetica-Neue/Helvetica-NeueLt.ttf";
import "assets/fonts/Helvetica-Neue/Helvetica-NeueMed.ttf";

import "assets/fonts/sub.ttf";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root-app") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
