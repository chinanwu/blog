<script>
	import routes from './router';

	let current = "/";
</script>

<main>
	<svelte:component this={routes[current]}/>
</main>

<!--
TODO:
- Does svelte:component lazy load components?
-->
