<template>
	<div>
	<!--<div v-if="boardsLoaded">-->
		<div class="board" :style="{background: board.background}">
			<app-tool-bar />
			<div>
				<div class="board-header board__header">
					<!--<div class="board-header__text" @click="test">{{board.title}} </div>-->
					<div class="board-header__text" @click="showPopUpMenu = true">{{board.title}} </div>
					<div class="show-menu-button board-header__show-menu" @click="showBoardMenu()">
						<i class="fas fa-ellipsis-h show-menu-button__icon"></i> <span class="show-menu-button__text">Show Menu</span>
					</div>
				</div>
			</div>

			<div class="board__menu" ref="boardMenu">
				<app-board-menu
					:board="board"
					:close="closeBoardMenu"
				/>
			</div>

			<div
				v-if="boardsLoaded && listsLoaded"
				class="lists"
				ref="lists"
			>
				<app-list
					v-for="list in lists"
					:key="list.id"
					:list="list"
					@dragstart.native="dragListStart($event, list)"
					@dragover.native="dragListOver($event, list)"
					@dragend.native.self="dragListEnd($event)"
				/>

				<div
					class="add-another-list-button"
					v-if="!showActionForm"
					@click.prevent="showActionForm = true"
				>
					+ <span>Add <span v-if="lists.length > 0">another</span> list</span>
				</div>
				<div v-else class="list">
					<app-action-form
						:callback="addList"
						:title.sync="newListTitle"
						@showActionForm = "showActionForm = $event"
						:rows="1"
						:placeholder="'Enter list title...'"
						:action="'Add List'"
						:closeButton="true"
						:border="'border-normal'"
					/>
				</div>
			</div>

			<div v-else class="board__spinner">
				<app-loader-spinner :size="'15px'" />
			</div>

			<app-pop-up-menu
				v-if="showPopUpMenu"
				:showPopUpMenu.sync="showPopUpMenu"
				:renameBoard="true"
			>
				<template slot="header">Rename Board</template>
				<template slot="form">
					<div class="board__rename-form">
						<app-action-form
							:callback="updateBoardTitle"
							:title.sync="boardTitle"
							:action="'Rename'"
							:actionButtonSize="'wide'"
							:closeButton="false"
							:border="'border-normal'"
							:length="100"
						/>
					</div>
				</template>
			</app-pop-up-menu>

			<div class="board__footer"></div>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
  import AppToolBar from '../components/ToolBar'
	import AppList from '../components/List'
	import AppBoardMenu from '../components/BoardMenu'

  export default {
	  props: ['id'],
	  data() {
	    return {
	      // lists: [],
				flag: false,
        showPopUpMenu: false,
        // showAddListForm: false,
        showActionForm: false,
        newListTitle: '',
        boardTitle: '',

        // isListDraggable: true,
        draggedList: null,
        overList: null,
        listPlaceholder: null,
        draggedListData: null,
        overListData: null,
        draggedHeight: null,
        nodePlacement: null
			}
		},

    // beforeRouteEnter (to, from, next) {
    //   console.log(to.params.id)
    //   next(vm => {
    //     // vm.$store.dispatch('initBoards')
    //     // console.log(vm.$store.getters.boardById(to.params.id))
    //   })
    // },

    // beforeRouteEnter(to, from, next) {
    //   try {
    //     vm.$store.dispatch('initBoards')
    //     next(vm => {
    //       console.log('jbgjb')
    //       // vm.post = post
    //       // this.manipulateData()
    //     })
    //   } catch (err) {
    //     next(false)
    //   }
    // },

		created() {
      // this.$store.dispatch('initLists', this.id)
			// this.$store.dispatch('initCards', this.id)

      this.getBoardTitle()

    },

    mounted() {
      this.listPlaceholder = document.createElement('div')
      this.listPlaceholder.classList.add('listPlaceholder')
    },

    watch: {
      'board.title'(val) {
        this.boardTitle = val
      },

      // '$route.path' (to, from) {
      //   console.log($route.path)
      //   // this.test()
      // }

    },

		computed: {
			...mapGetters([
			  'user',
				'boards',
        'boardsLoaded',
				'listsLoaded'
			]),

			board() {
				return this.$store.getters.boardById(this.id) ? this.$store.getters.boardById(this.id) : {}
			},

			lists() {
        // return this.$store.getters.lists
				// return this.$store.getters.listsSortedByOrder
			  return this.$store.getters.listsByBoardIdSortedByOrder(this.id)
			}
		},

		methods: {

			// test() {
      //   console.log('triggered')
      //   this.$store.dispatch('initLists', this.id)
				// 	.then(() => {
      //       this.$store.commit('updateLoadListsStatus', true)
      //   	})
      // },

			getBoardTitle() {
	      let board = this.$store.getters.boardById(this.id)
				if (board) {
          this.boardTitle = board.title
				}
			},

      addList() {
        this.$store.dispatch('addList', {
          title: this.newListTitle,
					boardId: this.id
				})
        this.newListTitle = ''
        this.showActionForm = false
			},

      updateBoardTitle () {
        if (this.boardTitle !== this.board.title) {
          this.$store.dispatch('updateBoardTitle', {
            board: this.board,
            boardNewTitle: this.boardTitle
          })
        }
        this.showPopUpMenu = false
      },

			showBoardMenu() {
        this.$refs.boardMenu.style.right = '0px'
        this.$refs.lists.style.width = 'calc(100% - 339px)'
      },

			closeBoardMenu() {
        this.$refs.boardMenu.style.right = '-339px'
        this.$refs.lists.style.width = '100%'
			},

			dragListStart(e, list) {

        if (e.target.classList.contains('card')) return

        this.draggedListData = list
        this.draggedHeight = e.currentTarget.offsetHeight - 15
        this.listPlaceholder.style.height = `${this.draggedHeight}px`
        this.draggedList = e.currentTarget

        // console.log('target',e.target)
        // console.log('currentTarget',e.currentTarget)

        e.dataTransfer.effectAllowed = 'move'
        e.dataTransfer.setData('text/html', e.currentTarget)
			},

			dragListOver(e, list) {
        e.preventDefault()

        this.overListData = list
        this.draggedList.style.display = 'none'

        if (e.target.classList.contains('listPlaceholder')) return

        this.overList = e.currentTarget

        let parent = e.currentTarget.parentNode

        if (parent.classList.contains('lists')) {

          let relX = e.clientX - this.overList.getBoundingClientRect().left
          let halfWidth = this.overList.offsetWidth / 2

          // console.log(relX)

          if (relX > halfWidth) {
						this.nodePlacement = 'after'
						parent.insertBefore(this.listPlaceholder, this.overList.nextElementSibling)
					} else {
						this.nodePlacement = 'before'
						parent.insertBefore(this.listPlaceholder, this.overList)
					}
      	}
			},

			dragListEnd(e) {
        this.draggedList.style.display = 'inline-block'

        this.$store.dispatch('changeListOrder', {
          from: {
            id: this.draggedListData['.key'],
            boardId: this.draggedListData.boardId,
            order: this.draggedListData.order
          },
          to: {
            id: this.overListData['.key'],
            boardId: this.overListData.boardId,
            order: this.overListData.order
          }
        })

        this.draggedList.parentNode.removeChild(this.listPlaceholder)
			}
		},
	  components: {
      AppToolBar,
	    AppList,
      AppBoardMenu
		}
  }
</script>

<style lang="scss">

	.board {
		background-color: #fff;
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		position: relative;
		/*min-height: calc(100vh - 40px)*/
		overflow: hidden;
	}

	.board__header {
		margin: 7px 20px;
		/*padding: 7px 0;*/
		/*box-sizing: border-box;*/
	}

	.board-header {
		/*height: 35px;*/
		display: flex;
		align-items: center;
		justify-content: space-between;
		word-wrap: break-word;
		overflow-wrap: break-word;
	}

	.board-header__text {
		font-size: 18px;
		font-weight: 700;
		color: #fff;
		cursor: pointer;
	 }

	.board-header__text:hover {
		background: rgba(0,0,0, .15);
		border-radius: 3px;
		padding: 7px 10px;
		margin-left: -10px;
	}

	.board-header__show-menu {
		margin-right: -10px;
	}

	.show-menu-button {
		color: #fff;
		cursor: pointer;
		padding: 7px 10px;
		white-space: nowrap;
	}

	.show-menu-button:hover {
		background: rgba(0,0,0, .15);
		border-radius: 3px;
	}

	.show-menu-button__icon {
		margin-right: 10px;
		font-size: 11px;
	}

	.show-menu-button__text {
		font-weight: 500;
		text-decoration: underline;
		white-space: nowrap;
	}

	.board__menu {
		position: absolute;
		top: 40px;
		z-index: 5;
		right: -339px;
		transition: right .3s ease-out;
	}

	.lists {
		padding: 0 10px;
		/*padding-top: 7px;*/
		overflow-x: auto;
		white-space: nowrap;
		flex-grow: 1;
		position: relative;
		box-sizing: border-box;
		transition: width .3s ease-out;
		width: 100%;
	}

	.lists::-webkit-scrollbar {
		height: 12px;
		width: 12px;
	}

	.lists::-webkit-scrollbar-thumb {
		border-radius: 3px;
		background: rgba(255,255,255,.5);
	}

	.lists::-webkit-scrollbar-track-piece {
		border-radius: 3px;
		background: rgba(0,0,0,.1);
	}

	.lists::-webkit-scrollbar-button {
		display: block;
		height: 5px;
		width: 5px;
	}

	.add-another-list-button {
		display: inline-block;
		color: rgba(255,255,255,.8);
		font-weight: 500;
		background: rgba(0,0,0,.1);
		border-radius: 3px;
		width: 270px;
		padding: 10px;
		margin-right: 10px;
	}

	.add-another-list-button:hover {
		background: rgba(0,0,0,.2);
		cursor: pointer;
	}

	/*.list {*/
		/*display: inline-block;*/
		/*vertical-align: top;*/
		/*width: 270px;*/
		/*padding: 5px 10px 10px 10px;*/
		/*border-radius: 3px;*/
		/*background-color: #DFE3E6;*/
		/*font-family: Roboto,Arial,Helvetica,sans-serif;*/
		/*margin: 0 10px 10px 0;*/
		/*box-sizing: content-box;*/
		/*position: relative;*/
	/*}*/

	.listPlaceholder {
		background: rgba(0,0,0,.1);
		width: 270px;
		display: inline-block;
		vertical-align: top;
		margin: 0 10px 10px 0;
		padding: 5px 10px 10px 10px;
		border-radius: 3px;
		box-sizing: content-box;
	}

	.board__rename-form {
		padding: 12px;
	}

	.board__spinner {
		margin-top: 50px;
	}

	.board__footer {
		height: 7px;
	}
</style>