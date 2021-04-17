import { Card } from '@material-ui/core'
import React, { useContext } from 'react'
import { Context } from '../../App'
import Navbar from "../../Components/navbar/Navbar"
function Notes() {
    const user = useContext(Context)
    return (
        <div>
        <Navbar/>
        </div>
    )
}

export default Notes
