import { Container, Box, Typography, IconButton } from '@material-ui/core'
import { ExitToApp as ExitToAppIcon } from '@material-ui/icons'
import { Link } from 'react-router-dom'

const Nav = () => {
  /* -------------- Mock start -------------- */
  const handleLogout = () => {
    console.log('logout')
    localStorage.setItem('token', '')
    localStorage.setItem('login', '')
    localStorage.setItem('avatar', '')
    localStorage.setItem('name', '')
    localStorage.setItem('surname', '')
    localStorage.setItem('patronymic', '')
    localStorage.setItem('secretQuestion', '')
    window.location = '/'
  }
  /* -------------- Mock end -------------- */
  return (
    <Box component="nav" borderBottom="1px solid grey" paddingY={1}>
      <Container>
        <Box position="relative" textAlign="center" width="100%">
          <Box>
            <Typography>
              <Link to="/">
                List
              </Link>
            </Typography>
          </Box>
          <Box position="absolute" right="0" top="0">
            <Typography display="inline">
              <Link to="/profile">
                Profile
              </Link>
            </Typography>
            <IconButton
              onClick={handleLogout}
              style={{ padding: 0, marginLeft: '15px' }}
              color="inherit"
              aria-label="upload picture"
              component="span"
            >
              <ExitToAppIcon />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default Nav
