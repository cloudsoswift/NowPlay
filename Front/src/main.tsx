import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { CookiesProvider } from "react-cookie";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RecoilRoot } from "recoil";
import {BrowserRouter as Router,} from 'react-router-dom';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
    <CookiesProvider>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <Router>
            <App />
          </Router>
        </QueryClientProvider>
      </RecoilRoot>
    </CookiesProvider>
  // </React.StrictMode>
);
