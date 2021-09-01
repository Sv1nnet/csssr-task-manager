import React from 'react';
import { Switch, BrowserRouter, Link, Route } from 'react-router-dom';
import { Container, Box, Card, makeStyles } from '@material-ui/core'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { LoginForm, RestorePassword, SignupForm } from './_blocks'

const useStyles = makeStyles({
  link: {
    margin: '15px 15px 0 15px',
  },
});

const Auth = ({ tokenRequested }) => {
  const { link } = useStyles()
  return (
    <BrowserRouter>
      <Container>
        <Box display="flex" flexDirection="center" flexWrap="wrap" width="320px" margin="auto" marginTop={10}>
          <Card>
            <Box width="100%" display="flex" justifyContent="center" marginTop={1} paddingBottom={1}>
              <Link className={link} to="/signup">Sign up</Link>
              <Link className={link} to="/login">Log in</Link>
            </Box>

            <Switch>
              <Route exact path={['/', '/signup']} component={SignupForm} />
              <Route exact path="/login" component={LoginForm} />
              <Route exact path="/restore-password" component={RestorePassword} />
              <Route path="*" component={() => tokenRequested ? <Redirect to="signup" /> : null} />
            </Switch>
          </Card>
        </Box>
      </Container>
    </BrowserRouter>
  );
}

export default Auth