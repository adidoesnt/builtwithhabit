<script lang="ts">
	import { page } from '$app/state';
	import config from '$lib/config';
	import Instagram from '$lib/icons/Instagram.svelte';
	import Email from '$lib/icons/Email.svelte';
	import Mobile from '$lib/icons/Mobile.svelte';

	const { description, contact } = config.site;

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

<footer class="bg-dark-brown text-beige px-4 py-12 md:px-0">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="grid grid-cols-1 gap-8 md:grid-cols-3">
			<div id="footer-logo" class="flex flex-col items-start">
				<a href="/" class="mb-4 inline-block">
					<img src="/bwh-logo.png" alt="Built with Habit Logo" class="h-30 w-auto rounded-sm" />
				</a>
				<p class="font-body text-beige text-sm md:max-w-1/2">
					{description}
				</p>
			</div>

			<div class="justi flex flex-col">
				<h3 class="font-headings mb-4 text-lg font-semibold">Quick Links</h3>
				<ul class="font-body flex flex-col space-y-2 text-sm">
					<li>
						<a href={isHomePage ? '#' : '/'} class="hover:text-light-brown transition-colors">
							{isHomePage ? 'Back to top' : 'Home'}
						</a>
					</li>
					<li>
						<a
							href="#about"
							class="hover:text-light-brown transition-colors"
							onclick={(e) => smoothScroll(e, 'about')}
						>
							Mission
						</a>
					</li>
					<li>
						<a
							href="#pricing"
							class="hover:text-light-brown transition-colors"
							onclick={(e) => smoothScroll(e, 'pricing')}
						>
							Packages
						</a>
					</li>
					<li>
						<a
							href="/signup"
							class="hover:text-light-brown transition-colors"
							class:text-light-brown={page.url.pathname === '/signup'}
						>
							Sign up
						</a>
					</li>
					<li>
						<a
							href="/login"
							class="hover:text-light-brown transition-colors"
							class:text-light-brown={page.url.pathname === '/login'}
						>
							Log in
						</a>
					</li>
				</ul>
			</div>

			<div id="footer-contact" class="flex flex-col">
				<h3 class="font-headings mb-4 text-lg font-semibold">Contact Us</h3>
				<ul class="font-body flex flex-col space-y-3 text-sm">
					<li class="flex items-center">
						<span class="text-beige mr-2 flex h-5 w-5 items-center justify-center">
							<Email href={`mailto:${contact.email}`} />
						</span>
						<a href={`mailto:${contact.email}`} class="hover:text-light-brown transition-colors">
							{contact.email}
						</a>
					</li>
					<li class="flex items-center">
						<span class="text-beige mr-2 flex h-5 w-5 items-center justify-center">
							<Mobile href={`tel:${contact.phone}`} />
						</span>
						<a href={`tel:${contact.phone}`} class="hover:text-light-brown transition-colors">
							{contact.phone}
						</a>
					</li>
					<li class="flex items-center">
						<span class="text-beige mr-2 flex h-5 w-5 items-center justify-center">
							<Instagram href={contact.instagram.link} />
						</span>
						<a
							href={contact.instagram.link}
							target="_blank"
							rel="noopener noreferrer"
							class="hover:text-light-brown transition-colors"
						>
							{contact.instagram.handle}
						</a>
					</li>
				</ul>
			</div>
		</div>

		<div class="font-body border-beige/20 mt-12 border-t pt-8 text-center text-xs">
			<p>
				© {new Date().getFullYear()} <span class="text-light-brown">Beings of Habit</span>. All
				rights reserved.
			</p>
		</div>
	</div>
</footer>
