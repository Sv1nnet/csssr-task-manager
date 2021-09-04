import React from 'react';
import { Form, Field } from 'react-final-form';
import { TextField, Box, Typography, makeStyles } from '@material-ui/core'
import { FormBody } from '@blocks'
import useMockFetch from '@utils/useFetch/mock';
import useFetch from '@utils/useFetch/useFetch';
import { UPDATE_PASSWORD } from '@constants/url';

const useStyles = makeStyles({
  fullWidth: {
    width: '100%',
    paddingBottom: '.7em',
  },
  success: {
    paddingBottom: '.7em',
    margin: 16,
  },
  forgotPasswordLink: {
    display: 'inline-block',
    marginBottom: '.7em',
  },
})

const NewPassword = () => {
  const {
    fetchPost,
    state: { POST: { fetching, error, data } },
  /* -------------- Mock start -------------- */
  } = useMockFetch(useFetch())
  /* -------------- Mock end -------------- */

  const { fullWidth, ...rest } = useStyles()

  const handleSubmit = (values) => {
    return fetchPost(UPDATE_PASSWORD, { body: JSON.stringify(values) }, {
      /* -------------- Mock start -------------- */
      type: 'success',
      latency: 2000,
      response: {
        data: values.password === 'wrongpass' ? null : 'Password has been successfully reset',
        error: values.password === 'wrongpass' ? { message: 'Password invalid', code: 409 } : null,
      }
      /* -------------- Mock end -------------- */
    })
  }

  const validate = (values) => {
    const error = { }

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
      {data
        ? (
          <Box width="320px">
            <Typography color="primary" align="center" className={rest.success}>{data}</Typography>
          </Box>
        )
        : (
          <Form
            onSubmit={(handleSubmit)}
            validate={validate}
            initialValues={{ password: '', confirmPassword: '' }}
            render={formProps => (
              <form onSubmit={formProps.handleSubmit}>
                <FormBody loading={fetching} submitLabel="Submit">
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
                </FormBody>
                {error && <Typography color="error" align="center" className={fullWidth}>{error.message}</Typography>}
              </form>
            )}
          />)}
    </div>
  );
};

export default NewPassword;
