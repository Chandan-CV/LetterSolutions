import { Dialog, DialogContent } from '@material-ui/core'
import React from 'react'

function TakeStat({open,setOpen,setStat}) {
    return (
        <div>
            <Dialog open={open} onClose={setOpen(false)}>
            <DialogContent>
            loll
            </DialogContent>
            </Dialog>
        </div>
    )
}

export default TakeStat
