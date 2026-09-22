import React from "react";
import { createRoot } from "react-dom/client";
import { FluentProvider, webDarkTheme } from "@fluentui/react-components";
import App from "./App.jsx";

const root = createRoot(document.getElementById("root"));
root.render(
  <FluentProvider theme={webDarkTheme}>
    <App />
  </FluentProvider>
);
