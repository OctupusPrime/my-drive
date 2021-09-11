import Vue from 'vue'
import Vuex from 'vuex'

import Tree from '../classes/Tree'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    drive: new Tree({name: 'root'}),
    currentBranch: {},

    selectedFiles: {},
    clipBoardFiles: {}
  },
  mutations: {
    //drive
    ADD_FOLDER(state, folder) {
      state.drive.addFolder(folder, state.currentBranch)
    },
    REMOVE_FOLDER(state, folderId) {
      state.drive.removeFolder(folderId, state.currentBranch)
    },
    ADD_FILE(state, { name, type, data }) {
      state.drive.addFile(name, type, data, state.currentBranch)
    },
    //brach
    SET_BRANCH(state, branch) {
      state.currentBranch = branch
    },
    //clip-board
    SELECT_FILE(state, file) {
      file.isSelected = true
      state.selectedFiles = file
    },
    SET_CLIP_BOARD(state, isCut = false) {
      state.selectedFiles.isCut = isCut
      state.clipBoardFiles = state.drive.copyValsFromFolder(state.selectedFiles, state.currentBranch)
      state.clipBoardFiles.isCut = isCut
      console.log(state.clipBoardFiles === state.selectedFiles)
    },
    ADD_CLIP_FOLDER(state) {
      if (state.clipBoardFiles.isCut) {
        state.drive.removeFolder(state.clipBoardFiles.id, state.clipBoardFiles.parent)
      }
      state.drive.addFolder(
        state.clipBoardFiles, 
        state.currentBranch
      )
    }
  },
  actions: {
    //drive
    storeAddFolder({commit}, folder) {
      commit('ADD_FOLDER', folder)
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
    //clipBoard
    storeSetClipBoard({commit}, isCut) {
      commit('SET_CLIP_BOARD', isCut)
    },
    storeInsertClipBoard({commit}) {
      commit('ADD_CLIP_FOLDER')
    }
  },
  getters: {
    getFolder: (state) => (id) => {
      return state.drive.traverseBF(id)
    },
    getFolderPath: (state) => {
      return state.drive.getFolderPath(state.currentBranch)
    }
  }
})
