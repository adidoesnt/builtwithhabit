import { redirect, type Handle } from '@sveltejs/kit';
import { supabase } from '$lib/server/auth';

const isLandingPageRoute = (pathname: string) => {
	return pathname === '/';
};

const isBlogRoute = (pathname: string) => {
	return pathname.includes('/blog');
};

const getIsAuthenticatedRoute = (pathname: string) => {
	return ![
		'/login',
		'/signup',
		'/signup/verify-email',
		'/',
		'/reset-password',
		'/forgot-password',
		'/packages/learn-more',
		'/about-me',
		'/blog'
	].includes(pathname);
};

const getIsPackageBookingRoute = (pathname: string) => {
	return pathname.includes('/packages/');
};

const isChromeDevToolsRoute = (pathname: string) => {
	return pathname.includes('/.well-known/appspecific/com.chrome.devtools.json');
};

export const handle: Handle = async ({ event, resolve }) => {
	const accessToken = event.cookies.get('access_token');
	const isAuthenticatedRoute = getIsAuthenticatedRoute(event.url.pathname);
	const isLandingPage = isLandingPageRoute(event.url.pathname);
	const isBlogPage = isBlogRoute(event.url.pathname);
	const isChromeDevTools = isChromeDevToolsRoute(event.url.pathname);

	const isPackageBookingRoute = getIsPackageBookingRoute(event.url.pathname);
	const isPaymentIntentWebhookRoute = event.url.pathname.includes('/payment-intent/webhook');

	if (isPaymentIntentWebhookRoute || isBlogPage || isChromeDevTools) {
		return resolve(event);
	}

	try {
		if (accessToken) {
			const { data, error } = await supabase.auth.getUser(accessToken);

			if (error) {
				event.cookies.delete('access_token', { path: '/' });
				if (isAuthenticatedRoute) {
					redirect(303, '/login');
				}
				return resolve(event);
			}

			if (data.user && !isAuthenticatedRoute && !isLandingPage) {
				redirect(303, '/dashboard');
			}
		} else if (isPackageBookingRoute) {
			redirect(303, '/signup');
		} else if (isAuthenticatedRoute) {
			redirect(303, '/login');
		}
	} catch (error) {
		console.error('Auth error:', error);
		if (isAuthenticatedRoute) {
			redirect(303, '/login');
		}
	}

	return resolve(event);
};
