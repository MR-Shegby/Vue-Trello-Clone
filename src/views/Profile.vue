<template>
	<div class="profile">
		<app-tool-bar :bgColor="'#026aa7'" />
		<div class="profile__header">
			<div class="profile-header">
				<app-user-icon :userName="user.name" :size="'large'" />
				<div class="profile-header__details">
					<div v-if="!showEditProfile">
						<div class="user-details profile-header__user-details">
							<h1 class="user-details__name">{{user.name}}</h1>
							<p class="user-details__id">@{{user._id}}</p>
						</div>
						<app-action-button :value="'Edit profile'" :greybg="true" @click.native="showEditProfile = true" />
					</div>

					<div v-else class="user-data-form">
						<label class="user-data-form__label-name" for="username">Username</label>
						<input class="user-data-form__input-name" type="text" id="username" v-model="userName" maxlength="100">
						<div v-if="!userUpdating">
							<app-action-button
								:value="'Save'"
								:size="'wide'"
								@click.native="updateUserData"
								:loadingDataStatus="userUpdating"
							/>
							<app-action-button
								:value="'Cancel'"
								:greybg="'greybg'"
								@click.native="showEditProfile = false"
							/>
						</div>
						<div v-else class="user-update__spinner">
							<app-loader-spinner :size="'10px'" />
						</div>
					</div>

				</div>
			</div>
		</div>

		<app-activity-list
			v-if="activitiesLoaded"
			:activities="activities"
			:isProfile="true"
			class="profile__activity-list"
		>
			<template slot="show-more" v-if="allActivitiesNum > getActivityCurrentNum">
				<div class="activity-list__show-more" @click="viewMoreActivity">View more activity...</div>
			</template>
		</app-activity-list>

		<div v-else class="activity__spinner"><app-loader-spinner :size="'15px'" /></div>
	</div>
</template>

<script>
  import { mapGetters } from  'vuex'
	import AppToolBar from '../components/ToolBar'
  import AppActivityList from '../components/ActivityList'

  export default {
	  data() {
	    return {
				showEditProfile: false,
        userName: '',
        getActivityCurrentNum: 15
			}
		},

		watch: {
      showEditProfile (val) {
        if (val) {
          this.userName = this.user.name
				}
			}
		},

	  computed: {
			...mapGetters(['user', 'activitiesLoaded', 'userUpdating']),

      allActivitiesNum() {
        return this.$store.getters.activities.length
      },

      activities () {
			  return this.$store.getters.activitiesSortedByDate.reverse().slice(0, this.getActivityCurrentNum)
			}
		},

		methods: {
      async updateUserData() {
        await this.$store.dispatch('updateUserData', this.userName)
				this.showEditProfile = false
			},

      viewMoreActivity() {
				this.getActivityCurrentNum += 15
      }
		},

	  components: {
      AppToolBar,
      AppActivityList
		}
  }
</script>

<style scoped>
	.profile {
		/*width: 100%;*/
	}

	.profile__header {
		background-color: #f5f6f7;
	}

	.profile-header {
		margin: 0 auto;
		max-width: 450px;
		padding: 32px;
		position: relative;
		display: flex;
	}

	.profile-header__details {
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin: 0 0 0 20px;
	}

	.profile-header__user-details {
		margin-bottom: 8px;
	}

	.user-details {
		display: flex;
		flex-direction: row;
		align-items: baseline;
	}

	.user-details__name {
		font-size: 24px;
		line-height: 28px;
	}

	.user-details__id {
		display: inline-block;
		font-size: 12px;
		color: #6b808c;
		padding: 0 6px 0 2px;
		position: relative;
		margin: 0 2px;
	}

	.user-data-form__label-name {
		color: #6b808c;
		font-size: 12px;
		font-weight: 600;
		line-height: 16px;
		display: block;
		margin-bottom: 4px;
	}

	.user-data-form__input-name {
		width: 250px;
		background-color: #ebeef0;
		border: 1px solid #dfe3e6;
		box-shadow: none;
		box-sizing: border-box;
		border-radius: 3px;
		display: block;
		line-height: 20px;
		padding: 6px 8px;
	}

	.profile__activity-list {
		margin: 0 auto;
		max-width: 650px;
		padding: 32px;
	}

	.activity__spinner {
		margin: 50px auto 0;
	}

	.user-update__spinner {
		margin-top: 10px;
		margin-left: 5px;
	}

	@media only screen and (max-width: 712px) {

		.profile__header{
			padding: 10px 5px;
		}

		.profile-header{
			padding: 0;
		}

		.profile-header__details {
			margin-left: 5px;
		}

		.profile-header__user-details {
			flex-direction: column;
			margin-bottom: 0;
		}

		.user-details__name {
			margin-bottom: 5px;
		}

		.user-details__id {
			margin-left: 0;
		}

		.user-data-form__input-name {
			width: 220px;
		}
	}
</style>