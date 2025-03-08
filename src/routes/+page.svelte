<script lang="ts">
	import { goto } from '$app/navigation';
	import config from '$lib/config';

	const { splitName, caption, splitDescription, logo } = config.site;

    const onclick = () => {
        const container = document.getElementById('container');
        if (container) {
            container.classList.add('animate-ping');
            goto('/about');
        }
    }
</script>

<div class="flex h-screen w-screen flex-col items-center justify-center">
	<button {onclick} id="container" class="bg-beige flex flex-col items-center justify-center gap-2 rounded-sm p-8 hover:animate-[pulse_3s_ease-in-out_infinite] hover:scale-110 transition-all duration-300 cursor-pointer">
        <div class="flex gap-4 items-center">
            <img src={logo} alt="logo" class="w-40 h-auto mix-blend-multiply" />
            <div class="border-l-2 border-light-brown h-full"></div>
            <div class="flex flex-col gap-2">
                <h1 class="font-headings text-4xl font-bold">
                    <span class="text-dark-brown">{splitName[0]}</span><span class="text-light-brown"
                        >{splitName[1]}</span
                    ><span class="text-dark-brown">{splitName[2]}.</span>
                </h1>
                <p class="font-body flex self-start text-sm text-light-brown">{caption}</p>
            </div>
        </div>
		<p class="text-lg font-body text-dark-brown">
			<span class="text-light-brown">{splitDescription[0]}</span>
            <span
				class="text-dark-brown">{splitDescription[1]}</span
			>
            <span class="text-light-brown">{splitDescription[2]}</span>
		</p>
	</button>
</div>
