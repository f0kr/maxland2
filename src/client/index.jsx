
import { createRoot, hydrateRoot } from "react-dom/client";
import { QueryClient } from "@tanstack/query-core";
import { QueryClientProvider } from "@tanstack/react-query";
const App = React.lazy(()=> import('./pages/App'))
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter } from "react-router-dom";
import { Suspense } from "react";
import React from "react";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});



(async () => {
  const isCSR = window.__CSR__;
  const rootElement = document.getElementById("root");

  if (isCSR) {
      createRoot(rootElement).render(
          <QueryClientProvider client={queryClient}>
              <React.StrictMode>
                  <Provider store={store}>
                      <BrowserRouter>
                      <Suspense fallback={<div>Loading...</div>}>

                              <App />
                          </Suspense>
                      </BrowserRouter>
                  </Provider>
              </React.StrictMode>
          </QueryClientProvider>
      );
  } else {
    const data = [{ _id: 123123, name: "ffff", price: 123, soldOut: false },
        { _id: 435646, name: "fergs", price: 6756, soldOut: false },
        { _id: 645676, name: "ghdhdh", price: 675766, soldOut: false } 
    ]
      hydrateRoot(
          rootElement,
          <QueryClientProvider client={queryClient}>
              <React.StrictMode>
                  <Provider store={store}>
                      <BrowserRouter>
                              <App data={data} />
                      </BrowserRouter>
                  </Provider>
              </React.StrictMode>
          </QueryClientProvider>
      );
  }
})();
