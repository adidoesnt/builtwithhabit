import { writable } from "svelte/store";

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

// Reset all form state
export const resetFormState = () => {
	disclaimerChecked.set(false);
	postalCode.set('');
	address.set('');
	isValid.set(false);
	validationInProgress.set(false);
	message.set('');
};
