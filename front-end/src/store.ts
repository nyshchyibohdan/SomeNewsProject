import { configureStore } from "@reduxjs/toolkit";
import newsApiReducer from "./state/newsApiSlice";

export const store = configureStore({
    reducer: {
        newsApi: newsApiReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
