import { Container, Box, Typography, IconButton, AppBar, Toolbar, makeStyles } from '@material-ui/core'
import { ExitToApp as ExitToAppIcon } from '@material-ui/icons'
import { Link } from 'react-router-dom'

const useStyles = makeStyles({
  logoutButton: {
    padding: 0,
    marginLeft: 15,
  },
  typography: {
    fontSize: '1.6em',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
  }
})

const Nav = () => {
  const classes = useStyles()
  /* -------------- Mock start -------------- */
  const handleLogout = () => {
    localStorage.setItem('token', '')
    localStorage.setItem('login', '')
    localStorage.setItem('avatar', '')
    localStorage.setItem('name', '')
    localStorage.setItem('surname', '')
    localStorage.setItem('patronymic', '')
    localStorage.setItem('secretQuestion', '')
    localStorage.setItem('taskList', '')
    window.location = '/'
  }
  /* -------------- Mock end -------------- */
  return (
    <AppBar position="relative">
      <Toolbar>
        <Box position="relative" textAlign="center" width="100%">
          <Box>
            <Typography className={classes.typography}>
              <Link className={classes.link} to="/">
                List
              </Link>
            </Typography>
          </Box>
          <Box position="absolute" display="flex"  alignItems="center" right="0" top="0">
            <Typography className={classes.typography} display="inline">
              <Link className={classes.link} to="/profile">
                Profile
              </Link>
            </Typography>
            <IconButton
              onClick={handleLogout}
              className={classes.logoutButton}
              color="inherit"
              aria-label="upload picture"
              component="span"
            >
              <ExitToAppIcon />
            </IconButton>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Nav
