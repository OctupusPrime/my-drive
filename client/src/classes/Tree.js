import { v4 as uuidv4 } from 'uuid';

class Branch {
    constructor(name, parent = undefined) {
        this.id = uuidv4()
        this.name = name
        this.children = []
        this.data = []
        if (parent) {
            this.path = [...parent.path, {name: this.name, id: this.id}]
        }
        else {
            this.path = [{name: this.name, id: this.id}]
        }
        this.isSelected = false
        this.isCut = false
    }
}

class File {
    constructor(name, type, data, parentId) {   
        this.id = uuidv4()
        this.name = name
        this.type = type
        this.data = data
        this.parentId = parentId
        this.isSelected = false
        this.isCut = false
    }
}

export default class Tree {
    constructor(drive) {
        if (drive)
            this._root = drive
        else 
            this._root = new Branch('root')
    }
    //Find
    traverseBF(value) {
        let queue = [this._root]
        while (queue.length) {
            let node = queue.shift()
            if (node.id === value) {
                return node
            }
            else if (node.children) {
                queue.push(...node.children)

            }

        }
        return false
    }
    
    //Folders
    addFolder(name, branch) {
        const folder = new Branch(name, branch)
        branch.children.push(folder)
        return folder
    }
    removeFolder(id, branchId) {
        const parent = this.traverseBF(branchId)
        for (let i = 0; i < parent.children.length; i++) {
            if (parent.children[i].id === id) {
                parent.children.splice(i, 1)
            }
        }
    }
    addExistedFolder(folder, branch) {
        let queue = [...folder],
            parentQueue = []
        for (let i = 0; i < queue.length; i++) {
            parentQueue.push(branch)
        }

        while (queue.length) {
            let node = queue.shift(),
                parentNode = parentQueue.shift()

            const newFolder = this.addFolder(node.name, parentNode)
            if (node.data) {
                for (let item of node.data) {
                    this.addFile(item.name, item.type, item.data, newFolder)
                }
            }
            if (node.children) {
                queue.push(...node.children)
                for (let i = 0; i < node.children.length; i++) {
                    parentQueue.push(newFolder)
                }
            }
        }
    }

    //Files
    addFile(name, type, data, branch) {
        branch.data.push(new File(name, type, data, branch.id))
    }
    removeFile(id, branchId) {
        const parent = this.traverseBF(branchId)
        for (let i = 0; i < parent.data.length; i++) {
            if (parent.data[i].id === id) {
                return parent.data.splice(i, 1)
            }
        }       
    }
}