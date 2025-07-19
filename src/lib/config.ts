const config = {
	site: {
		name: 'builtwithhabit',
		logo: '/bwh-logo-cropped.png',
		caption: {
			parts: ['Sweat Smarter.', 'Live Stronger.']
		},
		splitName: ['built', 'with', 'habit'],
		description: 'Embark on a personalised fitness journey that works for you.',
		contactCta: 'Contact us for inquiries and partnerships!',
		splitDescription: [
			'Click here',
			'to embark on a personalised fitness journey that works',
			'for you.'
		],
		flyer: {
			url: 'https://bwh-main-bucket.s3.ap-southeast-1.amazonaws.com/assets/bwh-flyer.pdf'
		},
		navBar: {
			title: 'Menu',
			links: [
				{
					label: 'Dashboard',
					href: '/training/dashboard'
				},
				{
					label: 'Profile',
					href: '/training/profile'
				},
				{
					label: 'Packages',
					href: '/training/packages'
				},
				{
					label: 'Bookings',
					href: '/training/bookings'
				},
				{
					label: 'Blog',
					href: '/blog'
				}
			],
			blogLinks: [
				{
					label: 'Home',
					href: '/'
				},
				{
					label: 'Blog',
					href: '/blog'
				},
				{
					label: 'Sign Up',
					href: '/training/signup'
				},
				{
					label: 'Log In',
					href: '/training/login'
				}
			],
			landingPageLinks: {
				desktop: [
					{
						label: 'Home',
						href: '#'
					},
					{
						label: 'Blog',
						href: '/blog'
					},
					{
						label: 'Sign Up',
						href: '/training/signup'
					},
					{
						label: 'Log In',
						href: '/training/login'
					},
					{
						label: 'About',
						href: '#about'
					},
					{
						label: 'Packages',
						href: '#pricing'
					}
				],
				mobile: [
					{
						label: 'Home',
						href: '#'
					},
					{
						label: 'Blog',
						href: '/blog'
					},
					{
						label: 'Sign Up',
						href: '/training/signup'
					},
					{
						label: 'Login',
						href: '/training/login'
					},
					{
						label: 'Contact',
						href: '#contact'
					},
					{
						label: 'Mission',
						href: '#mission'
					},
					{
						label: 'Packages',
						href: '#pricing'
					}
				]
			},
			adminLinks: [
				{
					label: 'User Management',
					href: '/training/admin/user-management'
				}
			]
		},
		mission: {
			title: ['Mission and', 'Training Philosophy'],
			content: [
				'Strength training is truly one of the most powerful tools for South Asian women to build confidence, longevity, and resilience at any stage of life!',
				'My approach combines science-backed resistance training, whole-food nutrition, and mindful living-cutting through misinformation to create personalised, sustainable, and iterative fitness plans that work for you. I believe fitness should feel intuitive - not restrictive - and I work closely with each client to build strength in a way that feels natural, empowering, and lasting!'
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
			address: '75 Meyer Road, Singapore 437901',
			instagram: {
				handle: '@builtwithhabit',
				link: 'https://www.instagram.com/builtwithhabit/'
			},
			linkedin: {
				handle: '@builtwithhabit',
				link: 'https://www.linkedin.com/company/builtwithhabit/'
			},
			pinterest: {
				handle: '@builtwithhabit',
				link: 'https://www.pinterest.com/builtwithhabit/'
			},
			tiktok: {
				handle: '@builtwithhabit',
				link: 'https://www.tiktok.com/@builtwithhabit'
			}
		},
		support: {
			email: 'admin@boh-services.com'
		},
		pricing: {
			title: 'Packages',
			plans: {
				buttonText: 'Book Now'
			},
			currency: 'SG$',
			viewTestimonials: 'View Testimonials'
		}
	},
	aboutMe: {
		titles: {
			aboutMe: 'About Me',
			expectations: 'What to expect from my sessions'
		},
		image: '/about-me.jpeg',
		content: {
			about: [
				'Hi, I’m Ishita - a NASM-certified fitness trainer with a deep passion for helping South Asian women build confidence, strength, and sustainable wellness habits.',
				"Movement has always been a huge part of my life. I was raised in an athletic, health-conscious household that taught me discipline, resilience, and how to channel movement as a healthy outlet for my anxiety. Whether it's lifting in the gym, dancing around the house, playing basketball, or biking outdoors, I’ve always found joy in moving my body in ways that challenge and energise me.",
				'But my journey hasn’t always been linear. In my late teens, I developed a more rigid, unsustainable relationship with body image - one shaped by unrealistic beauty standards and misinformation. The pandemic gave me ample time to introspect, to unlearn harmful habits and re-learn how to honour my body: training for strength, nourishing myself with whole foods, and reconnecting with movement as a source of joy.',
				'Lifting became my sanctuary. It transformed not just my body, but my mindset - helping me take up more space, embrace my functionality, and find empowerment in consistency, discipline, and routine. Today, I feel more connected to myself than ever - and I want to help my clients experience the same thing.',
				'Our culture often preaches restriction and shrinking - but science tells us a different story. Our bodies need fuel, rest, and thoughtful training to thrive. That’s why I use a science-backed, holistic approach to fitness that considers every part of your wellbeing: training, nutrition, sleep, recovery, and more. I stay up-to-date with the latest evidence and apply it in real, personalised, practical ways - always listening to what your body needs.'
			],
			expectations: {
				introduction: 'My training sessions are structured around three pillars:',
				pillars: [
					{
						title: 'Flexibility & Mobility',
						description: 'Improving joint health and range of motion'
					},
					{
						title: 'Muscular Conditioning',
						description: 'Building functional strength and endurance'
					},
					{
						title: 'Cardiovascular Capacity',
						description: 'Enhancing stamina and aerobic health'
					}
				],
				approach:
					'Before we add intensity, we lay the groundwork: teaching form, correcting posture, and making you feel confident in how you move. I take a very hands-on approach - offering real-time demonstrations, verbal cues, and consistent encouragement throughout our session.',
				holisticSupport:
					'Training isn’t just about what you do in the gym. That’s why I integrate nutritional guidance (focused on whole foods, high-protein, non-restrictive eating), sleep hygiene tips, and recovery practices. Whether your goal is hypertrophy, fat loss, or overall wellness, we work together to create a routine that aligns with your lifestyle - not against it.',
				mission:
					'My aim is to equip you with the knowledge and tools to feel empowered in your own skin - at every age and stage of life.'
			}
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
				'I understand that requests to reschedule less than 24 hours before the session will be considered on a case-by-case basis and may not be accepted.',
				'I commit to arriving on time for all sessions. Late arrivals will be accommodated with a 15-minute grace period, after which the session duration will be reduced accordingly.',
				'If a session extends up to 15 minutes beyond the scheduled time, no additional charges will apply, provided the session began at the scheduled start time.',
				'I understand that it is my responsibility to ensure that commercial trainers are permitted to train at my selected location prior to booking.',
				'I acknowledge that if my selected location (such as a condominium gym) does not permit external trainers, the trainer will not be liable for any issues that arise and the session may be forfeited.'
			]
		},
		description:
			'Please select one of the packages below to proceed with your booking. Do note that bookings cannot be cancelled, but can be postponed to a later date.',
		learnMore: {
			introduction:
				'Whether you’re new to strength training or looking to level up your current routine, I offer a range of personal training options that are individualised, holistic, and grounded in science.',
			tableDescription: 'The table below outlines the key details of each package.',
			accordionDescription:
				'The details for each package can be seen below by expanding their respective dropdowns.'
		}
	},
	bookings: {
		bufferTime: 60
	},
	dashboard: {
		greeting: 'Welcome back',
		icons: [
			{
				name: 'Packages',
				description: 'Browse available packages',
				icon: 'package',
				href: '/training/packages',
				color: 'bg-blue-500'
			},
			{
				name: 'Profile',
				description: 'Manage your account',
				icon: 'user',
				href: '/training/profile',
				color: 'bg-orange-500'
			},
			{
				name: 'Purchases',
				description: 'View your past purchases',
				icon: 'receipt',
				href: '/training/purchases',
				color: 'bg-purple-500'
			},
			{
				name: 'Bookings',
				description: 'View your scheduled sessions',
				icon: 'calendar',
				href: '/training/bookings',
				color: 'bg-green-500'
			}
		]
	},
	blog: {
		viewPostsButtonText: 'View Posts',
		description:
			'Insights, stories, and practical tips on fitness, wellness, and building sustainable habits.',
		postsHeading: 'Latest Posts',
		noPosts: {
			heading: 'No Posts Yet',
			description:
				'Check back soon for articles on fitness, wellness, and building sustainable habits!',
			buttonText: 'Back to Home'
		}
	},
	pillars: [
		{
			title: 'learn',
			subtitle: 'blog',
			href: '/blog',
			img: {
				src: '/pillars-learn.png',
				alt: 'learn'
			},
			description: 'learn about all things wellness, sustainability, and entrepreneurship!'
		},
		{
			title: 'train',
			subtitle: 'training',
			href: '/training',
			img: {
				src: '/pillars-training.png',
				alt: 'training'
			},
			description:
				'explore our personal training packages to improve strength, conditioning, and mobility!'
		},
		{
			title: 'shop',
			subtitle: 'activewear',
			href: '/shop',
			img: {
				src: '/pillars-shop.png',
				alt: 'activewear'
			},
			description: 'join our waitlist for updates on our upcoming skin-safe activewear launch!'
		}
	]
};

export default config;
