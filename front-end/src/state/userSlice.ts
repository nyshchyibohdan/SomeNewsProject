import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { User } from "../types/stateTypes";

const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

const initialState: User = {
    id: "",
    nickname: "",
    email: "",
    bio: "",
    profilePic: "",
    reposts: [],
    likes: [],
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: () => {
            return initialState;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUser.pending, () => {
                console.log("USER IS PENDING...");
            })
            .addCase(getUser.fulfilled, (_state, action) => {
                return action.payload?.user;
            })
            .addCase(getUser.rejected, () => {
                return initialState;
            });
    },
});

export const getUser = createAsyncThunk("user/getUser", async () => {
    try {
        const response = await axios.get(
            `${SERVER_BASE_URL}/api/users/profile`,
            {
                withCredentials: true,
            }
        );

        if (response.status === 200) {
            return {
                user: response.data,
            };
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_err) {
        return null;
    }
});

export default userSlice.reducer;
