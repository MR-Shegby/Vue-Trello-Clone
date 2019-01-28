export default {
  state: {
    draggedCard: null,
    draggedCardData: null,
    draggedCardHeight: null,
    cardPlaceholder: null,
    overCard: null,
    overCardData: null,
    overCardParent: null,
    overListId: null,
    nodePlacement: ''
  },

  getters: {
    draggedCard(state) {
      return state.draggedCard
    },

    draggedCardData(state) {
      return state.draggedCardData
    },

    draggedCardHeight(state) {
      return state.draggedCardHeight
    },

    cardPlaceholder(state) {
      return state.cardPlaceholder
    },

    overCard(state) {
      return state.overCard
    },

    overCardData(state) {
      return state.overCardData
    },

    nodePlacement(state) {
      return state.nodePlacement
    },

    overListId(state) {
      return state.overListId
    },

    overCardParent(state) {
      return state.overCardParent
    }

  },

  mutations: {
    setDraggedCard(state, payload) {
      state.draggedCard = payload
    },

    setDraggedCardData(state, payload) {
      state.draggedCardData = payload
    },

    setDraggedCardHeight(state, payload) {
      state.draggedCardHeight = payload
    },

    setCardPlaceholder(state, payload) {
      state.cardPlaceholder = payload
    },

    setOverCard(state, payload) {
      state.overCard = payload
    },

    setOverCardParent(state, payload) {
      state.overCardParent = payload
    },

    setOverCardData(state, payload) {
      state.overCardData = payload
    },

    setNodePlacement(state, payload) {
      state.nodePlacement = payload
    },

    setOverListId(state, payload) {
      state.overListId = payload
    }

  }
}