import Home from "./routes/Home.svelte";

const routes = {
	"/": Home,
	"/about": () => import('./routes/About.svelte'),
}

export default routes;

// Svelte router using svelte:component ? :o
// TODO:
// Web browser history

// Research:
// - https://medium.com/@bryanmanuele/how-i-implemented-my-own-spa-routing-system-in-vanilla-js-49942e3c4573
// - https://router.vuejs.org/
// - https://css-tricks.com/build-a-custom-vue-router/
// - https://github.com/ItalyPaleAle/svelte-spa-router
// -
