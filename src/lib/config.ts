const config = {
	site: {
		name: 'builtwithhabit',
		logo: '/bwh-logo-cropped.svg',
		caption: 'by beingsofhabit',
		splitName: ['built', 'with', 'habit'],
		splitDescription: [
			'Click here to embark on a personalised fitness journey that works',
			'for you.'
		],
		navBar: {
			title: 'Menu',
			links: [
				{
					label: 'Home',
					href: '/'
				},
				{
					label: 'Dashboard',
					href: '/dashboard'
				},
				{
					label: 'Profile',
					href: '/profile'
				},
				{
					label: 'Packages',
					href: '/packages'
				},
				{
					label: 'Bookings',
					href: '/bookings'
				}
			]
		},
		mission: {
			title: ['Mission and', 'Training Philosophy'],
			content: [
				'Strength training is truly one of the most powerful tools for south asian women to build confidence, longevity, and resilience at any stage of life!',
				'My approach combines science-backed resistance training, whole-food nutrition, and mindful living—cutting through misinformation to create personalised, sustainable, and iterative fitness plans that work for you. I believe fitness should feel intuitive - not restrictive - and I work closely with each client to build strength in a way that feels natural, empowering, and lasting!'
			]
		},
		contact: {
			name: 'Ishita R. Mahajan',
			image: '/headshot.png',
			tagline: 'NASM-Certified Personal Trainer',
			callToAction: 'View packages',
			email: 'admin@boh-services.com',
			phone: '+65 9233 4061',
			instagram: {
				handle: '@builtwithhabit',
				link: 'https://www.instagram.com/builtwithhabit/'
			}
		},
		pricing: {
			title: 'Packages',
			plans: {
				buttonText: 'Book Now'
			},
			currency: 'SG$'
		}
	},
	packages: {
		description:
			'Please select one of the packages below to proceed with your booking. Do note that bookings cannot be cancelled, but can be postponed to a later date.'
	},
	dashboard: {
		greeting: 'Welcome back',
		icons: [
			{
				name: 'Packages',
				description: 'Browse available packages',
				icon: 'package',
				href: '/packages',
				color: 'bg-blue-500'
			},
			{
				name: 'My Bookings',
				description: 'View your scheduled sessions',
				icon: 'calendar',
				href: '/bookings',
				color: 'bg-green-500'
			},
			{
				name: 'Purchase History',
				description: 'View your past purchases',
				icon: 'receipt',
				href: '/purchases',
				color: 'bg-purple-500'
			},
			{
				name: 'Profile',
				description: 'Manage your account',
				icon: 'user',
				href: '/profile',
				color: 'bg-orange-500'
			}
		]
	}
};

export default config;
