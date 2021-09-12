import Vue from 'vue'
import Vuex from 'vuex'

import Tree from '../classes/Tree'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    drive: new Tree('root'),
    currentBranch: {},

    selectedFiles: {},
    clipBoardFiles: []
  },
  mutations: {
    //drive
    ADD_FOLDER(state, name) {
      state.drive.addFolder(name, state.currentBranch)
    },
    REMOVE_FOLDER(state, folderId) {
      state.drive.removeFolder(folderId, state.currentBranch.id)
    },
    ADD_FILE(state, { name, type, data }) {
      state.drive.addFile(name, type, data, state.currentBranch)
    },
    //brach
    SET_BRANCH(state, branch) {
      state.currentBranch = branch
    },
    //selected
    SELECT_FILE(state, params) {
      if (state.selectedFiles.data) {
        state.selectedFiles.data.forEach(element => element.isSelected = false)
      }

      let sliceIndex = []
      if (!isNaN(state.selectedFiles.beginIndex) && params.multiple) {
        sliceIndex = [state.selectedFiles.beginIndex, params.index]
      }
      else {
        state.selectedFiles.beginIndex = params.index
        sliceIndex = [params.index, params.index]
      }

      sliceIndex.sort()
      sliceIndex[sliceIndex.length - 1]++

      state.selectedFiles.data = state.currentBranch.children.slice(...sliceIndex)
      state.selectedFiles.data.forEach(element => element.isSelected = true)
    },
    CLEAR_SELECTED_FILE(state) {
      if (state.selectedFiles.data) {
        state.selectedFiles.data.forEach(element => element.isSelected = false)
      }
      state.selectedFiles = {}
    },
    //clip-board
    SET_CLIP_BOARD(state, isCut = false) {
      state.selectedFiles.data.forEach(element => element.isCut = isCut)
      state.clipBoardFiles = JSON.parse(JSON.stringify(state.selectedFiles.data))
    },
    ADD_CLIP_FOLDER(state) {
      if (state.clipBoardFiles.length) {
        if (state.clipBoardFiles[0].isCut) {
          state.clipBoardFiles.forEach(element => {
            state.drive.removeFolder(
              element.id, 
              element.path[element.path.length - 2].id
            )
          })   
        }
        state.drive.addExistedFolder(
          state.clipBoardFiles, 
          state.currentBranch
        )
      }
    }
  },
  actions: {
    //drive
    storeAddFolder({commit}, name) {
      commit('ADD_FOLDER', name)
    },
    storeRemoveFolder({ commit }, folderId) {
      commit('REMOVE_FOLDER', folderId)
    },
    storeAddFile({ commit }, params) {
      commit('ADD_FILE', params)
    },
    //brach
    storeSetCurrentBranch({commit}, branch) {
      commit('SET_BRANCH', branch)
    },
    //selected
    storeSelectFile({commit}, file) {
      commit('SELECT_FILE', file)
    },
    storeClearSelectFile({commit}) {
      commit('CLEAR_SELECTED_FILE')
    },
    //clipBoard
    storeSetClipBoard({commit}, isCut) {
      commit('SET_CLIP_BOARD', isCut)
    },
    storeInsertClipBoard({commit}) {
      commit('CLEAR_SELECTED_FILE')
      commit('ADD_CLIP_FOLDER')
    }
  },
  getters: {
    getFolder: (state) => (id) => {
      return state.drive.traverseBF(id)
    }
  }
})
