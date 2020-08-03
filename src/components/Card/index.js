import React from 'react';
import { Grid, Box, Typography, makeStyles } from '@material-ui/core';
import { slugify } from '../../utils/String';


const useStyles = makeStyles(theme => ({
    fontWeightRegular:{
        fontWeight:'normal',
        color:'#fff',
        fontSize:'13px'
    },
    primaryBg:{
        background:'#008bcf;'
    },
    divider:{
      position: 'relative',
      borderBottom: '.0625rem solid rgba(0,0,0,.12)',
      borderRight: '.0625rem solid rgba(0,0,0,.12)',
      display: 'flex',
      flex: '0 0 33.33%',
      cursor: "pointer",
      flexDirection: 'column',
      letterSpacing: 'normal',
      minHeight: '84px',
      paddingTop: '17px',
    },
    alignCenter:{
        textAlign:'center',
    },
      font14:{
        fontSize:'14px',
    },
    fadeOut:{
        opacity:'0.06'
    },
    gray:{
        color:'#666'
    },
    boxShadow:{
      boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
    }
  }));

const handleClick = (e,item) =>{
    window.location.href= '/' + slugify(item);
}

function Card(props){
    const classes = useStyles();
    let cards =[];
    
    if(props.items){
        props.items.map(item => {
            let card = <Grid item xs={4} className={classes.divider} onClick={(e)=> handleClick(e,item)}>
                            <Box component="span" display="Block" pt={0} mr={1.5} mb={1}>
                                <Typography variant={"body1"} component={"h5"} className={classes.alignCenter}>
                                    {/* 
                                        icon if possible 
                                    */}
                                    <div className={`${classes.font14} ${classes.gray}`}>{item}</div>
                                </Typography>
                            </Box>
                        </Grid>  
            cards.push(card);
        });
    }
       
    return (
        // TODO: Better design
        <div className={classes.boxShadow}>
            <Grid container >
                {cards}               
            </Grid>
        </div>
    );
}

export default Card;