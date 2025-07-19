<script lang="ts">
	import { Instagram, Linkedin, Pinterest, Tiktok } from '$lib/icons';
</script>

<div class="flex h-fit w-full flex-col">
	<section class="grid min-h-[calc(100dvh-12rem)] w-full grid-cols-2 flex-col bg-beige p-8">
		<div id="contact-grid-left" class="flex flex-col items-start justify-center gap-16 p-8">
			<div class="flex flex-col gap-2">
				<h1 class="font-headings text-dark-brown text-5xl font-bold tracking-wide">contact us</h1>
				<p class="font-body text-dark-brown text-2xl">we'd love to hear from you!</p>
				<p class="font-body text-dark-brown text-2xl">
					whether you have any questions about our blog, personal training services, upcoming
					activewear collection, or brand collaborations and partnerships, or just want to say hello
					and share any feedback, please feel free to reach out.
				</p>
			</div>
			<div class="flex flex-col gap-4">
				<h1 class="font-headings text-dark-brown text-5xl font-bold tracking-wide">
					let’s connect on socials
				</h1>
				<div class="flex gap-8">
					<Instagram width={40} height={40} />
					<Linkedin width={40} height={40} />
					<Pinterest width={40} height={40} />
					<Tiktok width={40} height={40} />
				</div>
			</div>
		</div>
		<div id="contact-grid-right" class="flex flex-col items-center justify-center">
            <form id="contact-form-card" class="flex flex-col gap-4 p-8 bg-white rounded-sm shadow-md">
                <div id="contact-form-body" class="flex flex-col gap-4">
                    <div id="name-fields" class="flex gap-4">
                        <div class="flex flex-col gap-2">
                            <label for="first-name" class="font-body text-dark-brown text-lg font-bold">first name</label>
                            <input type="text" id="first-name" class="font-body text-dark-brown text-lg border-[1px] border-dark-brown rounded-sm p-2 focus:outline-none focus:ring-2 focus:ring-dark-brown" placeholder="John" />
                        </div>
                        <div class="flex flex-col gap-2">
                            <label for="last-name" class="font-body text-dark-brown text-lg font-bold">last name</label>
                            <input type="text" id="last-name" class="font-body text-dark-brown text-lg border-[1px] border-dark-brown rounded-sm p-2 focus:outline-none focus:ring-2 focus:ring-dark-brown" placeholder="Doe" />
                        </div>
                    </div>
                    <div id="email-field" class="flex flex-col gap-2">
                        <label for="email" class="font-body text-dark-brown text-lg font-bold">email</label>
                        <input type="email" id="email" class="font-body text-dark-brown text-lg border-[1px] border-dark-brown rounded-sm p-2 focus:outline-none focus:ring-2 focus:ring-dark-brown" placeholder="john.doe@example.com" />
                    </div>
                    <div id="subject-field" class="flex flex-col gap-2">
                        <label for="subject" class="font-body text-dark-brown text-lg font-bold">subject</label>
                        <input type="text" id="subject" class="font-body text-dark-brown text-lg border-[1px] border-dark-brown rounded-sm p-2 focus:outline-none focus:ring-2 focus:ring-dark-brown" placeholder="type your subject here..." />
                    </div>
                    <div id="message-field" class="flex flex-col gap-2">
                        <label for="message" class="font-body text-dark-brown text-lg font-bold">message</label>
                        <textarea id="message" class="font-body text-dark-brown text-lg border-[1px] border-dark-brown rounded-sm p-2 focus:outline-none focus:ring-2 focus:ring-dark-brown" rows={10} placeholder="type your message here..."></textarea>
                    </div>
                    <button type="submit" class="font-body text-beige text-lg border-2 bg-dark-brown rounded-md p-2 hover:bg-dark-brown/70 transition-all duration-300 cursor-pointer">send</button>
                </div>
            </form>
        </div>
	</section>
</div>
