const config = {
	site: {
		name: 'builtwithhabit',
		logo: '/bwh-logo-cropped.svg',
		caption: 'by beingsofhabit',
		splitName: ['built', 'with', 'habit'],
		splitDescription: ['Click here to embark on a personalised fitness journey that works', 'for you.'],
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
			plans: [
				{
					name: 'Discover',
					sessions: '1 session',
					price: 50,
					discountPrice: 40,
					description: 'Perfect for a trial session.',
					buttonText: 'Book Now'
				},
				{
					name: 'Build',
					sessions: '5 sessions',
					price: 225,
					discountPrice: 200,
					description: 'Save $25 with this package!',
					buttonText: 'Book Now'
				},
				{
					name: 'Transform',
					sessions: '10 sessions',
					price: 400,
					discountPrice: 350,
					description: 'Save $50 with this package!',
					buttonText: 'Book Now'
				}
			]
		}
	}
};

export default config;
