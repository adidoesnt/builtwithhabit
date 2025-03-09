<script lang="ts">
    import { user } from '$lib/stores/auth';
</script>

<div>
    <h1>{$user?.id}</h1>
</div>