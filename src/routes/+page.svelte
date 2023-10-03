<script>
    import Starfield from "$lib/starfield.svelte";
    // import Starfield3dViewer from "$lib/starfield-3d.svelte";
</script>

<div class="background">
    <Starfield />
</div>
<!-- <Starfield3dViewer /> -->

<style>
.background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #000;
    z-index: -1;
}
</style>
