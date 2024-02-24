import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import "./globals.css";
import { configure } from "mobx";

configure({
  enforceActions: "never"
});
// Import the generated route tree
import { routeTree } from "../routeTree.gen";
import { Toaster } from "@/components/ui/toaster";

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Render the app
const rootElement = document.getElementById("app")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <Toaster />
      <RouterProvider router={router} />
    </StrictMode>
  );
}
