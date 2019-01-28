<template>
	<div>
		<div class="modal-card" :class="{active: showEditListModal}">

			<div class="modal-card__form">
				<app-action-form
					:callback="updateCard"
					:title.sync="title"
					:taHeight="64"
					:action="'Save'"
					:actionButtonSize="'wide'"
				/>
			</div>
			<div class="modal-card__action">
				<div @click="deleteCard">
					<i class="far fa-trash-alt"></i>
					<span>Delete Card</span>
				</div>
			</div>
		</div>

		<div class="overlay" :class="{active: showEditListModal}" @click="close"></div>
	</div>
</template>

<script>
  import AppBackgroundThumbnail from './global/BackgroundThumbnail'

  export default {
    props: ['showEditListModal', 'card'],
    data() {
      return {
				title: this.card.title
      }
    },

    watch: {
      'card.title'(val) {
        this.title = val
			}
    },

    methods: {
      updateCard() {
        this.$store.dispatch('updateCard', {title: this.title, id: this.card['.key']})
				this.close()
			},

			deleteCard() {
        let result = confirm('Are you sure?')
        if (result) {
          this.$store.dispatch('deleteCard', this.card['.key'])
        }
			},

      close() {
        this.$emit('update:showEditListModal', false)
        this.title = this.card.title
      }
    },
    components: {
      AppBackgroundThumbnail
    }
  }
</script>

<style scoped>
	.modal-card {
		opacity: 0;
		visibility: hidden;
		position: absolute;
		left: 0;
		top: 0;
		z-index: 9999;
		border-radius: 3px;
		background-color: transparent;
		transition: 0.3s all;
		display: flex;
	}

	.overlay {
		opacity: 0;
		visibility: hidden;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, .6);
		z-index: 1;
		transition: .3s all;
	}

	.modal-card.active,
	.overlay.active {
		opacity: 1;
		visibility: visible;
	}

	.modal-card__form {
		width: 270px;
	}

	.modal-card__action {
		background: rgba(0,0,0,.6);
		border-radius: 3px;
		font-weight: 500;
		color: #e6e6e6;
		height: 20px;
		transition: transform 85ms ease-in;
		margin: 0 0 4px 7px;
		padding: 6px 18px 6px 14px
	}

	.modal-card__action:hover {
		background: rgba(0,0,0,.8);
		cursor: pointer;
	}

	.modal-card__action span {
		vertical-align: middle;
	}

	.modal-card__action .far {
		font-size: 11px;
		margin-right: 7px;
		line-height: 20px;
	}
</style>