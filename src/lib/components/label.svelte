<script lang="ts">
	import { cn } from '$lib/utils';

	let { class: className = '', children, ...restProps } = $props();
</script>

<label class={cn('mb-1 block text-sm !font-[550]', className)} {...restProps}>
	{@render children?.()}
</label>
