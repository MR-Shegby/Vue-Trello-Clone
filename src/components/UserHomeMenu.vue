<template>
	<ul>
		<router-link tag="li" class="li" active-class="active" :to="`/user/${user._id}/boards`"><i class="fab fa-trello"></i>&nbsp;Boards</router-link>
		<router-link tag="li" class="li" exact active-class="active" to="/"><i class="fas fa-home"></i>&nbsp;Home</router-link>
	</ul>
</template>

<script>
  export default {
    computed: {
      user() {
        return this.$store.getters.user
      }
    }
  }
</script>

<style scoped>
	ul {
		list-style: none;
		display: flex;
		flex-direction: column;
		margin-bottom: 20px;
	}

	.li {
		font-family: Roboto sans-serif;
		font-size: 15px;
		padding: 7px 10px;
		margin-bottom: 3px;
		cursor: pointer;
		font-weight: 600;
		border-radius: 3px;
		white-space: nowrap;
	}

	.li:hover:not(.active)  {
		background: rgba(9, 45, 66, 0.13);
	}

	.active {
		background: #e4f0f6;
		color: #026aa7;
	}

	@media only screen and (max-width: 712px) {
		ul {
			flex-direction: row;
		}
	}


</style>