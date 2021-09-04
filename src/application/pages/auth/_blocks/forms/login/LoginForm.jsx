import React, { useContext } from 'react';
import { Form, Field } from 'react-final-form';
import { TextField, Box, Typography, makeStyles } from '@material-ui/core'
import { FormBody } from '@blocks'
import { AuthContext } from '@src/application/app/_blocks/auth_context/AuthContext';
import { Link } from 'react-router-dom';
import useMockFetch from '@utils/useFetch/mock';
import useFetch from '@utils/useFetch/useFetch';
import { LOGIN } from '@constants/url';

const useStyles = makeStyles({
  message: {
    width: '100%',
    paddingBottom: '.7em',
  },
  forgotPasswordLink: {
    display: 'inline-block',
    marginBottom: '.7em',
  },
})

const LoginForm = () => {
  const { setToken } = useContext(AuthContext)
  const {
    fetchPost,
    state: { POST: { fetching, error } },
  /* -------------- Mock start -------------- */
  } = useMockFetch(useFetch())
  /* -------------- Mock end -------------- */

  const { message, forgotPasswordLink } = useStyles()

  const handleSubmit = (values) => {
    fetchPost(LOGIN, { body: JSON.stringify(values) }, {
      /* -------------- Mock start -------------- */
      type: 'success',
      latency: 1000,
      response: {
        data: values.password === 'wrongpass' ? null : 'some-access-token',
        error: values.password === 'wrongpass' ? { message: 'Wrong password', code: 403 } : null,
      }
      /* -------------- Mock end -------------- */
    })
      .then((res) => {
        setToken(res.data)
        /* -------------- Mock start -------------- */
        localStorage.setItem('token', 'refresh_token')
        localStorage.setItem('login', values.login)
        /* -------------- Mock end -------------- */
      })
  }

  const validate = (values) => {
    const error = { }

    if (!values.login?.length) error.login = 'Can\'t be blank'
    if (values.password?.length < 6) error.password = 'Password too short'
    if (!values.password?.length) error.password = 'Can\'t be blank'

    return error
  }

  return (
    <div>
      <Form
        onSubmit={(handleSubmit)}
        validate={validate}
        initialValues={{ login: '', password: '' }}
        render={formProps => (
          <form onSubmit={formProps.handleSubmit}>
            <FormBody loading={fetching} submitLabel="LogIn">
              <Box marginBottom={2} width="100%">
                <Field name="login" render={({ input, meta: { error, touched } }) => (
                  <TextField
                    {...input}
                    type="text"
                    id="login"
                    placeholder="Login"
                    fullWidth
                    required
                    error={touched && !!error}
                    helperText={touched ? error : ''}
                  />
                )} />
              </Box>
              <Box marginBottom={2} width="100%">
                <Field name="password" render={({ input, meta: { error, touched } }) => (
                  <TextField
                    {...input}
                    type="password"
                    id="password"
                    placeholder="Password"
                    fullWidth
                    required
                    error={touched && !!error}
                    helperText={touched ? error : ''}
                  />
                )} />
              </Box>
            </FormBody>
            {error && <Typography color="error" align="center" className={message}>{error.message}</Typography>}
          </form>
        )}
      />
      <Link to="/restore-password" className={forgotPasswordLink}>Forgot a password?</Link>
    </div>
  );
};

export default LoginForm;
