<script lang="ts">
	import { Mission } from '$lib/components';
</script>

<div class="flex h-fit w-full flex-col">
	<section id="hero-section" class="flex min-h-[calc(100dvh-12rem)] w-full flex-col bg-white">
		<div class="flex w-full flex-col items-center justify-center gap-8 p-8">
			<h1 class="font-headings text-dark-brown text-5xl font-bold tracking-wide">our why</h1>
			<div class="grid grid-cols-[1fr_2fr] gap-8 text-left">
				<div
					id="why-image"
					class="flex flex-col items-center justify-center gap-4 overflow-hidden rounded-sm"
				>
					<img
						src="/training-image-1.jpg"
						alt="Founder at the beach"
						class="aspect-[8/9] h-full w-full rounded-sm object-cover"
					/>
					<a
						href="/blog"
						class="font-body bg-dark-brown text-beige hover:bg-dark-brown/80 flex w-fit self-center rounded-md px-4 py-2 text-center text-xl transition-all duration-300 hover:scale-105"
					>
						learn more about my journey!
					</a>
				</div>
				<div id="why-text" class="flex flex-col justify-center gap-4">
					<p class="font-body text-dark-brown text-2xl">
						hi, i’m ishita, a NASM-certified trainer with a deep love for movement and a passion for
						helping women build strength they can actually feel.
					</p>
					<p class="font-body text-dark-brown text-2xl">
						as i’ve grown older, my relationship with fitness has evolved from rigid routines to
						something more intuitive and empowering. lifting has become my anchor; a way to feel
						clear, consistent, and at home in my body: and i wanted others to experience this too.
					</p>
					<p class="font-body text-dark-brown text-2xl">
						as i coached more women and dove deeper into the science, though, i realised something
						was still missing; not just in how we train, but what we train in. that’s where the
						activewear came in. builtwithhabit was born out of a desire to create gear that’s as
						intentional as the training itself: high-performance, skin-safe, and free from the
						hidden plastics and toxins found in most athletic wear.
					</p>
					<p class="font-body text-dark-brown text-2xl">
						today, i blend that lived experience with science-backed coaching and
						thoughtfully-engineered apparel: to support your habits, from the inside out.
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Mission section -->
	<Mission background="bg-beige" />
</div>
