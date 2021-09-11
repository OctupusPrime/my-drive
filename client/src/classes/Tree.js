import { v4 as uuidv4 } from 'uuid';

class Branch {
    constructor(folder, parent) {
        this.id = uuidv4()
        this.name = folder.name
        this.children = JSON.parse(JSON.stringify(folder.children || []))
        this.data = JSON.parse(JSON.stringify(folder.data || []))
        this.parent = parent
        this.isSelected = false
        this.isCut = false
    }
}

class File {
    constructor(name, type,data) {   
        this.id = uuidv4(),
        this.name = name,
        this.type = type,
        this.data = data
    }
}

export default class Tree {
    constructor(data) {
        if (data._root) {
            this._root = data._root
        }
        else {
            this._root = new Branch({name: 'root'}) 
        }
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
    addFolder(folder, branch) {
        branch.children.push(new Branch(folder, branch))
    }
    removeFolder(id, branch) {
        for (let i = 0; i < branch.children.length; i++) {
            if (branch.children[i].id === id) {
                branch.children.splice(i, 1)
            }
        }
    }
    copyValsFromFolder(folder, branch) {
        let copy = new Branch(folder, branch)
        copy.id = folder.id
        return copy
    }

    //Files
    addFile(name, type, data, branch) {
        branch.data.push(new File(name, type, data))
    }
    removeFile(id, branch) {
        for (let i = 0; i < branch.data.length; i++) {
            if (branch.data[i].id === id) {
                return branch.data.splice(i, 1)
            }
        }       
        return console.log(new Error('File does not exist'))      
    }

    //Find path
    getFolderPath(branch) {
        let path = [],
            currentBranckh= branch
        while(currentBranckh.parent)
        {
            path.push({
                name: currentBranckh.name,
                id: currentBranckh.id
            })
            currentBranckh = currentBranckh.parent

        }
        return path.reverse()
    }
}