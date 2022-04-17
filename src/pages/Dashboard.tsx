import React, { useContext, useEffect, useState } from 'react'
import { Box, ListItem, ListItemText} from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Theme } from '@mui/system'
import data from '../data/time_slots.json'
import { v4 as uuidv4 } from 'uuid'

const useStyles = makeStyles((theme: Theme) => ({
    style: {
        width: '50%',
        display:'flex',
        justifyContent:'center',
    },
    container:{
        margin:'1%',
        width:'200px',
        // [theme.breakpoints.down('sm')]: {
        //     width: '90%',
        // },
    },
    styleScrean : {
        widhth :'100%',
        display:'flex',
        justifyContent:'center',
        bgcolor: '#6c757d',
    },
    stylebuttonRoom : {
        marginTop:'5%',
        border:'3px solid black'
    },
    stylebuttontermins : {
        marginTop:'10%',
        // border:'1px solid secondary.light'
    },
    draverStyle : {
        bgcolor: 'secondary.light'
    },
}))

const styleitem = {
    border: '1px solid #6c757d',
    margin:'0 auto'
}

const Dashboard = () => {
    const classes = useStyles()
    const array = data
    let arraytime: any[]

    const array_data = data && data.map((item:any) => {
        return {
            ...item,
            day:new Date(ele.start_time).toLocaleString('en-us', { weekday: 'long' })
        }
        // console.log("arraytime",arraytime.filter((el:any)=> el.day ))
    })
    // arraytime = array_data && array_data?.time_slots?.map((ele:any) => {
    //     return {
    //         ...ele,
    //         _id:uuidv4(),
    //     }
    // })
    
    return (
        <Box className={classes.styleScrean}>
            <Box className={classes.style} component='nav' aria-label='mailbox folders'>
                {array.map((item:any) =>
                    (
                        <>
                            <Box className={classes.container}>
                                <Box className={classes.stylebuttonRoom}>
                                    <ListItem button>
                                        <ListItemText primary={item.name} />
                                    </ListItem>
                                </Box>
                                {arraytime.length > 0 && arraytime.map((ele:any) => (
                                    <>
                                        <Box>
                                            <ListItem button sx={styleitem}>
                                            <ListItemText primary={ele.day} />
                                        </ListItem>
                                        </Box>
                                        <Box className={classes.stylebuttontermins}>
                                            <ListItem button sx={styleitem}>
                                                {/* <ListItemText primary={new Date(ele.start_time).toLocaleString('en-us', {  weekday: 'long' })} /> */}
                                                <ListItemText primary={new Date(ele.start_time).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })} />
                                                <ListItemText primary={new Date(ele.end_time).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })} />
                                            </ListItem>
                                        </Box>
                                    </>
                                ))}
                            </Box>
                        </>
                    )
                )}
            </Box>
        </Box>
    )
}

export default Dashboard