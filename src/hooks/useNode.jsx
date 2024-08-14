

const useNode = () => {
  const insertNode = (tree,commentId,item) => {
    if(tree.id === commentId){
        tree.replies.push({
            id: new Date().getTime(),
            name: item,
            replies : []
        })
        return tree
    }
    let latestNode = [];
    latestNode = tree.replies.map((ob) => {
        return insertNode(ob,commentId,item)
    })
    return  { ...tree, replies: latestNode };
  }

  const deleteNode = (tree,id) => {
    for(let i=0; i< tree.replies.length; i++){
        const currItem = tree.replies[i]
        if(currItem.id === id) {
            tree.replies.splice(i,1)
            return tree
        }
        else {
            deleteNode(currItem,id)
        }
    }
    return {...tree}
  }

  const editNode = (tree,commentId,value) => {
    if(tree.id === commentId) {
        tree.name = value
    }
    tree.replies.map((ob) => {
        return editNode(ob,commentId,value)
    })
    return {...tree}
  }
}

export default useNode