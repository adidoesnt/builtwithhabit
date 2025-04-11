<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const { booking } = data;
</script>

<div>
	<h1>{booking?.package?.name}</h1>
	<p>{booking?.package?.description}</p>
	<p>{booking?.package?.price}</p>
	<p>{booking?.purchase?.address}</p>
	<p>{booking?.purchase?.postalCode}</p>
	<p>{booking?.client?.firstName}</p>
	<p>{booking?.client?.lastName}</p>
	<p>{booking?.trainer?.firstName}</p>
	<p>{booking?.trainer?.lastName}</p>
	<p>{booking?.start}</p>
	<p>{booking?.end}</p>
</div>
