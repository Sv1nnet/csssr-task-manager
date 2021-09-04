import React from 'react';
import { Form, Field } from 'react-final-form';
import { TextField, Box, Typography, makeStyles } from '@material-ui/core'
import { FormBody } from '@blocks'
import useMockFetch from '@utils/useFetch/mock';
import useFetch from '@utils/useFetch/useFetch';
import { REQUEST_FOR_QUESTION } from '@constants/url';

const useStyles = makeStyles({
  fullWidth: {
    width: '100%',
    paddingBottom: '.7em',
  },
  forgotPasswordLink: {
    display: 'inline-block',
    marginBottom: '.7em',
  },
})

const RequestForQuestion = ({ onSuccess }) => {
  const {
    fetchPost,
    state: { POST: { fetching, error } },
  /* -------------- Mock start -------------- */
  } = useMockFetch(useFetch())
  /* -------------- Mock end -------------- */

  const { fullWidth } = useStyles()

  const handleSubmit = (values) => {
    fetchPost(REQUEST_FOR_QUESTION, { body: JSON.stringify(values) }, {
      /* -------------- Mock start -------------- */
      type: 'success',
      latency: 1000,
      response: {
        data: values.login === 'not_existing' ? null : 'It\'s a very secret question. So what is your answer?',
        error: values.login === 'not_existing' ? { message: 'Could not find a user', code: 409 } : null,
      }
      /* -------------- Mock end -------------- */
    })
      .then((res) => {
        if (!res.error) onSuccess(res.data)
        return res
      })
  }

  const validate = (values) => {
    const error = { }
    if (!values.login?.length) error.login = 'Can\'t be blank'
    return error
  }

  return (
    <div>
      <Form
        onSubmit={(handleSubmit)}
        validate={validate}
        initialValues={{ login: '' }}
        render={formProps => (
          <form onSubmit={formProps.handleSubmit}>
            <FormBody loading={fetching} submitLabel="Submit">
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
            </FormBody>
            {error && <Typography color="error" align="center" className={fullWidth}>{error.message}</Typography>}
          </form>
        )}
      />
    </div>
  );
};

export default RequestForQuestion;
