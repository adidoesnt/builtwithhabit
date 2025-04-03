export enum WebhookEvent {
	PaymentIntentCreated = 'payment_intent.created',
	PaymentIntentSucceeded = 'payment_intent.succeeded',
	PaymentIntentPaymentFailed = 'payment_intent.payment_failed',
	PaymentIntentCanceled = 'payment_intent.canceled',
	ChargeSucceeded = 'charge.succeeded',
	ChargeUpdated = 'charge.updated'
}

export enum PurchaseStatus {
	CONFIRMED = 'confirmed',
	UNCONFIRMED = 'unconfirmed',
	FAILED = 'failed'
}
