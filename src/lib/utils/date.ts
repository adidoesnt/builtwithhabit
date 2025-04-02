export const formatDate = (date: Date) => {
	return new Date(date).toLocaleDateString('en-US', {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
};
