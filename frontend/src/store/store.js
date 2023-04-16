// Import core
import { applyMiddleware, configureStore, Middleware } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

// Import third parts

// Import customs
import rootReducer from "./rootReducers";

/**
 * @doc 3.2.3 bindMiddleware()
 * @param middleware
 */
 export const getDefaultMiddleware = (...middleware) => {
    if (process.env.NODE_ENV !== "production") {
      const { composeWithDevTools } = require("redux-devtools-extension");
  
      return composeWithDevTools(applyMiddleware(...middleware));
    }
    return applyMiddleware(...middleware);
  };
  

  const getPreloadState = () => {
    const preloadedState = {};
    return preloadedState;
  };
  
  /**
   * Init redux store
   */
  const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk],
    devTools: process.env.NODE_ENV !== "production",
    preloadedState: getPreloadState(),
  });
  
  export default store;