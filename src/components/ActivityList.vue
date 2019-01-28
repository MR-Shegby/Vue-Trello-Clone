<template>
	<div class="activity-list">
		<div class="activity-list__header" :class="{profile: isProfile}">
			<span class="activity-icon activity-list__icon"><i class="fas fa-clipboard-list"></i></span>
			<span class="activity-list__title">Activity</span>
		</div>

		<app-activity-item
			v-for="activity in activities"
			:key="activity['.key']"
			:activity="activity"
			:isProfile="isProfile"
			class="activity-list__item"
		/>
		<slot name="show-more"></slot>
	</div>
</template>

<script>
  export default {
    props: ['activities', 'isProfile']
  }
</script>

<style scoped>
	.activity-list__header {
		border-radius: 3px;
		display: block;
		line-height: 20px;
		padding: 6px 6px 6px 40px;
		position: relative;
		text-decoration: none;
		cursor: default;
	}

	.profile {
		margin-bottom: 10px;
	}

	.activity-list__title {
		font-weight: 700;
	}

	.profile .activity-list__title {
		font-size: 18px;
	}

	.activity-list__icon {
		position: absolute;
		top: 5px;
		left: 7px;
	}

	.profile .activity-list__icon {
		font-size: 21px;
	}

	.activity-icon  {
		height: 20px;
		width: 20px;
		border-radius: 3px;
		font-size: 18px;
		line-height: 1;
		color: #798d99;
		text-align: center;
	}

	.activity-list__item {
		margin-left: 40px;
	}

	.activity-list__show-more {
		border-radius: 3px;
		color: #6b808c;
		text-decoration: underline;
		padding: 16px 8px 16px 40px;
		margin-top: 16px;
		cursor: pointer;
	}

	.activity-list__show-more:hover {
		background-color: rgba(9,45,66,.13);
		color: #092d42;
	}
</style>