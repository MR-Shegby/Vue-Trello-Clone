<template>
  <div v-if="boardsLoaded">
    <h3>Boards</h3>
    <div class="board-list">
      <router-link
        v-for="board in boards"
        tag="div"
        class="board-link board-list__item"
        :style="{background: board.background}"
        :key="board._id"
        :to="{ name: 'board', params: { id: board._id, name: board.title.toLowerCase().replace(' ', '-')}}"
      >
        {{board.title}}
      </router-link>

      <div class="board-link-create board-list__item" @click="showCreateBoardModal = true">
        Create New Board...
      </div>

      <app-create-board v-if="showCreateBoardModal" :showCreateBoardModal.sync="showCreateBoardModal" />

    </div>
  </div>
  <div class="spinner" v-else>
    <app-loader-spinner :color="'black'" :size="'15px'" />
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import AppCreateBoard from '../components/CreateBoard'

  export default {
    data() {
      return {
        showCreateBoardModal: false
      }
    },

    computed: {
      ...mapGetters(['boards', 'boardsLoaded'])
    },

    components: {
      AppCreateBoard
    }
  }
</script>
<style scoped lang="scss">

  $color: #00AECC;

  .board-list {
    display: flex;
    flex-wrap: wrap;
    /*justify-content: space-around;*/
  }

  .board-list__item {
    flex-basis: 30%;
    margin-right: 2%;
    margin-bottom: 10px;
  }

  .board-link {
		max-width: 200px;
		min-width: 150px;
		height: 96px;
		border-radius: 3px;
  	color: #fff;
    padding: 8px;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
		position: relative;
    word-wrap: break-word;
    overflow-wrap: break-word;

		/*display: -webkit-box;*/
		/*-webkit-line-clamp: 5;*/
		/*-webkit-box-orient: vertical;*/
		/*text-overflow: ellipsis;*/
		/*overflow: hidden;*/
  }

  .board-link:hover:before {
    background: rgba(0, 0, 0, .15);
    border-radius: 3px;
    position: absolute;
    bottom: 0;
    content: "";
    left: 0;
    right: 0;
    top: 0;
  }

  .board-link-create {
		max-width: 200px;
		min-width: 150px;
		height: 96px;
		padding: 8px;
		display: flex;
    background-color: rgba(9,45,66,.08);
		border-radius: 3px;
    color: #6b808c;
    justify-content: center;
    align-items: center;
		cursor: pointer;
  }

  .board-link-create:hover {
    background-color: rgba(9,45,66,.13);
    color: #17394d;
  }

  .spinner {
    opacity: .3;
    text-align: center;
    margin: auto;
  }

  @media only screen and (max-width:768px) and (min-width: 576px) {
    .board-list {
      justify-content: space-around;
    }

    .board-list__item {
      flex-basis: 30%;
    }
  }

  @media only screen and (max-width: 576px) {
    .board-list {
      justify-content: space-around;
    }
    .board-list__item {
      flex-basis: 48%;
    }
  }

</style>