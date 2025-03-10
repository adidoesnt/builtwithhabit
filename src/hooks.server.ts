import { redirect, type Handle } from '@sveltejs/kit';
import { supabase } from '$lib/server/auth';

const isLandingPageRoute = (pathname: string) => {
	return pathname === '/';
};

const getIsAuthenticatedRoute = (pathname: string) => {
	return !['/login', '/signup', '/signup/verify-email', '/'].includes(pathname);
};

const getIsPackageBookingRoute = (pathname: string) => {
	return pathname.includes('/packages/');
};

export const handle: Handle = async ({ event, resolve }) => {
	const accessToken = event.cookies.get('access_token');
	const isAuthenticatedRoute = getIsAuthenticatedRoute(event.url.pathname);
	const isLandingPage = isLandingPageRoute(event.url.pathname);
	const isPackageBookingRoute = getIsPackageBookingRoute(event.url.pathname);
	if (accessToken) {
		const { data, error } = await supabase.auth.getUser(accessToken);

		if (error) throw error;

		if (data.user && !isAuthenticatedRoute && !isLandingPage) {
			redirect(302, '/dashboard');
		}
	} else if (isPackageBookingRoute) {
		redirect(302, '/signup');
	} else if (isAuthenticatedRoute) {
		redirect(302, '/login');
	}

	return resolve(event);
};
