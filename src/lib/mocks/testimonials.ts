export interface Testimonial {
	id: number;
	name: string;
	role: string;
	image: string;
	quote: string;
	rating: number;
}

// TODO: Replace with actual data from DB or CMS later
export const testimonials: Testimonial[] = [
	{
		id: 1,
		name: 'Priya Sharma',
		role: 'Working Professional',
		image: '/testimonials/person1.jpg',
		quote:
			"Ishita's approach to strength training completely changed my relationship with fitness. Her personalized program fits perfectly into my busy schedule!",
		rating: 5
	},
	{
		id: 2,
		name: 'Ananya Patel',
		role: 'Mother of Two',
		image: '/testimonials/person2.jpg',
		quote:
			"After having kids, I thought I'd never feel strong again. Six months with Ishita and I'm stronger than I've ever been!",
		rating: 5
	},
	{
		id: 3,
		name: 'Meera Kapoor',
		role: 'University Student',
		image: '/testimonials/person3.jpg',
		quote:
			"The focus on science-backed training and nutrition advice has been eye-opening. I've gained so much knowledge along with my strength.",
		rating: 5
	},
	{
		id: 4,
		name: 'Divya Malhotra',
		role: 'IT Professional',
		image: '/testimonials/person4.jpg',
		quote:
			'Working with Ishita helped me overcome years of fitness misinformation. Her holistic approach addresses both physical and mental well-being.',
		rating: 5
	},
	{
		id: 5,
		name: 'Neha Reddy',
		role: 'Healthcare Worker',
		image: '/testimonials/person5.jpg',
		quote:
			'As someone who stands all day at work, the personalized strength program has been life-changing for my back pain and overall energy levels.',
		rating: 5
	},
	{
		id: 6,
		name: 'Kavita Singh',
		role: 'Entrepreneur',
		image: '/testimonials/person6.jpg',
		quote:
			"Ishita's training philosophy perfectly balances pushing your limits while respecting your body's needs. I've never felt more empowered!",
		rating: 5
	},
	{
		id: 7,
		name: 'Lakshmi Iyer',
		role: 'Teacher',
		image: '/testimonials/person7.jpg',
		quote:
			'The focus on sustainable habits rather than quick fixes has made all the difference. For the first time, fitness feels like a natural part of my life.',
		rating: 5
	},
	{
		id: 8,
		name: 'Ritu Desai',
		role: 'Finance Professional',
		image: '/testimonials/person8.jpg',
		quote:
			'I appreciate how Ishita tailors her approach to South Asian women specifically. She understands our unique challenges and cultural considerations.',
		rating: 5
	}
];
