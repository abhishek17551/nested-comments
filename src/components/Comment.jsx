import React, { useEffect, useRef, useState } from 'react'
import Action from './Action'
// import { ReactComponent as DownArrow } from "../assets/down-arrow.svg";
// import { ReactComponent as UpArrow } from "../assets/up-arrow.svg";

const Comment = ({comment,handleInsertNode,handleEditNode,handleDeleteNode}) => {
    const [input,setInput] = useState('')
    const [editMode,setEditMode] = useState(false)
    const [showInput,setShowInput] = useState(false)
    const [expand,setExpand] = useState(false)
    const inputRef = useRef(null)

    const onAddComment = () => {
        if(editMode) {
            handleEditNode(comment.id, inputRef?.current?.value)
        }
        else {
            setExpand(true)
            handleInsertNode(comment.id,input)
            setShowInput(true)
            setInput('')
        }
    }

    const handleNewComment = () => {
        if(editMode) {
            han
        }
        setShowInput(true)
        setExpand(!expand)
    }

    const handleDelete = () => {
        handleDeleteNode(comment.id)
    }

    useEffect(() => {
        inputRef?.current?.focus()
    }, [editMode])
  return (
    <div>
        <div className={comment.id===1 ? 'inputContainer' : "commentContainer"}>
            {
                comment.id===1 ? (
                    <>
                        <input
                            type="text"
                            className="inputContainer__input first_input"
                            autoFocus
                            placeholder="type..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <Action
                            className='reply comment'
                            type='Comment'
                            handleClick={onAddComment}

                        />
                    </>
                ) : (
                    <>
                        <span contentEditable={editMode} suppressContentEditableWarning={editMode} ref={inputRef} style={{wordWrap:'break-word'}}>{comment.name}</span>
                        <div style={{ display: "flex", marginTop: "5px" }}>
                            {
                                editMode ? (
                                    <>
                                        <Action className='reply' type='Save' handleClick={onAddComment}/>
                                        <Action className='reply' type='Cancel' 
                                        handleClick={() => {
                                            if(inputRef.current)
                                                inputRef.current.innerText = comment.name
                                            setEditMode(false)
                                        }}
                                        />
                                    </>
                                ) : (
                                    <>
                                        <Action className='reply' type={
                                            <>
                                                {
                                                    expand ? (
                                                        <span>⬆️</span>
                                                    ) : (
                                                        <span>⬇️</span>
                                                    )
                                                }
                                                Reply
                                            </>
                                        } handleClick={handleNewComment} />
                                        <Action className='reply' type='Edit' handleClick={() => setEditMode(true)}/>
                                        <Action className='reply' type='Delete' handleClick={handleDelete}/>
                                    </>
                                )
                            }

                        </div>
                    </>
                )
            }
        </div>
        <div style={{display: expand ? "block" : "none",paddingLeft:25}}>
            {
                showInput && (
                    <div className='inputContainer'>
                        <input
                            type="text"
                            className="inputContainer__input"
                            autoFocus
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <Action className='reply' type='Reply'/>
                        <Action className='reply' type='Cancel' 
                        handleClick={() => {
                            setShowInput(false)
                            if(!comment?.items?.length) setExpand(false)
                        }}
                        />
                    </div>
                )
            }
        {
            comment?.replies?.map((item) => {
                return <Comment key={item.id} comment={item}/>
            })
        }
        </div>
    </div>
  )
}

export default Comment