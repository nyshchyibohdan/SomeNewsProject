import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

const userSlice = createSlice({
    name: "user",
    initialState: { user: null },
    reducers: {
        logout: (state) => {
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUser.pending, () => {
                console.log("USER IS PENDING...");
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.user = action.payload?.user;
            })
            .addCase(getUser.rejected, (state) => {
                state.user = null;
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
