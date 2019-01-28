<template>
	<div class="toolbar" :style="{backgroundColor: bgColor}">
		<div class="toolbar__container">
			<router-link class="toolbar__logo" to="/">
				<img
					src="https://a.trellocdn.com/prgb/dist/images/header-logo-2x.01ef898811a879595cea.png"
					class="logo" alt="Trello"
				>
			</router-link>

			<div>
				<div class="home-button tool-bar__button">
					<router-link to="/"><i class="fas fa-home"></i></router-link>
				</div>
				<div class="boards-button tool-bar__button">
					<router-link :to="`/user/${user._id}/boards`"><i class="fab fa-trello"></i><span>&nbsp; Boards</span></router-link>
				</div>
			</div>

			<div>
				<div class="add-board-button tool-bar__button" @click="showCreateBoardModal = true">
					<i class="fas fa-plus"></i>
				</div>
				<div class="user-menu-button">
					<app-user-icon :userName="user.name" :isActive="true" @click.native="showPopUpMenu = true" />
				</div>
			</div>
		</div>

		<app-pop-up-menu
			v-if="showPopUpMenu"
			:showPopUpMenu.sync="showPopUpMenu"
			:userMenu="true"
		>
			<template slot="header">
				<b>{{user.name}}</b>
			</template>
			<template slot="first-section">
				<router-link :to="`/user/${user._id}`">Profile</router-link>
			</template>
			<template slot="second-section">
				<div @click="logout">Logout</div>
			</template>
		</app-pop-up-menu>

		<app-create-board
			v-if="showCreateBoardModal"
			:showCreateBoardModal.sync="showCreateBoardModal"
		/>
	</div>
</template>

<script>
  import AppCreateBoard from './CreateBoard'

  export default {
    props: ['bgColor'],
    data() {
      return {
        showAddBoard: false,
        showPopUpMenu: false,
        showCreateBoardModal: false
      }
    },
    computed: {
      user() {
        return this.$store.getters.user
      }
    },
    methods: {
      logout(){
        this.$router.push('/')
        this.$store.dispatch('logOutUser')
          // .then(() => {
          //   this.$router.push('/')
          // })
          // .catch((error) => {
          //   console.log(error)
          // })
      }
    },

    components: {
      AppCreateBoard
    }
  }
</script>

<style scoped>
	.toolbar {
		background-color: rgba(0,0,0,.15);
		width: 100%;
		padding: 4px;
		position: relative;
		box-sizing: border-box;
	}

	.toolbar__container {
		display: flex;
		justify-content: space-between;
	}

	.toolbar__logo {
		display: block;
		left: 50%;
		margin-left: -40px;
		opacity: .5;
		position: absolute;
		top: 6px;
		text-align: center;
		z-index: 2;
		cursor: pointer;
	}

	.toolbar__logo:hover {
		opacity: 1;
	}

	.toolbar__logo img {
		height: 30px;
	}

	.tool-bar__button {
		display: inline-block;
		height: 32px;
		vertical-align: top;
		background: hsla(0,0%,100%,.3);
		border-radius: 3px;
		color: #fff;
		margin-right: 5px;
		font-weight: 600;
		cursor: pointer;
		padding: 0 8px;
	}

	.tool-bar__button:hover {
		background: hsla(0,0%,100%,.2);
	}

	.tool-bar__button .fab {
		line-height: 32px;
		font-size: 18px;
	}

	.tool-bar__button .fas {
		line-height: 32px;
		font-size: 16px;
	}

	.tool-bar__button a {
		color: #fff;
		text-decoration: none;
	}

	.add-board-button {
		padding: 0 10px;
	}

	.user-menu-button {
		display: inline-block;
		vertical-align: top;
	}

	@media only screen and (max-width: 712px) {
		.home-button {
			display: none;
		}
	}
</style>