export enum WebhookEvent {
	PaymentIntentSucceeded = 'payment_intent.succeeded',
	PaymentIntentPaymentFailed = 'payment_intent.payment_failed',
	ChargeSucceeded = 'charge.succeeded',
	ChargeUpdated = 'charge.updated'
}

export enum PurchaseStatus {
	CONFIRMED = 'confirmed',
	UNCONFIRMED = 'unconfirmed',
	FAILED = 'failed'
}