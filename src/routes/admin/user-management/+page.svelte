<script lang="ts">
    import { user } from '$lib/stores/auth';
</script>

<div>
    {$user?.email}
</div>