<template>
	<!--v-click-outside="close"-->
	<div
		class="popup-menu"
		:class="{ 'user-menu': userMenu, 'list-menu': isListMenu, 'rename-board': renameBoard }"
	>
		<div class="popup-menu__header">
			<span><slot name="header"></slot></span>
			<div class="popup-menu__close-button">
				<app-close-button :size="10" @click.native="$emit('update:showPopUpMenu', false)" />
			</div>
		</div>
		<div class="popup-menu__body">
			<div class="popup-menu__divider"></div>
			<div v-if="renameBoard">
				<slot name="form"></slot>
			</div>
			<div v-else>
				<div class="popup-menu__option">
					<slot name="first-section"></slot>
				</div>
				<div class="popup-menu__divider"></div>
				<div class="popup-menu__option">
					<slot name="second-section"></slot>
				</div>
			</div>
		</div>

		<div class="overlay" @click="close"></div>

	</div>
</template>

<script>
  export default {
    props: [
      'showPopUpMenu',
			'userMenu',
			'isListMenu',
			'renameBoard',
		],

    methods: {
      close() {
        this.$emit('update:showPopUpMenu', false)
      }
    }
  }
</script>

<style scoped>
	.popup-menu {
		width: 300px;
		border-radius: 3px;
		box-shadow: 0 12px 24px -6px rgba(9, 45, 66, .25), 0 0 0 1px rgba(9, 45, 66, .08);
		background: #fff;
		position: absolute;
		z-index: 999;
	}

	.overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: transparent;
		z-index: 0;
	}

	.user-menu {
		top: 40px;
		right: 5px;
	}

	.list-menu {
		top: 40px;
		left: 250px;
	}

	.rename-board {
		top: 85px;
		left: 10px;
	}

	.popup-menu__header {
		padding: 12px 0;
		color: #6b808c;
		text-align: center;
		font-weight: 500;
		position: relative;
		text-overflow: ellipsis;
		white-space: nowrap;
		z-index: 10;
	}

	.popup-menu__close-button {
		position: absolute;
		top: 14px;
		right: 20px;
	}

	.popup-menu__body {
		position: relative;
		z-index: 10;
	}

	.popup-menu__option {
		margin: 8px 0;
		padding: 10px 15px;
		font-weight: 600;
		color: #17394d;
	}

	.popup-menu__option a {
		display: block;
		text-decoration: none;
		color: #17394d;
	}

	.popup-menu__option a:hover {
		color: #fff;
	}

	.popup-menu__option:hover {
		background-color: #298fca;
		color: #fff;
		cursor: pointer;
	}

	.popup-menu__divider {
		margin: 0 15px;
		border-bottom: 1px solid rgba(9,45,66,.13);
	}

	@media only screen and (max-width: 712px) {
		.list-menu {
			top: 40px;
			left: 0;
		}
	}



</style>