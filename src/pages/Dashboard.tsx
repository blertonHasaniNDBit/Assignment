import React, { useContext, useEffect, useState } from 'react'
import { Box, ListItem, ListItemText} from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Theme } from '@mui/system'
import data from '../data/time_slots.json'

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
    let arrayFilter= useState([])

    const array_data = data.map((item:any) => {
        item.time_slots.map((ele:any) => {
            // arrayFilter.push(...ele)
        })
    })

    console.log('arrayFilter', arrayFilter)

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
                                {item.time_slots.map((ele:any) => (
                                    <>
                                        <Box className={classes.stylebuttontermins}>
                                            <ListItem button sx={styleitem}>
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