import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider as UrqlProvider } from "urql";
import { client } from "./lib/graphql.ts";
import { Provider } from "react-redux";
import { persistor, store } from "./store/store.tsx";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <UrqlProvider value={client}>
          <App />
        </UrqlProvider>
      </PersistGate>
    </Provider>
  // </React.StrictMode>
);
