import { makeStyles } from "@mui/styles";






export default makeStyles(() => ({
  appBar: {
    boxShadow: 'none',
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    
  },
  title: {
    flexGrow: 1,
    alignItems: 'center',
    display: 'flex',
    textDecoration: 'none',
    textTransform:"uppercase",
    justifyContent:"left"
  },
  image: {
    marginRight: '15px',

  },
  
  grow: {
    flexGrow: 1,
   
  },
  button:{
    display :"flex",
    marginRight:"30px",
    alignItems:"center",
  }
}));