<!-- TODO: Add package booking form page -->
<script lang="ts">
    import type { PageServerData } from './$types';

    const { data }: { data: PageServerData } = $props();
    const { package: fetchedPackage } = data;
</script>

<h1>Placeholder booking page for {fetchedPackage.name}</h1>