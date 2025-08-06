import { redirect } from "@tanstack/react-router";
import { getUser } from "../state/userSlice";
import { store } from "../store";

export async function beforeLoadPage(isAuthPage: boolean = false) {
    await store.dispatch(getUser());
    const { user } = store.getState().user;
    if (isAuthPage) {
        if (user) throw redirect({ to: "/" });
    } else {
        if (!user) throw redirect({ to: "/login" });
    }
}
