<template>
	<div>
		<app-user-home v-if="user" />
		<app-welcome v-else />
	</div>
</template>

<script>
	import AppWelcome from '../components/Welcome'
	import AppUserHome from '../components/UserHome'

  export default {
		computed: {
		  user () {
		    return this.$store.getters.user
			}
		},
    components: {
      AppUserHome,
      AppWelcome
    }
  }
</script>

<style>
</style>