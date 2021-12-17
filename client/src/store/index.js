import Vue from 'vue'
import Vuex from 'vuex'

import {data} from './data.js'
import Tree from '../classes/Tree'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    drive: new Tree(),
    isLoaded: false,
    currentBranch: {},

    selectedFiles: {
      folderIndex: [],
      fileIndex: []
    },
    clipBoardFiles: {},

    isShowTips: localStorage.getItem('isShowTips') || 'true'
  },
  mutations: {
    //drive
    INIT_DRIVE(state, jsonDrive) {
      state.isLoaded = true
      state.drive = new Tree(JSON.parse(jsonDrive)._root)
    },
    //folders
    ADD_FOLDER(state, name) {
      state.drive.addFolder(name, state.currentBranch)
    },
    REMOVE_FOLDER(state, { id, parentId }) {
      state.drive.removeFolder(id, parentId)
    },
    //file
    ADD_FILE(state, { name, type, data }) {
      state.drive.addFile(name, type, data, state.currentBranch)
    },
    REMOVE_FILE(state, { id, parentId }) {
      state.drive.removeFile(id, parentId)
    },
    //brach
    SET_BRANCH(state, branch) {
      state.currentBranch = branch
    },
    //selected
    SELECT_FILE(state, {type, index, multiple}) {
      const getSliceParams = (arr) => {
        let sortedArr = [...arr].sort()
        sortedArr[sortedArr.length - 1]++
        return sortedArr
      }
      const getSelectedVals = (field, sliceParams) => {
        return state.currentBranch[field].slice(...getSliceParams(sliceParams))
      }

      this.commit('SET_SELECTED_FIELDS', {
        field: 'isSelected',
        value: false
      })

      if (state.selectedFiles[type].length && multiple) {
        state.selectedFiles[type][1] = index
      }
      else {
        state.selectedFiles[type] = [index, index]
      }

      if (state.selectedFiles.folderIndex.length) {
        state.selectedFiles.children = getSelectedVals('children', state.selectedFiles.folderIndex)
      }
      if (state.selectedFiles.fileIndex.length) {
        state.selectedFiles.data = getSelectedVals('data', state.selectedFiles.fileIndex)
      }

      this.commit('SET_SELECTED_FIELDS', {
        field: 'isSelected',
        value: true
      })
    },
    DELETE_SELECTED_FILE(state, stateName) {
      if (state[stateName].children) {
        state[stateName].children.forEach(element => {
          this.commit('REMOVE_FOLDER', {
            id: element.id, 
            parentId:  element.path[element.path.length - 2].id
          })
        })      
      }
      if (state[stateName].data) {
        state[stateName].data.forEach(element => {
          this.commit('REMOVE_FILE', {
            id: element.id,
            parentId: element.parentId
          })
        })   
      }
    },
    SET_SELECTED_FIELDS(state, {field, value}) {
      if (state.selectedFiles.children) {
        state.selectedFiles.children.forEach(element => element[field] = value)
      }
      if (state.selectedFiles.data) {
        state.selectedFiles.data.forEach(element => element[field] = value)
      }      
    },
    CLEAR_SELECTED_FILE(state) {
      this.commit('SET_SELECTED_FIELDS', {
        field: 'isSelected',
        value: false
      })

      state.selectedFiles = {
        folderIndex: [],
        fileIndex: []
      }
    },
    //clip-board
    SET_CLIP_BOARD(state, isCut = false) {
      this.commit('SET_SELECTED_FIELDS', {
          field: 'isCut',
          value: isCut
      })
      if (state.selectedFiles.children || state.selectedFiles.data) {
        state.clipBoardFiles = JSON.parse(JSON.stringify(state.selectedFiles))
        state.clipBoardFiles.isCut = isCut
      }
    },
    CLEAR_CLIP_BOARD(state) {
      state.clipBoardFiles = {}
    },
    ADD_CLIP_FOLDER(state) {
      if (state.clipBoardFiles.isCut) {
        this.commit('DELETE_SELECTED_FILE', 'clipBoardFiles')
      }
      if (state.clipBoardFiles.children) {
        state.drive.addExistedFolder(
          state.clipBoardFiles.children, 
          state.currentBranch
        )
      }
      if (state.clipBoardFiles.data) {
        state.clipBoardFiles.data.forEach(element => {
          this.commit('ADD_FILE', element)
        })  
      }
    },

    DONT_SHOW_TIPS() {
      localStorage.setItem('isShowTips', JSON.stringify(false));
    },
    CHANGE_SHOW_TIPS(state, value) {
      state.isShowTips = value
    }
  },
  actions: {
    async storeGetDrive({commit}) {
      commit('INIT_DRIVE', data)
    },
    //drive
    storeAddFolder({commit}, name) {
      commit('ADD_FOLDER', name)
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
    storeDeleteSelectFile({commit}) {
      commit('DELETE_SELECTED_FILE', 'selectedFiles')
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
    },

    storeDontShowTips({commit}) {
      commit('DONT_SHOW_TIPS')
      commit('HIDE_TIPS', 'false')
    },
    storeHideTips({commit}) {
      commit('CHANGE_SHOW_TIPS', 'false')
    },
    storeShowTips({commit}) {
      commit('CHANGE_SHOW_TIPS', 'true')
    }
  },
  getters: {
    getFolder: (state) => (id) => {
      return state.drive.traverseBF(id)
    },
    getShowTips(state) {
      return JSON.parse(state.isShowTips)
    }
  }
})
