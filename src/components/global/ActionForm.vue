<template>
	<div>
		<div class="action-form__textarea-container">
			<textarea
				:placeholder="placeholder"
				:maxlength="length ? length: 512"
				class="action-form__textarea"
				:class="border"
				:style="{height: taHeight + 'px'}"
				v-model="value"
				ref="textarea"
				@keyup="triggerTextArea"
			>
		</textarea>
		</div>
		<div class="action-form__actions">
			<app-action-button
				:value="action"
				@click.native="callback"
				:size="actionButtonSize"
			/>
			<app-close-button
				v-if="closeButton"
				:size="13"
				class="action-form__close-button"
				@click.native="$emit('showActionForm', false)"
			/>
		</div>
	</div>
</template>

<script>

  import {expandTextArea} from '../../helper'

  export default {
		props: [
		  'length',
			'placeholder',
			'callback',
			'action',
			'title',
			'taHeight',
			'actionButtonSize',
			'closeButton',
			'border'
		],
		computed: {
      value: {
        get() { return this.title },
        set(newValue) { this.$emit('update:title', newValue) }
			}
		},
    mounted(){
      this.$nextTick(() => {
        this.$refs.textarea.focus()
        this.$refs.textarea.style.height = this.$refs.textarea.scrollHeight + 'px'
      })
    },
		methods: {
      triggerTextArea(e) {
        expandTextArea(e.target)
			}
		}
  }
</script>

<style scoped>
	.action-form__textarea-container {
		padding: 0 0px;
		/*margin-top: 5px;*/
	}

	.action-form__textarea {
		width: 100%;
		/*min-height: 20px;*/
		max-height: 256px;
		padding: 7px;
		height: 32px;
		/*height: 32px;*/
		overflow: hidden;
		overflow-wrap: break-word;
		resize: none;
		background: #fff;
		color: #17394d;
		border-radius: 3px;
		outline: none;
		box-sizing: border-box;
	}

	.border-normal {
		border: 1px solid #5ba4cf;
		box-shadow: 0 0 0 1px #5ba4cf;
	}

	.border-card {
		box-shadow: 0 1px 0 rgba(9,45,66,.25);
	}

	.action-form__textarea.border-normal {
		margin-left: 2px;
		width: calc(100% - 4px);
	}

	.action-form__actions {
		display: flex;
		align-items: center;
	}

	.action-form__close-button {
		margin: 8px 0 0 10px;
	}
</style>