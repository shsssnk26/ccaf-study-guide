import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { router } from "./App";
import "./styles.css";

// Links from before the custom domain (…/ccaf-study-guide/lessons/1-1) arrive here with the old prefix; drop it.
const OLD_PREFIX = "/ccaf-study-guide";
if (location.pathname === OLD_PREFIX || location.pathname.startsWith(OLD_PREFIX + "/")) {
  history.replaceState(null, "", (location.pathname.slice(OLD_PREFIX.length) || "/") + location.search + location.hash);
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
