<script lang="ts">
	import { goto } from '$app/navigation';
	import AuthFormHeader from '$lib/components/AuthFormHeader.svelte';
	import config from '$lib/config';

	const { splitDescription } = config.site;

    const onclick = () => goto('/login');
</script>

<div class="flex h-screen w-screen flex-col items-center justify-center bg-[url(/hut-with-mountains-3.jpg)] bg-cover bg-center">
	<button {onclick} id="container" class="shadow-2xl m-4 bg-beige flex flex-col items-center justify-center gap-4 md:rounded-sm p-8 hover:animate-[pulse_3s_ease-in-out_infinite] hover:scale-110 transition-all duration-300 cursor-pointer">
        <AuthFormHeader />
		<p class="text-lg font-body text-dark-brown">
			<span class="text-light-brown">{splitDescription[0]}</span>
            <span
				class="text-dark-brown">{splitDescription[1]}</span
			>
            <span class="text-light-brown">{splitDescription[2]}</span>
		</p>
	</button>
</div>
