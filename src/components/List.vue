<template>
	<div class="list"
			 :draggable="isListDraggable"
	>
		<!--@dragover="dragOverList($event, list['.key'])"-->
		<div class="list-header list__header"
				 @mouseenter="isListDraggable = true"
				 @mouseleave="isListDraggable = false"
		>
			<div v-if="editListTitle">
				<textarea
					maxlength="512"
					class="list-header__edit"
					ref="headerInput"
					v-model="columnTitle"
					@keyup="triggerTextArea"
					@keydown.enter.prevent="updateListTitle"
					v-click-outside="updateListTitle"
					@mouseenter="isListDraggable = false"
				>
				</textarea>
			</div>
			<div
				v-else
				class="list-header__text"
				@click="showEditListTitle()"
			>
				{{list.title}}
			</div>
		</div>
		<div class="list__edit" @click="showPopUpMenu = true"><i class="fas fa-ellipsis-h"></i></div>

		<div class="list__cards">
			<app-card
				v-for="card in cards"
				:key="card._id"
				:card="card"
				class="list__card"
			/>
			<!--draggable="true"-->
			<!--@dragstart.native="dragCardStart($event, card)"-->
			<!--@dragover.native="dragCardOver($event, card)"-->
			<!--@dragend.native="dragCardEnd($event)"-->
			<!--@mouseenter="isListDraggable = false"-->
		</div>

		<div v-if="!showAddCardForm" class="list__add-card-button">
			<div
				class="show-add-card-form-button"
				@click="showAddCardForm = true"
			>
				+ <span>Add <span v-if="cards.length > 0">another</span> card</span>
			</div>
		</div>
		<div v-else>
			<app-action-form
				:callback="addCard"
				:title.sync="newCardText"
				@showActionForm = "showAddCardForm = $event"
				:placeholder="'Enter a title for this card...'"
				:action="'Add Card'"
				:closeButton="true"
				:border="'border-card'"
				:taHeight="64"
			/>
		</div>

		<app-pop-up-menu
			v-if="showPopUpMenu"
			:showPopUpMenu.sync="showPopUpMenu"
			:isListMenu="true"
		>
			<template slot="header">List Actions</template>
			<template slot="first-section">
				<div @click="showAddCardForm = true, showPopUpMenu = false">Add Card...</div>
			</template>
			<template slot="second-section">
				<div @click="deleteList">Delete this List</div>
			</template>
		</app-pop-up-menu>

	</div>
</template>

<script>
	import {mapGetters} from 'vuex'
	import {expandTextArea} from '../helper'
	import AppCard from './Card'

  export default {
	  props: ['list', 'droppingList'],
    data () {
      return {
        showPopUpMenu: false,
        showAddCardForm: false,
        editListTitle: false,
        newCardText: '',
        columnTitle: this.list.title,
        isListDraggable: false
      }
    },

    mounted() {
			// let cardPlaceholder = document.createElement('div')
      // cardPlaceholder.classList.add('card-placeholder')
      // this.$store.commit('setCardPlaceholder', cardPlaceholder)
    },

		computed: {
			...mapGetters([
			  'draggedCard',
				'draggedCardData',
				'draggedCardHeight',
				'cardPlaceholder',
				'overCard',
				'overCardParent',
				'overCardData',
				'nodePlacement',
				'overListId'
			]),

	    cards () {
	      return this.$store.getters.cardsByListIdSortedByOrder(this.list._id)
			}
		},

		watch: {
      'list.title'(val) {
        this.columnTitle = val
      }
		},

		methods: {
      showEditListTitle() {
        this.editListTitle = true

        // this.$refs.headerInput.focus()
        // this.$refs.headerInput.style.height = this.$refs.headerInput.scrollHeight + 'px'

        this.$nextTick(() => {
          // console.log(this.$refs.headerInput.tagName)
          this.$refs.headerInput.focus()
          this.$refs.headerInput.style.height = this.$refs.headerInput.scrollHeight + 'px'
        })
			},

			triggerTextArea(e) {
        expandTextArea(e.target)
      },

      updateListTitle () {
        if (this.columnTitle !== this.list.title) {
          this.$store.dispatch('updateListTitle', {
            id: this.list._id,
						newListTitle: this.columnTitle
          })
        }
        this.editListTitle = false
      },

      addCard() {
        this.$store.dispatch('addCard', {
          title: this.newCardText,
					listId: this.list._id,
          listTitle: this.list.title,
					boardId: this.list.boardId
				})
				this.newCardText = ''
				this.showAddCardForm = false
			},

      deleteList() {
        let result = confirm('Are you sure?')
        if (result) {
          this.$store.dispatch('deleteList', this.list['.key'])
        }
      },

      // dragCardStart(e, card) {
      //   // e.stopPropagation()
      //   this.isListDraggable = false
			//
      //   this.$store.commit('setDraggedCardData', card)
				// this.$store.commit('setDraggedCard', e.currentTarget)
      //   this.$store.commit('setDraggedCardHeight', this.draggedCard.offsetHeight)
			//
      //   e.dataTransfer.effectAllowed = 'move'
      //   e.dataTransfer.setData('text/html', e.currentTarget)
      // },

      // dragCardOver(e, card) {
      //   e.preventDefault()
				// // e.stopPropagation()
			//
      //   this.$store.commit('setOverCardData', card)
      //   this.$store.commit('setOverCard', e.target)
			//
      //   this.draggedCard.style.display = 'none'
      //   if (e.target.classList.contains('card-placeholder')) return
			//
      //   let relY = e.clientY - this.overCard.getBoundingClientRect().top
      //   let halfHeight = this.overCard.offsetHeight / 2
			//
      //   this.$store.commit('setOverCardParent', e.target.parentNode)
			//
      //   this.cardPlaceholder.style.height = `${this.draggedCardHeight}px`
			//
      //   if (relY > halfHeight) {
      //     this.$store.commit('setNodePlacement', 'after')
      //     this.overCardParent.insertBefore(this.cardPlaceholder, this.overCard.nextElementSibling)
			//
      //   } else {
      //     this.$store.commit('setNodePlacement', 'before')
      //     this.overCardParent.insertBefore(this.cardPlaceholder, this.overCard)
      //   }
      // },

      // dragOverList(e, listId) {
      //   if (!this.cards.length) {
      //     this.$store.commit('setOverListId', listId)
			//
      //     if (e.currentTarget.classList.contains('column')) {
      //       let overCardParent = e.currentTarget.querySelector('.cards-wrapper')
      //       this.$store.commit('setOverCardParent', overCardParent)
      //       overCardParent.appendChild(this.cardPlaceholder)
				// 	}
      //   }
      // },

      dragCardEnd(e) {
        this.draggedCard.style.display = 'block'

        this.overCardParent.removeChild(this.cardPlaceholder)

        this.$store.dispatch('changeCardOrder', {
          from: {
            id: this.draggedCardData['.key'],
						listId: this.draggedCardData.listId,
            order: this.draggedCardData.order
          },
          to: {
            id: this.overCardData['.key'],
            listId: this.overCardData.listId,
            order: this.overCardData.order
          }
        })

        this.$store.commit('setOverListId', null)
      }
		},

		components: {
      AppCard
		}
  }
</script>

<style>

	.list {
		display: inline-block;
		vertical-align: top;
		width: 270px;
		padding: 10px;
		border-radius: 3px;
		background-color: #DFE3E6;
		font-family: Roboto,Arial,Helvetica,sans-serif;
		margin: 0 10px 10px 0;
		box-sizing: content-box;
		position: relative;
	}

	.list__header {
		margin-bottom: 10px;
	}

	.list-header {
	}

	.list-header__text {
		flex-grow: 1;
		padding-left: 8px;
		font-weight: 700;
		color: #17394d;
		width: 80%;
		white-space: normal;
		word-wrap: break-word;
		overflow-wrap: break-word;
		cursor: pointer;
	}

	.list-header__edit {
		margin: -3px 0;
		width: calc(100% - 34px);
		padding: 3px 7px;
		height: 32px;
		border: 1px solid #5ba4cf;
		box-shadow: 0 0 0 1px #5ba4cf;
		box-sizing: border-box;
		background: #fff !important;
		color: #17394d !important;
		border-radius: 3px;
		font-weight: 700;
		overflow: hidden;
		overflow-wrap: break-word;
		resize: none;
	}

	.list__edit {
		padding: 7px 10px;
		color: #798d99;
		cursor: pointer;
		border-radius: 3px;
		position: absolute;
		top: 3px;
		right: 3px;
	}

	.list__edit:hover {
		background-color: rgba(9,45,66,.13);
		color: #516b7a;
	}

	.list__cards {
		margin-bottom: 10px;
	}

	.list__card {
		margin-bottom: 10px;
	}

	.list__add-card-button {
		margin-top: 20px;
	}

	.show-add-card-form-button {
		color: #6b808c;
		cursor: pointer;
	}

	.show-add-card-form-button:hover {
		background-color: rgba(9,45,66,.13);
		border-radius: 0 0 3px 3px;
		color: #17394d;
		padding: 10px;
		margin: -10px;
	}

	.show-add-card-form-button:hover span {
		text-decoration: underline;
	}

	.card-placeholder {
		display: block;
		background-color: rgba(0,0,0,.2);
		width: 270px;
		margin-bottom: 10px;
		border-radius: 3px;
	}

</style>