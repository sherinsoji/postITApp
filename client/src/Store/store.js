import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import usersReducer from "../Features/UserSlice";
import postReducer from "../Features/PostSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Uses localStorage by default
import { combineReducers } from "redux";
import { reset as resetUsers } from "../Features/UserSlice";
import { reset as resetPosts } from "../Features/PostSlice";

// Redux Persist config
const persistConfig = {
  key: "reduxstore", // The key to identify the persisted state in storage
  storage, // The storage method (localStorage)
};

// Combine all your reducers into one rootReducer
const rootReducer = combineReducers({
  users: usersReducer, // Manage users slice of the state
  posts: postReducer, // Manage posts slice of the state
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});
const persistore = persistStore(store); // Create persistore for rehydration

// Reset all reducers
const resetStore = () => {
  store.dispatch(resetUsers()); // Reset users state
  store.dispatch(resetPosts()); // Reset posts state
};

export { store, persistore, resetStore };
