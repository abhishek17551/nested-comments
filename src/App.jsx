import { useState } from 'react'
import './styles.css'
import Comment from './components/Comment'
import useNode from './hooks/useNode'

function App() {
  const comments = {
    id:1,
    replies:[]
  }
  const [commentsData,setCommentsData] = useState(comments)

  const {insertNode, editNode, deleteNode} = useNode();

  const handleInsertNode = (folderId,item) => {
    const finalStructure = insertNode(commentsData,folderId,item)
    setCommentsData(finalStructure)
  }

  const handleEditNode = () => {
    const finalStructure = editNode(commentsData,folderId,value)
    setCommentsData(finalStructure)
  }

  const handleDeleteNode = () => {
    const finalStructure = deleteNode(commentsData,folderId)
    const temp = {...finalStructure}
    setCommentsData(temp)
  }
  return (
    <div className='App'>
      <Comment 
        comment={commentsData}
        handleInsertNode = {handleInsertNode}
        handleEditNode = {handleEditNode}
        handleDeleteNode = {handleDeleteNode}
      />
    </div>
  )
}

export default App
