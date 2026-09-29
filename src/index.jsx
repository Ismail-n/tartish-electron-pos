import React from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { FluentProvider, webDarkTheme } from "@fluentui/react-components";
import App from "./App.jsx";
import "./styles/global.scss";

const root = createRoot(document.getElementById("root"));
root.render(
  <FluentProvider theme={webDarkTheme}>
    <HashRouter>
      <App />
    </HashRouter>
  </FluentProvider>
);
