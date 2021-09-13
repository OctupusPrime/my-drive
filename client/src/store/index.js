import Vue from 'vue'
import Vuex from 'vuex'

import Tree from '../classes/Tree'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    drive: new Tree('root'),
    currentBranch: {},

    selectedFiles: {
      folderIndex: [],
      fileIndex: []
    },
    clipBoardFiles: {}
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
      const getArr = (arr) => {
        let sortedArr = [...arr].sort()
        sortedArr[sortedArr.length - 1]++
        return sortedArr
      }

      if (state.selectedFiles.children) {
        state.selectedFiles.children.forEach(element => element.isSelected = false)
      }
      if (state.selectedFiles.data) {
        state.selectedFiles.data.forEach(element => element.isSelected = false)
      }

      if (state.selectedFiles[params.type].length && params.multiple) {
        state.selectedFiles[params.type][1] = params.index
      }
      else {
        state.selectedFiles[params.type] = [params.index, params.index]
      }

      if (state.selectedFiles.folderIndex.length) {
        state.selectedFiles.children = state.currentBranch.children.slice(...getArr(state.selectedFiles.folderIndex))
        state.selectedFiles.children.forEach(element => element.isSelected = true)
      }
      if (state.selectedFiles.fileIndex.length) {
        state.selectedFiles.data = state.currentBranch.data.slice(...getArr(state.selectedFiles.fileIndex))
        state.selectedFiles.data.forEach(element => element.isSelected = true)
      }
    },
    CLEAR_SELECTED_FILE(state) {
      if (state.selectedFiles.children) {
        state.selectedFiles.children.forEach(element => element.isSelected = false)
      }
      if (state.selectedFiles.data) {
        state.selectedFiles.data.forEach(element => element.isSelected = false)
      }
      state.selectedFiles = {
        folderIndex: [],
        fileIndex: []
      }
    },
    //clip-board
    SET_CLIP_BOARD(state, isCut = false) {
      if (isCut) {
        if (state.selectedFiles.children) {
          state.selectedFiles.children.forEach(element => element.isCut = isCut)
        }
        if (state.selectedFiles.data) {
          state.selectedFiles.data.forEach(element => element.isCut = isCut)
        }
      }

      state.clipBoardFiles = JSON.parse(JSON.stringify(state.selectedFiles))
    },
    CLEAR_CLIP_BOARD(state) {
      state.clipBoardFiles = {}
    },
    ADD_CLIP_FOLDER(state) {
      if (state.clipBoardFiles.children) {
        if (state.clipBoardFiles.children[0].isCut) {
          state.clipBoardFiles.children.forEach(element => {
            state.drive.removeFolder(
              element.id, 
              element.path[element.path.length - 2].id
            )
          })   
        }
        state.drive.addExistedFolder(
          state.clipBoardFiles.children, 
          state.currentBranch
        )
      }
      if (state.clipBoardFiles.data) {
        if (state.clipBoardFiles.data[0].isCut) {
          state.clipBoardFiles.data.forEach(element => {
            state.drive.removeFile(
              element.id, 
              element.parentId
            )
          })   
        }
        state.clipBoardFiles.data.forEach(element => {
          state.drive.addFile(
            element.name,
            element.type,
            element.data, 
            state.currentBranch          
          )
        })  

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
    storeClearClipBoard({commit}) {
      commit('CLEAR_SELECTED_FILE')
      commit('CLEAR_CLIP_BOARD')
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
