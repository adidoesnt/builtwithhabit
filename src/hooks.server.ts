import { redirect, type Handle } from "@sveltejs/kit";
import { setUser } from "./stores/auth";
import { supabase } from "$lib/server/auth";
import { getUserById } from "$lib/server/db/user";

export const handle: Handle = async ({ event, resolve }) => {
    const accessToken = event.cookies.get("access_token");
    
    if (accessToken) {
        const { data, error } = await supabase.auth.getUser(accessToken);
        
        if (error) throw error;

        if (data.user) {
            const user = await getUserById(data.user.id);
            setUser(user);

            if (["/login", "/signup"].includes(event.url.pathname)) {
                redirect(302, "/dashboard");
            }
        }
    } else {
        if (!["/login", "/signup"].includes(event.url.pathname)) {
            redirect(302, "/login");
        }
    }

    return resolve(event);
}
