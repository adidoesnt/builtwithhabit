import { supabase } from '$lib/server/auth';
import { Role } from '$lib/server/db/schema.js';
import { getUserById } from '$lib/server/db/user';
import type { User } from '$lib/stores/auth.js';

enum Router {
	Training = 'training',
	Blog = 'blog',
	Root = ''
}

const sidebarRoutes = {
	[Router.Training]: {
		authenticated: {
			[Role.USER]: {
				dashboard: {
					label: 'Dashboard',
					href: '/training/dashboard'
				},
				profile: {
					label: 'Profile',
					href: '/training/profile'
				},
				packages: {
					label: 'Packages',
					href: '/training/packages'
				},
				bookings: {
					label: 'Bookings',
					href: '/training/bookings'
				},
				blog: {
					label: 'Blog',
					href: '/training/blog'
				},
				activewear: {
					label: 'Activewear',
					href: '/activewear'
				}
			},
			[Role.TRAINER]: {
				dashboard: {
					label: 'Dashboard',
					href: '/training/dashboard'
				},
				profile: {
					label: 'Profile',
					href: '/training/profile'
				},
				bookings: {
					label: 'Bookings',
					href: '/training/bookings'
				},
				availability: {
					label: 'Availability',
					href: '/training/trainers/[id]/availability'
				},
				clients: {
					label: 'Clients',
					href: '/training/trainers/[id]/clients'
				},
				blog: {
					label: 'Blog',
					href: '/blog'
				},
				activewear: {
					label: 'Activewear',
					href: '/activewear'
				}
			},
			[Role.ADMIN]: {
				dashboard: {
					label: 'Dashboard',
					href: '/training/dashboard'
				},
				profile: {
					label: 'Profile',
					href: '/training/profile'
				},
				packages: {
					label: 'Packages',
					href: '/training/packages'
				},
				bookings: {
					label: 'Bookings',
					href: '/training/bookings'
				},
				blog: {
					label: 'Blog',
					href: '/blog'
				},
				activewear: {
					label: 'Activewear',
					href: '/activewear'
				},
				userManagement: {
					label: 'User Management',
					href: '/training/admin/user-management'
				}
			}
		},
		unauthenticated: {
			home: {
				label: 'Home',
				href: '/'
			},
			about: {
				label: 'About',
				href: '/about'
			},
			blog: {
				label: 'Blog',
				href: '/blog'
			},
			training: {
				label: 'Training',
				href: '/training'
			},
			activewear: {
				label: 'Activewear',
				href: '/activewear'
			},
			contact: {
				label: 'Contact Us',
				href: '/contact'
			}
		}
	},
	[Router.Root]: {
		authenticated: {
			[Role.USER]: {
				dashboard: {
					label: 'Dashboard',
					href: '/training/dashboard'
				},
				profile: {
					label: 'Profile',
					href: '/training/profile'
				},
				packages: {
					label: 'Packages',
					href: '/training/packages'
				},
				bookings: {
					label: 'Bookings',
					href: '/training/bookings'
				},
				blog: {
					label: 'Blog',
					href: '/training/blog'
				},
				activewear: {
					label: 'Activewear',
					href: '/activewear'
				}
			},
			[Role.TRAINER]: {
				dashboard: {
					label: 'Dashboard',
					href: '/training/dashboard'
				},
				profile: {
					label: 'Profile',
					href: '/training/profile'
				},
				bookings: {
					label: 'Bookings',
					href: '/training/bookings'
				},
				availability: {
					label: 'Availability',
					href: '/training/trainers/[id]/availability'
				},
				clients: {
					label: 'Clients',
					href: '/training/trainers/[id]/clients'
				},
				activewear: {
					label: 'Activewear',
					href: '/activewear'
				}
			},
			[Role.ADMIN]: {
				dashboard: {
					label: 'Dashboard',
					href: '/training/dashboard'
				},
				profile: {
					label: 'Profile',
					href: '/training/profile'
				},
				packages: {
					label: 'Packages',
					href: '/training/packages'
				},
				bookings: {
					label: 'Bookings',
					href: '/training/bookings'
				},
				blog: {
					label: 'Blog',
					href: '/blog'
				},
				activewear: {
					label: 'Activewear',
					href: '/activewear'
				},
				userManagement: {
					label: 'User Management',
					href: '/training/admin/user-management'
				}
			}
		},
		unauthenticated: {
			home: {
				label: 'Home',
				href: '/'
			},
			about: {
				label: 'About',
				href: '/about'
			},
			blog: {
				label: 'Blog',
				href: '/blog'
			},
			training: {
				label: 'Training',
				href: '/training'
			},
			activewear: {
				label: 'Activewear',
				href: '/activewear'
			},
			contact: {
				label: 'Contact Us',
				href: '/contact'
			}
		}
	},
	[Router.Blog]: {
		authenticated: {
			[Role.USER]: {
				dashboard: {
					label: 'Dashboard',
					href: '/training/dashboard'
				},
				profile: {
					label: 'Profile',
					href: '/training/profile'
				},
				packages: {
					label: 'Packages',
					href: '/training/packages'
				},
				bookings: {
					label: 'Bookings',
					href: '/training/bookings'
				},
				blog: {
					label: 'Blog',
					href: '/training/blog'
				},
				activewear: {
					label: 'Activewear',
					href: '/activewear'
				}
			},
			[Role.TRAINER]: {
				dashboard: {
					label: 'Dashboard',
					href: '/training/dashboard'
				},
				profile: {
					label: 'Profile',
					href: '/training/profile'
				},
				bookings: {
					label: 'Bookings',
					href: '/training/bookings'
				},
				availability: {
					label: 'Availability',
					href: '/training/trainers/[id]/availability'
				},
				clients: {
					label: 'Clients',
					href: '/training/trainers/[id]/clients'
				},
				activewear: {
					label: 'Activewear',
					href: '/activewear'
				}
			},
			[Role.ADMIN]: {
				dashboard: {
					label: 'Dashboard',
					href: '/training/dashboard'
				},
				profile: {
					label: 'Profile',
					href: '/training/profile'
				},
				packages: {
					label: 'Packages',
					href: '/training/packages'
				},
				bookings: {
					label: 'Bookings',
					href: '/training/bookings'
				},
				blog: {
					label: 'Blog',
					href: '/blog'
				},
				userManagement: {
					label: 'User Management',
					href: '/training/admin/user-management'
				},
				activewear: {
					label: 'Activewear',
					href: '/activewear'
				}
			}
		},
		unauthenticated: {
			home: {
				label: 'Home',
				href: '/'
			},
			about: {
				label: 'About',
				href: '/about'
			},
			blog: {
				label: 'Blog',
				href: '/blog'
			},
			training: {
				label: 'Training',
				href: '/training'
			},
			activewear: {
				label: 'Activewear',
				href: '/activewear'
			},
			contact: {
				label: 'Contact Us',
				href: '/contact'
			}
		}
	}
};

const getSidebarRoutes = (user: User | null, pathname: string) => {
	const parentRouter = getParentRouter(pathname);
	const isAuthenticated = !!user;

	if (!isAuthenticated) {
		return sidebarRoutes[parentRouter].unauthenticated;
	}

	const isAdmin = user?.roles.includes(Role.ADMIN);
	const isTrainer = user?.roles.includes(Role.TRAINER);
	const isUser = user?.roles.includes(Role.USER);

	if (parentRouter === Router.Training) {
		if (isAdmin) {
			return sidebarRoutes[Router.Training].authenticated[Role.ADMIN];
		}
		if (isTrainer) {
			return sidebarRoutes[Router.Training].authenticated[Role.TRAINER];
		}
		if (isUser) {
			return sidebarRoutes[Router.Training].authenticated[Role.USER];
		}
	} else if (parentRouter === Router.Blog) {
		if (isAdmin) {
			return sidebarRoutes[Router.Blog].authenticated[Role.ADMIN];
		}
		if (isTrainer) {
			return sidebarRoutes[Router.Blog].authenticated[Role.TRAINER];
		}
		if (isUser) {
			return sidebarRoutes[Router.Blog].authenticated[Role.USER];
		}
	} else {
		if (isAdmin) {
			return sidebarRoutes[Router.Root].authenticated[Role.ADMIN];
		}
		if (isTrainer) {
			return sidebarRoutes[Router.Root].authenticated[Role.TRAINER];
		}
		if (isUser) {
			return sidebarRoutes[Router.Root].authenticated[Role.USER];
		}
	}

	return sidebarRoutes[parentRouter].unauthenticated;
};

export type SidebarRoutes = Record<string, unknown>;

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

export const load = async ({ cookies, url }) => {
	const accessToken = cookies.get('access_token');
	const pathname = url.pathname;

	if (accessToken) {
		const { data, error } = await supabase.auth.getUser(accessToken);

		if (error) {
			console.error('Error getting user', error);
		}

		if (data.user) {
			const user = await getUserById(data.user.id);
			return { user, sidebarRoutes: getSidebarRoutes(user, pathname) };
		}
	}

	return { user: null, sidebarRoutes: getSidebarRoutes(null, pathname) };
};
