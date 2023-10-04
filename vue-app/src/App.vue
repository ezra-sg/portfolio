<script setup>
const homeUrl = import.meta.env.VITE_HOME_APP_URL;
const reactUrl = import.meta.env.VITE_REACT_APP_URL;
</script>

<template>
<p>Hello world! Vue app</p>
<a :href="homeUrl">Home</a>
<br>
<a :href="reactUrl">React</a>
</template>

<style scoped>
</style>
