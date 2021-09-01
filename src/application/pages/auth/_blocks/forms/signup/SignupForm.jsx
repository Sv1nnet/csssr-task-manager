import React from 'react'
import { Form, Field } from 'react-final-form'
import { TextField, Box, Typography, makeStyles } from '@material-ui/core'
import { SIGNUP } from '../../../../../constants/url';
import useMockFetch from '../../../../../utils/mock/fetch';
import useFetch from '../../../../../utils/useFetch/useFetch';
import FormBody from '../formBody/FormBody'

const useStyles = makeStyles({
  message: {
    width: '100%',
    paddingBottom: '.7em',
  },
})

const SignupForm = () => {
  const {
    fetchPost,
    state: { POST: { fetching, error, data } },
    /* -------------- Mock start -------------- */
  } = useMockFetch(useFetch())
  /* -------------- Mock end -------------- */

  const { message } = useStyles()

  const handleSubmitRFF = async (values) => {
    return fetchPost(SIGNUP, { body: JSON.stringify(values) }, {
      /* -------------- Mock start -------------- */
      type: 'success',
      latency: 1000,
      response: {
        data: /^\d+$/.test(values.password) ? null : 'User has been created',
        error: /^\d+$/.test(values.password) ? { message: 'Password is too simple', code: 409 } : null,
      }
      /* -------------- Mock end -------------- */
    })
  }

  const handleSubmit = ({ handleSubmit: onSubmitRFF, form }) => event => onSubmitRFF(event)
    .then((res) => {
      if (!res.error) form.restart();
      return res
    })

  const validate = (values) => {
    const error = { }

    if (!values.login?.length) error.login = 'Can\'t be blank'
    if (values.password && values.confirmPassword && values.password !== values.confirmPassword) {
      error.password = 'Password and password confirmation mismatch'
      error.confirmPassword = 'Password and password confirmation mismatch'
    }

    if (values.password?.length < 6) error.password = 'Password too short'
    if (values.confirmPassword?.length < 6) error.confirmPassword = 'Password too short'

    if (!values.password?.length) error.password = 'Can\'t be blank'
    if (!values.confirmPassword?.length) error.confirmPassword = 'Can\'t be blank'
    return error
  }

  return (
    <div>
      <Form
        onSubmit={handleSubmitRFF}
        initialValues={{ login: '', password: '', confirmPassword: '' }}
        validate={validate}
        render={formProps => (
          <form onSubmit={handleSubmit(formProps)}>
            <FormBody loading={fetching} submitLabel="Sign Up">
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
              <Box marginBottom={2} width="100%">
                <Field name="confirmPassword" render={({ input, meta: { error, touched } }) => (
                  <TextField
                    {...input}
                    type="password"
                    id="confirm-password"
                    placeholder="Confirm password"
                    fullWidth
                    required
                    error={touched && !!error}
                    helperText={touched ? error : ''}
                  />
                )} />
              </Box>
              {error && <Typography color="error" align="center" className={message}>{error.message}</Typography>}
              {data && <Typography color="primary" align="center" className={message}>{data}</Typography>}
            </FormBody>
          </form>
        )}
      />
    </div>
  )
}

export default SignupForm
