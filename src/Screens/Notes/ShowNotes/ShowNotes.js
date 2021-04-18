import { TextField } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import SearchBar from 'material-ui-search-bar';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { db } from '../../../Fire';
import NotesCard from './NotesCard';

function ShowNotes() {
    const param = useParams().fieldvalue;
    const[data, setData] = useState([]);
   const [SearchTerm, setSearchTerm]= useState("");
    useEffect(async()=>{
        await db.collection("classrooms").doc(param).collection("notes").get().then((response)=>{
            setData(response.docs.map((element)=>{
                return element.data();
            }))
        }).catch((err)=>{alert(err)})
   },[])

   const handleSearch =async()=>{
       if (SearchTerm.length>0){

           await db.collection("classrooms").doc(param).collection("notes").where("tags", "array-contains", SearchTerm).get().then((response)=>{
               setData(response.docs.map((element)=>{
                   return element.data();
                }))
            }).catch((err)=>{alert(err)})
        }
        else{
            await db.collection("classrooms").doc(param).collection("notes").get().then((response)=>{
                setData(response.docs.map((element)=>{
                    return element.data();
                }))
            }).catch((err)=>{alert(err)})
        }
   }
    return (
        <div >
        <center>
        <div style={{width:"70%"}}>
        <SearchBar value={SearchTerm} onChange={(e)=>setSearchTerm(e)} onRequestSearch={()=>{handleSearch()}} />
        </div>
        </center>
        <center>
        <div style={{display:"flex", flexWrap:"wrap"}}>
        
        {data.map((elementData)=>{
            return <NotesCard data={elementData}/>
        })}
        </div>
        </center>

        </div>
        )
}

export default ShowNotes
