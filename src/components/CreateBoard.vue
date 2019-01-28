<template>
	<div>
		<div class="modal" :class="{active: showCreateBoardModal}">
			<form @submit.prevent="createBoard">
				<div
					class="modal__body"
					:style="{background: boardData.background}"
				>
					<input
						ref="input"
						class="modal__input"
						type="text"
						maxlength="100"
						placeholder="Add board title"
						v-model="boardData.title"
					>
					<app-close-button
						:size="10"
						:white="'true'"
						class="modal__close-button"
						@click.native="$emit('update:showCreateBoardModal', false)"
					/>
				</div>

				<app-action-button
					:value="'Create Board'"
					:greenbg="'greenbg'"
					:disabled="!boardData.title"
					:submit="true"
				/>
			</form>

			<div class="modal__background-list">
				<app-background-thumbnail
					v-for="(background, index) in backgrounds"
					:key="index"
					:background="background.color"
					:checked="background.checked"
					@click.native="setBackground(background.color, index)"
					class="modal__background-item"
				/>
			</div>
		</div>

		<div class="modal__overlay" :class="{active: showCreateBoardModal}" @click="close"></div>
	</div>
</template>

<script>
  export default {
    props: ['showCreateBoardModal'],
		data() {
      return {
        boardData: {
          title: '',
          background: '',
        },
        checked: false,
				backgrounds: []
			}
		},

		created() {
      this.$store.getters.backgrounds.forEach(bg => {
        this.backgrounds.push({...bg})
			})
      this.backgrounds[0].checked = true
      this.boardData.background = this.backgrounds[0].color

    },

    mounted(){
      this.$nextTick(() => this.$refs.input.focus())
    },

		computed: {
      bgColor () {
        let bgObject = this.backgrounds.find(bg => {
          return bg.checked === true
				})
				return bgObject.color
			},
		},

		methods: {
      setBackground(color, index) {
        this.boardData.background  = color

        this.backgrounds.map((bgObj, i) => {
          if (i === index) {
            return bgObj.checked = true
					} else {
            return bgObj.checked = false
					}
				})
			},

      createBoard() {
        this.$store.dispatch('createBoard', this.boardData)
        this.close()
      },

			close() {
        this.backgrounds = []
        this.boardData.title = ''
        this.boardData.background = ''
        this.$emit('update:showCreateBoardModal', false)
			}
		}
  }
</script>

<style scoped>
	.modal {
		opacity: 0;
		visibility: hidden;
		width: 100%;
		max-width: 420px;
		position: fixed;
		top: 120px;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 9999;
		border-radius: 3px;
		background-color: transparent;
		transition: 0.3s all;
		display: flex;

	}

	.modal__overlay {
		opacity: 0;
		visibility: hidden;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, .8);
		z-index: 1;
		transition: .3s all;
	}

	.modal.active,
	.modal__overlay.active {
		opacity: 1;
		visibility: visible;
	}

	.modal__body {
		position: relative;
		width: 300px;
		height: 96px;
		border-radius: 3px;
	}

	.modal__close-button {
		position: absolute;
		top: 15px;
		right: 10px;
		cursor: pointer;
	}

	.modal__input {
		margin: 15px 10px 0;
		padding: 2px 8px;
		width: calc(100% - 18px - 56px);
		background: rgba(255,255,255, .2);
		border-radius: 3px;
		border: none;
		color: #fff;
		font-size: 18px;
		font-weight: 600;
		line-height: 24px;
		outline: 0;
	}

	.modal__input::-moz-placeholder {
		color: rgba(255,255,255, .7)
	}

	.modal__input::-webkit-input-placeholder {
		color: rgba(255,255,255, .7)
	}

	.modal__background-list {
		margin-left: 10px;
	}

	.modal__background-item {
		margin: 0 3px 3px 0;
	}

	@media only screen and (max-width: 712px) {
		.modal {
			max-width: 320px;
			top: 200px;
			left: 52%;
			/*flex-direction: column;*/
		}
		.modal__body {
			width: 270px;
		}
	}
</style>