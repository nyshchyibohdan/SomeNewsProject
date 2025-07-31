import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { Category, NewsApiInitialState } from "../types/stateTypes";

const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

const initialState: NewsApiInitialState = {
    general: [],
    sport: [],
    science: [],
    technology: [],
};

const newsApiSlice = createSlice({
    name: "newsApi",
    initialState,
    reducers: {
        clearNews: () => {
            return initialState;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getNews.pending, () => {
                console.log("Loading...");
            })
            .addCase(getNews.fulfilled, (state, action) => {
                return {
                    ...state,
                    [`${action.payload?.topic}`]: action.payload?.response,
                };
            });
    },
});

export const getNews = createAsyncThunk(
    "newsApi/getNews",
    async (topic: Category) => {
        try {
            const response = await axios.get(
                `${SERVER_BASE_URL}/api/newsapi/?topic=${topic}`,
                {
                    withCredentials: true,
                }
            );

            if (response.status === 200) {
                return { topic, response: response.data };
            }
        } catch (error: unknown) {
            console.log(error);
        }
    }
);

export const { clearNews } = newsApiSlice.actions;

export default newsApiSlice.reducer;
