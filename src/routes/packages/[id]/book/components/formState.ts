import { writable } from "svelte/store";

export type Slot = {
	day: Date;
	hour: number;
	minutes: number;
};

// Disclaimer checkbox
export let disclaimerChecked = writable(false);

// Postal code text input
export let postalCode = writable('');
export let validationInProgress = writable(false);
export let isValid = writable(false);
export let message = writable('');

export const setIsValid = (v: boolean) => {
	isValid.set(v);
};

export const setValidationInProgress = (v: boolean) => {
	validationInProgress.set(v);
};

export const setMessage = (v: string) => {
	message.set(v);
};

// Address text input
export let address = writable('');

export const setAddress = (v: string) => {
	address.set(v);
};

// Date picker
export let selectedSlots = writable<Array<{ day: Date; hour: number; minutes: number }>>([]);
export const setSelectedSlots = (v: Array<{ day: Date; hour: number; minutes: number }>) => {
	selectedSlots.set(v);
};

// Reset all form state
export const resetFormState = () => {
	disclaimerChecked.set(false);
	postalCode.set('');
	address.set('');
	isValid.set(false);
	validationInProgress.set(false);
	message.set('');
	selectedSlots.set([]);
};

export const purchaseId = writable<number | null>(null);

export const setPurchaseId = (v: number | null) => {
	purchaseId.set(v);
};
