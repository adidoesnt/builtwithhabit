export const formatTime = (date: Date) => {
	return new Date(date).toLocaleTimeString('en-US', {
		hour: 'numeric',
		minute: '2-digit',
		hour12: true
	});
};
