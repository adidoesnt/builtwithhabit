<script lang="ts">
	import { page } from '$app/state';
	import config from '$lib/config';
	import { Instagram, Email, Mobile, House, Linkedin, Pinterest, Tiktok } from '$lib/icons';

	const { description, contact, contactCta } = config.site;

	const { routes } = $props();

	let links = $derived(
		Object.values(routes || {}).map((route: any) => ({
			label: route.label,
			href: route.href
		}))
	);

	function smoothScroll(e: Event, targetId: string) {
		e.preventDefault();
		const targetElement = document.getElementById(targetId);

		if (targetElement) {
			targetElement.scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			});
		}
	}

	let isHomePage = $derived(page.url.pathname === '/');
</script>

<footer class="bg-dark-brown text-beige px-4 py-12 lowercase md:px-0">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="grid grid-cols-1 gap-8 md:grid-cols-3">
			<div id="footer-logo" class="flex flex-col items-start gap-2">
				<a href="/" class="mb-4 inline-block">
					<img src="/bwh-logo.png" alt="Built with Habit Logo" class="h-30 w-auto rounded-sm" />
				</a>
				<p class="font-body text-beige text-sm md:max-w-1/2">
					{description}
				</p>
				<p class="font-body text-beige text-sm md:max-w-1/2">
					{contactCta}
				</p>
			</div>

			<div class="justi flex flex-col">
				<h3 class="font-headings mb-4 text-lg font-semibold">Quick Links</h3>
				<ul class="font-body flex flex-col space-y-2 text-sm">
					{#each links as route}
						<li class="flex items-center">
							<a href={route.href} class="hover:text-light-brown transition-colors">
								{route.label}
							</a>
						</li>
					{/each}
				</ul>
			</div>

			<div id="footer-contact" class="flex flex-col">
				<h3 class="font-headings mb-4 text-lg font-semibold">Contact Us</h3>
				<ul class="font-body flex flex-col space-y-3 text-sm">
					<li class="flex items-center">
						<span class="text-beige mr-2 flex h-5 w-5 items-center justify-center">
							<House />
						</span>
						<p class="hover:text-light-brown transition-colors">
							{contact.address}
						</p>
					</li>
					<li class="flex items-center">
						<span class="text-beige mr-2 flex h-5 w-5 items-center justify-center">
							<Email />
						</span>
						<a href={`mailto:${contact.email}`} class="hover:text-light-brown transition-colors">
							{contact.email}
						</a>
					</li>
					<li class="flex items-center">
						<span class="text-beige mr-2 flex h-5 w-5 items-center justify-center">
							<Mobile />
						</span>
						<a href={`tel:${contact.phone}`} class="hover:text-light-brown transition-colors">
							{contact.phone}
						</a>
					</li>
				</ul>

				<!-- Social Media Section -->
				<div class="mt-6">
					<h3 class="font-headings mb-4 text-lg font-semibold">socials</h3>
					<div class="flex space-x-4">
						<Instagram />
						<Linkedin />
						<Pinterest />
						<Tiktok />
					</div>
				</div>
			</div>
		</div>

		<div class="font-body border-beige/20 mt-12 border-t pt-8 text-center text-xs">
			<p>
				© {new Date().getFullYear()} <span class="text-light-brown">builtwithhabit</span>. All
				rights reserved.
			</p>
		</div>
	</div>
</footer>
