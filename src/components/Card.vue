<template>
	<div
		class="card"
	>
		{{card.title}}
		<div class="edit-card-button" @click="showEditListModal = true">
			<i class="fas fa-pen"></i>
		</div>
		<app-edit-card v-if="showEditListModal" :showEditListModal.sync="showEditListModal" :card="card"/>
	</div>
</template>

<script>
	import AppEditCard from './EditCard'

  export default {
    props: ['card'],
		data() {
      return {
        showEditListModal: false
			}
		},
		methods: {
		},
		components: {
      AppEditCard
		}
  }
</script>

<style scoped>
	.card {
		padding: 8px 37px 8px 10px;
		background-color: #fff;
		border-radius: 3px;
		box-shadow: 0 1px 0 rgba(9,45,66,.25);
		cursor: pointer;
		display: block;
		max-width: 300px;
		min-height: 17px;
		position: relative;
		text-decoration: none;
		overflow-wrap: break-word;
	}

	.card:hover {
		background-color: #F5F6F7;
	}

	.edit-card-button {
		font-size: 11px;
		line-height: 11px;
		position:absolute;
		right:0;
		top: 0;
		display:none;
		color: #ebeef0;
		padding: 10px 10px;
		margin: 3px;
		border-radius: 3px;
	}

	.card:hover .edit-card-button{
		display:block;
	}

	.edit-card-button:hover {
		background-color: #ebeef0;
		color: #516b7a;
	}

</style>