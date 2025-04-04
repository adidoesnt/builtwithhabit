<script lang="ts">
	import config from '$lib/config';

	const { support } = config.site;
	const { className }: { className?: string } = $props();
</script>

<p class={className}>
	To reschedule a booking, please contact our support team at
	<a href={`mailto:${support.email}`} class="text-dark-brown underline">{support.email}</a>.
</p>
<p class={className}>
	Requests to book or reschedule sessions less than 24 hours before the session will be considered on a case-by-case
	basis.
</p>
