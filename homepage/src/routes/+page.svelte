<script>
    import Starfield from "$lib/starfield.svelte";

    const reactUrl = import.meta.env.VITE_REACT_APP_URL;
    const vueUrl = import.meta.env.VITE_VUE_APP_URL;
</script>

<svelte:head>
    <title>Portfolio Home Page</title>
</svelte:head>

<Starfield />

<div class="links">
    <p>Hello world! Home app</p>
    <a href="{reactUrl}">React</a>
    <a href="{vueUrl}">Vue</a>
</div>

<style lang="scss">
.links {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 8px;

    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    height: max-content;
    width: max-content;
    padding: 16px;

    color: white;
    background: rgba( 255, 255, 255, 0.25 );
    box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
    backdrop-filter: blur( 2px );
    border-radius: 8px;
    border: 1px solid rgba( 255, 255, 255, 0.18 );
}

a {
    color: white;

    &:visited {
        color: white;
    }
}
</style>
