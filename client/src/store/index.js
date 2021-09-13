import Vue from 'vue'
import Vuex from 'vuex'
// import axios from 'axios'

import Tree from '../classes/Tree'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    drive: new Tree(),
    currentBranch: {},

    selectedFiles: {
      folderIndex: [],
      fileIndex: []
    },
    clipBoardFiles: {}
  },
  mutations: {
    //drive
    INIT_DRIVE(state, jsonDrive) {
      state.drive = new Tree(jsonDrive)
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
      if (isCut) {
        this.commit('SET_SELECTED_FIELDS', {
          field: 'isCut',
          value: true
        })
      }
      state.clipBoardFiles = JSON.parse(JSON.stringify(state.selectedFiles))
      state.clipBoardFiles.isCut = isCut
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
          this.commit('ADD_FILE', {
            name: element.name,
            type: element.type,
            data: element.data
          })
        })  
      }
    }
  },
  actions: {
    async storeGetDrive({commit}) {
      // const drive = await axios.get('http://localhost:3000/api/drive')
      commit('INIT_DRIVE', '')
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
