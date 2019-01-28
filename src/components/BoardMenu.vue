<template>
	<div class="board-menu">
		<div class="board-menu__header">
			<div class="board-menu__header-container">
				<div
					v-if="backgroundPage"
					@click="backgroundPage = !backgroundPage"
					class="back-button board-menu__back-button"
				>
					<i class="fas fa-arrow-left"></i>
				</div>
				<h3 class="board-menu__title" v-if="!backgroundPage">Menu</h3>
				<h3 class="board-menu__title" v-else>Change Background</h3>
				<app-close-button
					:size="12"
					class="board-menu__close-button"
					@click.native="close"
				/>
			</div>
		</div>
		<hr class="board-menu__header-divider">

		<div class="board-menu__content">
			<div class="board-menu__frame board-menu__scrollbar" v-if="!backgroundPage">
				<div class="board-menu__nav">
					<div class="board-menu__nav-item nav-item" @click="backgroundPage = !backgroundPage">
						<span class="background-icon board-menu__icon" :style="{background: board.background}"></span>
						Change Background
					</div>
					<div class="board-menu__nav-item nav-item" @click="deleteBoard">
						<span class="delete-icon board-menu__icon"><i class="far fa-trash-alt"></i></span>
						Delete this Board
					</div>
				</div>

				<hr>

				<app-activity-list
					v-if="activitiesLoaded"
					:activities="activities"
				>
					<template slot="show-more" v-if="allActivitiesNum > getActivityCurrentNum">
						<div class="activity-list__show-more" @click="viewAllActivities">View all activity...</div>
					</template>
				</app-activity-list>

				<div v-else class="spinner-position"><app-loader-spinner :size="'15px'" /></div>
			</div>

			<div class="board-menu__frame" v-else>
				<div class="board-menu__background-list">
					<app-background-thumbnail
						v-for="(background, index) in backgrounds"
						:key="index"
						:background="background.color"
						:active="board.background === background.color"
						class="board-menu__background-item"
						@click.native="changeBoardBackground(background.color)"
					/>
				</div>
			</div>
		</div>
	</div>

</template>

<script>
  import { mapGetters } from  'vuex'
	import AppActivityList from './ActivityList'

  export default {
    props: ['showBoardMenu', 'board', 'close'],

		data() {
      return {
        backgroundPage: false,
        getActivityCurrentNum: 15
			}
		},

		computed: {
      ...mapGetters(['user', 'backgrounds', 'activitiesLoaded', 'boardsDeleting']),

      allActivitiesNum() {
        return this.$store.getters.activitiesByBoardId(this.board._id).length
      },

			activities() {
			  return this.$store.getters.activitiesByBoardId(this.board._id).reverse().slice(0, this.getActivityCurrentNum)
			}
		},

    methods: {
      deleteBoard() {
        let result = confirm('Are you sure?')
        if (result) {
          this.$router.push({path: `/user/${this.user._id}/boards`})
          this.$store.dispatch('deleteBoard', this.board)
        }
      },

      changeBoardBackground(background) {
        this.$store.dispatch('changeBoardBackground', {
						boardId: this.board['.key'],
						boardTitle: this.board['title'],
						background
				})
			},

      viewAllActivities() {
        this.getActivityCurrentNum = this.allActivitiesNum
      },
    },

		components: {
      AppActivityList
		}
  }
</script>

<style>

	.board-menu {
		width: 339px;
		height: calc(100vh - 40px);
		background-color: #ebeef0;
		box-shadow: 0 12px 24px -6px rgba(9, 45, 66, .25), 0 0 0 1px rgba(9, 45, 66, .08);
		box-sizing: border-box;
		overflow: hidden;
	}

	.board-menu__header {
		height: 48px;
		width: 100%;
		box-sizing: border-box;
		padding: 0 12px;
		position: relative;
	}

	.board-menu__header-container {
		display: flex;
		flex-direction: row;
	}

	.board-menu__back-button {
		position: absolute;
		top: 18px;
		left: 20px;
	}

	.back-button {
		color: #798d99;
		cursor: pointer;
	}

	.back-button:hover {
		color: #17394d;
	}

	.board-menu__title {
		line-height: 20px;
		margin: 14px 32px;
		text-align: center;
		text-overflow: ellipsis;
		white-space: nowrap;
		flex: 1;
	}

	.board-menu__close-button {
		position: absolute;
		top: 18px;
		right: 16px;
	}

	.board-menu__header-divider {
		margin: 0;
	}

	hr {
		background-color: rgba(9, 45, 66, .13);
		border: 0;
		height: 1px;
		margin: 16px 0;
		padding: 0;
		width: 100%;
	}

	.board-menu__content {
		box-sizing: border-box;
		display: flex;
		height: calc(100% - 48px);
	}

	.board-menu__frame {
		padding: 0 12px;
		flex: 1 1 auto;
		overflow-y: auto;
		width: 100%;
	}

	.board-menu__scrollbar::-webkit-scrollbar {
		height: 8px;
		width: 8px;
	}

	.board-menu__scrollbar::-webkit-scrollbar {
		height: 8px;
		width: 8px;
	}

	.board-menu__scrollbar::-webkit-scrollbar-track-piece {
		background: rgba(9, 45, 66, .08);
	}

	.board-menu__scrollbar::-webkit-scrollbar-thumb {
		background: #BEC8CD;
		border-radius: 4px;
	}

	.board-menu__scrollbar::-webkit-scrollbar-button {
		display: block;
		height: 5px;
		width: 5px;
	}

	.board-menu__nav {
		margin-top: 12px;
	}

	.board-menu__nav-item {
		margin: 4px 0;

	}

	.nav-item {
		border-radius: 3px;
		display: block;
		font-weight: 700;
		line-height: 20px;
		text-decoration: none;
		padding: 6px 6px 6px 38px;
		position: relative;
		cursor: pointer;
	}

	.nav-item:hover {
		background-color: rgba(9, 45, 66, .13);
	}

	.board-menu__icon {
		position: absolute;
		top: 5px;
		left: 7px;
	}

	.background-icon, .delete-icon  {
		height: 20px;
		width: 20px;
		border-radius: 3px;
		font-size: 18px;
		line-height: 1;
		color: #798d99;
		text-align: center;
	}

	.board-menu__background-list {
		margin-top: 12px;
		display: flex;
		justify-content: space-between;
	}

	@media only screen and (max-width: 712px) {
		.board-menu {
			max-width: 310px;
		}
	}

</style>