<template>
	<div class="spinner">
		<PulseLoader :color="'black'" :size="size"></PulseLoader>
	</div>
</template>

<script>
  import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

  export default {
    props: ['size'],
    components: {
      PulseLoader,
    }
  }
</script>

<style scoped>
	.spinner {
		opacity: .3;
		text-align: center;
	}
</style>