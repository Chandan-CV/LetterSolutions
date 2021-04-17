import React from 'react'
import './NotesCard.css'
function NotesCard({data}) {
    return (
        <div className="OuterNotesCard" onClick={()=>{window.open(data.base, "_blank")}}>
           <p>{data?data.name:null}</p>
        </div>
    )
}

export default NotesCard
