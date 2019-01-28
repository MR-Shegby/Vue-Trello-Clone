<template>
	<div
		class="user-icon"
		:class="[iconSize, {active: isActive}]"
	>
		<span class="user-icon__initials">{{userName[0].toUpperCase()}}</span>
	</div>
</template>

<script>
  export default {
		props: ['userName', 'size', 'isActive'],
		computed: {
		  iconSize() {
		    if (this.size === 'large') return 'large'
				return 'small'
			}
		}
  }
</script>

<style>
	.user-icon {
		background-color: #dfe3e6;
		border-radius: 25em;
		color: #17394d;
		display: block;
		position: relative;
		text-decoration: none;
		user-select: none;
	}

	.user-icon.small {
		height: 32px;
		width: 32px;
	}

	.user-icon.large {
		height: 85px;
		width: 85px;
	}

	.user-icon.small .user-icon__initials {
		font-size: 12px;
		line-height: 32px;
	}

	.user-icon.large .user-icon__initials {
		font-size: 34px;
		line-height: 85px;
	}

	.user-icon.active:hover {
		background-color: #c2ccd1;
		cursor: pointer;
	}

	.user-icon__initials {
		display: block;
		font-weight: 700;
		height: 32px;
		position: absolute;
		text-align: center;
		width: 100%;
	}
</style>