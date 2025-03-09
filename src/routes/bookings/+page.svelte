<script>
    import Packages from '$lib/components/Packages.svelte';
    import config from '$lib/config';

    const { description } = config.bookings;
</script>

<Packages {description} />