<template>
	<div>
		<app-tool-bar :bgColor="'#026aa7'" />
		<div class="user-home">
			<div class="user-home__menu"><app-user-home-menu/></div>
			<div class="user-home__content"><router-view/></div>
		</div>
	</div>
</template>

<script>
	import AppToolBar from '../components/ToolBar'
  import AppUserHomeMenu from '../components/UserHomeMenu'
  import { mapGetters } from 'vuex'

  export default {
    components: {
      AppToolBar,
      AppUserHomeMenu
    }
  }
</script>

<style>
	.user-home {
		display: flex;
		margin: 40px 0 0 10px;
	}

	.user-home__menu {
		flex-basis: 16%;
		margin-right: 8%;
	}

	.user-home__content {
		flex-basis: 76%;
	}

	@media only screen and (max-width: 712px) {
		.user-home {
			flex-wrap: wrap;
		}

		.user-home__content {
			flex-basis: 100%;
		}
	}

</style>