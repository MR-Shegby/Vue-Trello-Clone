<template>
	<div
		class="background"
		:style="{background: background}"
	>
		<!--<i class="fas fa-check bg-check" v-if="checked"></i>-->
		<i class="fas fa-check bg-check" v-if="checked || active"></i>
	</div>
</template>

<script>
  export default {
    props: ['background', 'checked', 'active'],
  }
</script>

<style scoped>
	.background {
		display: inline-block;
		vertical-align: top;
		width: 30px;
		height: 30px;
		border-radius: 3px;
		cursor: pointer;
		position: relative;
		align-items: center;
	}

	.background:hover:before {
		background: rgba(0, 0, 0, .15);
		border-radius: 3px;
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		top: 0;
		content: "";
		display: block;
	}

	.bg-check {
		display: block;
		vertical-align: middle;
		line-height: 30px;
		text-align: center;
		color: #fff;
	}
</style>