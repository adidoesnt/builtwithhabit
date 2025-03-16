const config = {
	site: {
		name: 'builtwithhabit',
		logo: '/bwh-logo-cropped.svg',
		caption: 'by beingsofhabit',
		splitName: ['built', 'with', 'habit'],
		description: 'Embark on a personalised fitness journey that works for you.',
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
			],
			adminLinks: [
				{
					label: 'User Management',
					href: '/admin/user-management'
				}
			],
		},
		mission: {
			title: ['Mission and', 'Training Philosophy'],
			content: [
				'Strength training is truly one of the most powerful tools for South Asian women to build confidence, longevity, and resilience at any stage of life!',
				'My approach combines science-backed resistance training, whole-food nutrition, and mindful living—cutting through misinformation to create personalised, sustainable, and iterative fitness plans that work for you. I believe fitness should feel intuitive - not restrictive - and I work closely with each client to build strength in a way that feels natural, empowering, and lasting!'
			]
		},
		contact: {
			name: 'Ishita R. Mahajan',
			image: '/headshot.svg',
			tagline: 'NASM-Certified Personal Trainer',
			callToAction: 'View packages',
			viewMission: 'View Mission',
			email: 'ishita@boh-services.com',
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
			currency: 'SG$',
			earlyBirdDiscount: 'Early Bird Discount',
			viewTestimonials: 'View Testimonials'
		}
	},
	packages: {
		disclaimer: {
			message: 'By checking this box, you agree to the following',
			buttonText: 'disclaimer',
			warning: 'Please read the disclaimer carefully before proceeding.',
			content: [
				'I understand that it is my responsibility to inform the trainer of any medical conditions, injuries, or health concerns that may affect my ability to participate in training sessions.',
				'I understand that in the event of undisclosed medical concerns, the trainer will not be held liable for any injuries or damages that may occur.',
				'I acknowledge that booked sessions cannot be cancelled. Sessions may be postponed once, provided that the request is made at least 24 hours before the scheduled session time.',
				'I understand that failure to provide 24 hours notice for postponement will result in the session being forfeited with no option for rescheduling.',
				'I commit to arriving on time for all sessions. Late arrivals will be accommodated with a 15-minute grace period, after which the session duration will be reduced accordingly.',
				'If a session extends up to 15 minutes beyond the scheduled time, no additional charges will apply, provided the session began at the scheduled start time.',
				'I understand that it is my responsibility to ensure that commercial trainers are permitted to train at my selected location prior to booking.',
				'I acknowledge that if my selected location (such as a condominium gym) does not permit external trainers, the trainer will not be liable for any issues that arise and the session may be forfeited.'
			]
		},
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
				name: 'Purchases',
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
