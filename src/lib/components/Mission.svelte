<script lang="ts">
	const { background = 'bg-white' } = $props();
</script>

<section
	id="mission-section"
	class={`text-dark-brown flex min-h-[calc(100dvh-9rem)] flex-col place-items-center gap-8 ${background} p-16`}
>
	<h1 class="font-headings text-dark-brown text-5xl font-bold tracking-wide">our brand mission</h1>
	<div class="grid grid-cols-[2fr_1fr] gap-8 text-left">
		<div id="mission-text" class="flex flex-col justify-center gap-4">
			<p class="font-body text-dark-brown text-2xl">
				sweat smarter. <span class="font-bold">live stronger.</span>
			</p>
			<p class="font-body text-dark-brown text-2xl">
				at builtwithhabit, we blend science-backed coaching and skin-safe activewear to help you
				train smarter, feel stronger, and build habits that last.
			</p>
			<p class="font-body text-dark-brown text-2xl">
				on the coaching side, we root things in the basics: resistance training, whole-food
				nutrition, and sustainable structure, personalised to you. smart, science-backed progress.
			</p>
			<p class="font-body text-dark-brown text-2xl">
				on the activewear front, we’re rethinking apparel from the fiber up. no polyester, no
				plastic-based coatings, no harmful dyes, no greenwashed gimmicks - just skin-safe fabrics
				engineered for real performance. from glute-sculpting leggings to high-support bras, our
				pieces are seamless, sweat-wicking, and intentionally-built for intense motion.
			</p>
		</div>
		<div id="mission-image" class="flex items-center justify-center overflow-hidden rounded-sm">
			<img
				src="/headshot.jpg"
				alt="Headshot of the founder"
				class="h-full w-full rounded-sm object-cover"
			/>
		</div>
	</div>
</section>
