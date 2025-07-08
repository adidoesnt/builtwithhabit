import { redirect, type Handle } from '@sveltejs/kit';
import { supabase } from '$lib/server/auth';

enum Router {
	Training = 'training',
	Blog = 'blog',
	Root = ''
}

const isLandingPageRoute = (pathname: string) => {
	return ['/', '/training'].includes(pathname);
};

const isBlogRoute = (pathname: string) => {
	return pathname.includes('/blog');
};

const getIsAuthenticatedRoute = (pathname: string) => {
	return ![
		'/training/login',
		'/training/signup',
		'/training/signup/verify-email',
		'/training',
		'/training/reset-password',
		'/training/forgot-password',
		'/training/packages/learn-more',
		'/about-me',
		'/blog'
	].includes(pathname);
};

const getIsPackageBookingRoute = (pathname: string) => {
	return pathname.includes('/training/packages/');
};

const isChromeDevToolsRoute = (pathname: string) => {
	return pathname.includes('/.well-known/appspecific/com.chrome.devtools.json');
};

const getParentRouter = (pathname: string) => {
	const parentRoute = pathname.split('/')[1];

	switch (parentRoute) {
		case Router.Training:
			return Router.Training;
		case Router.Blog:
			return Router.Blog;
		default:
			return Router.Root;
	}
};

export const handle: Handle = async ({ event, resolve }) => {
	const accessToken = event.cookies.get('access_token');
	const isAuthenticatedRoute = getIsAuthenticatedRoute(event.url.pathname);
	const isLandingPage = isLandingPageRoute(event.url.pathname);
	const isBlogPage = isBlogRoute(event.url.pathname);
	const isChromeDevTools = isChromeDevToolsRoute(event.url.pathname);

	const isPackageBookingRoute = getIsPackageBookingRoute(event.url.pathname);

	// TODO: Update the webhook in the Stripe dashboard to use this route
	const isPaymentIntentWebhookRoute = event.url.pathname.includes(
		'/training/payment-intent/webhook'
	);

	if (isPaymentIntentWebhookRoute || isBlogPage || isChromeDevTools) {
		return resolve(event);
	}

	const parentRouter = getParentRouter(event.url.pathname);

	if (parentRouter === Router.Training) {
		try {
			if (accessToken) {
				const { data, error } = await supabase.auth.getUser(accessToken);

				if (error) {
					event.cookies.delete('access_token', { path: '/' });
					if (isAuthenticatedRoute) {
						redirect(303, '/training/login');
					}
					return resolve(event);
				}

				if (data.user && !isAuthenticatedRoute && !isLandingPage) {
					redirect(303, '/training/dashboard');
				}
			} else if (isPackageBookingRoute) {
				redirect(303, '/training/signup');
			} else if (isAuthenticatedRoute) {
				redirect(303, '/training/login');
			}
		} catch (error) {
			console.error('Auth error:', error);
			if (isAuthenticatedRoute) {
				redirect(303, '/training/login');
			}
		}
	} else if (parentRouter === Router.Blog) {
		return resolve(event);
	} else {
		return resolve(event);
	}

	return resolve(event);
};
