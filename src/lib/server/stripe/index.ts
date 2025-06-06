import Stripe from 'stripe';
import { env } from '$env/dynamic/private';

const stripe = new Stripe(env.SECRET_STRIPE_KEY);
export default stripe;
