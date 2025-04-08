<script lang="ts">
    import config from '$lib/config';

    const { packages: { learnMore } } = config;
</script>

<div class="overflow-hidden rounded-lg bg-white shadow-md hidden md:block">
    <div class="overflow-x-auto">
        <table class="w-full min-w-[800px] border-collapse">
            <thead class="bg-gray-50">
                <tr>
                    <th class="font-body text-dark-brown border-b p-4 text-left">Package</th>
                    <th class="font-body text-dark-brown border-b p-4 text-left">Sessions</th>
                    <th class="font-body text-dark-brown border-b p-4 text-left">Description</th>
                </tr>
            </thead>
            <tbody>
                {#each learnMore.packages as packageItem, i}
                    <tr class={`${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                        <td
                            class="font-body text-dark-brown overflow-y-auto border-b p-4"
                            >{packageItem.name}</td
                        >
                        <td
                            class="font-body text-dark-brown overflow-y-auto border-b p-4"
                            >{packageItem.sessions}</td
                        >
                        <td
                            class="font-body text-dark-brown overflow-y-auto border-b p-4"
                            >{packageItem.description}</td
                        >
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>