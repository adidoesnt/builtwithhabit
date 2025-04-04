export async function load({ params }) {
	const { paymentIntentId } = params;

	return { paymentIntentId };
}
