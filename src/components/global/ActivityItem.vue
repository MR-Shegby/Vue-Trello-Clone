<template>
	<div class="activity-item">
		<div class="activity-item__user-icon">
			<app-user-icon :userName="user.name" />
		</div>
		<div class="activity-item__desc">
			<span class="activity-item__user-name">{{user.name}} </span>

			<span v-if="activity.type === 'board'">
				<span v-if="activity.action === 'renamed'">
					renamed <span v-if="!isProfile">this</span> board
					from <span class="object">{{activity.boardOldTitle}}</span>
					to <span class="object">{{activity.boardNewTitle}}</span></span>
				<span v-else>{{activity.action}} board</span>
			</span>

			<span v-else-if="activity.type === 'the background'">
				{{activity.action}} {{activity.type}} <span v-if="!isProfile"> of this board</span>
			</span>

			<span v-else-if="activity.type === 'list'">{{activity.action}} list
				<span v-if="activity.action === 'added'">
					<span class="object">{{activity.listTitle}}</span> <span v-if="!isProfile"> to this board</span>
				</span>
				<span v-else><span class="object">{{activity.listTitle}}</span></span>
			</span>

			<span v-else-if="activity.type === 'card'">{{activity.action}} card
				<span v-if="activity.action === 'added'">
					<span class="object">{{activity.cardTitle}}</span>
					to list <span class="object">{{activity.listTitle}}</span></span>
				<span v-else><span class="object">{{activity.cardTitle}}</span>
					from list <span class="object">{{activity.listTitle}}</span>
				</span>
			</span>
		</div>
		<div class="activity-item__date">
			<span>{{ activity.created_at | moment("lll") }}</span>
			<span v-if="isProfile"> - on board
				<span class="activity-item__board-name">
					{{activity.boardTitle}}
				</span>
			</span>
		</div>
	</div>
</template>

<script>
  export default {
		props: ['activity', 'isProfile'],
		computed: {
		  user() {
		    return this.$store.getters.user
			}
		}
  }
</script>

<style scoped>
	.object {
		color: #6b808c;
	}

	.activity-item {
		border-bottom: 1px solid rgba(9, 45, 66, .13);
		min-height: 32px;
		padding: 12px 0;
		position: relative;
		/*max-width: 610px;*/
		/*word-wrap: break-word;*/
		/*overflow-wrap: break-word;*/
	}

	.activity-item:last-child {
		border: none;
	}

	.activity-item__user-icon {
		position: absolute;
		left: -40px;
		top: 12px;
		margin-right: 4px;
	}

	.activity-item__desc {
		margin: 0 24px 0 0;

		max-width: 610px;
		white-space: normal;
		word-wrap: break-word;
		overflow-wrap: break-word;
	}

	.activity-item__user-name {
		font-weight: 700;
	}

	.activity-item__date {
		display: inline-block;
		font-size: 12px;
		margin: 0;
		min-width: 110px;
		color: #6b808c;

		/*max-width: 610px;*/
		/*word-wrap: break-word;*/
		/*overflow-wrap: break-word;*/
	}

	.activity-item__board-name {
		font-weight: 600;
	}
</style>