<template>
	<input
		:type="submit ? 'submit': 'button'"
		:value="value"
		class="button"
		:class="[size, greybg]"
		:disabled="disabled"
	/>
</template>

<!--:class="{wide, xlarge, greybg}"-->

<script>

  export default {
		props: ['submit', 'value', 'size', 'greybg', 'disabled']
  }

</script>

<style scoped>
	input[type=submit].button, input[type=button].button {
		display: inline-block;
		border-radius: 3px;
		outline: none;
		font-weight: 700;
		line-height: 20px;
		margin: 8px 4px 0 0;
		padding: 6px 12px;
		text-align: center;
		border: 0;
	}

	input[type=submit].button:not(:disabled), input[type=button].button:not(:disabled) {
		cursor: pointer;
	}

	input[type=submit].button, input[type=button].button {
		color: #fff;
		background-color: #5aac44;
		box-shadow: 0 1px 0 0 #3f6f21;
	}

	input[type=submit].button:hover, input[type=button].button:hover {
		background-color: #519839;
	}

	input[type=button].button.greybg {
		color: #17394d;
		background-color: #dfe3e6;
		box-shadow: 0 1px 0 0 #c2ccd1;
	}

	input[type=button].button.greybg:hover {
		background-color: #c2ccd1;
		box-shadow: 0 1px 0 0 #b3bec4;
	}

	input[type=submit].button.wide, input[type=button].button.wide {
		padding-left: 24px;
		padding-right: 24px;
	}

	input[type=submit].button.xlarge, input[type=button].button.xlarge {
		width: 100%;
		font-size: 20px;
		padding-top: 11px;
		padding-bottom: 11px;
	}

	input[type=submit].button:disabled,
	input[type=submit].button:disabled:hover {
		color: #97a7b0;
		background-color: rgba(255, 255, 255, .9);
	}
</style>