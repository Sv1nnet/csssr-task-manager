import React from 'react';
import { Form, Field } from 'react-final-form';
import { TextField, Box, Typography, makeStyles } from '@material-ui/core'
import FormBody from '../../../formBody/FormBody';
import useMockFetch from '../../../../../../../utils/mock/fetch';
import useFetch from '../../../../../../../utils/useFetch/useFetch';
import { ANSWER } from '../../../../../../../constants/url';

const useStyles = makeStyles({
  fullWidth: {
    width: '100%',
    paddingBottom: '.7em',
  },
})

const Question = ({ onSuccess, stepData: question }) => {
  const {
    fetchPost,
    state: { POST: { fetching, error } },
  /* -------------- Mock start -------------- */
  } = useMockFetch(useFetch())
  /* -------------- Mock end -------------- */

  const { fullWidth } = useStyles()

  const handleSubmit = (values) => {
    return fetchPost(ANSWER, { body: JSON.stringify(values) }, {
      /* -------------- Mock start -------------- */
      type: 'success',
      latency: 1000,
      response: {
        data: values.answer === 'wrong' ? null : 'reset-password-token',
        error: values.answer === 'wrong' ? { message: 'Wrong answer', code: 409 } : null,
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
    if (!values.answer?.length) error.answer = 'Can\'t be blank'
    return error
  }

  return (
    <div>
      <Form
        onSubmit={(handleSubmit)}
        validate={validate}
        initialValues={{ answer: '' }}
        render={formProps => (
          <form onSubmit={formProps.handleSubmit}>
            <FormBody loading={fetching} submitLabel="Submit">
              <Box marginBottom={2} width="100%">
                <Typography className={fullWidth}>{question}</Typography>
              </Box>
              <Box marginBottom={2} width="100%">
                <Field name="answer" render={({ input, meta: { error, touched } }) => (
                  <TextField
                    {...input}
                    type="text"
                    id="answer"
                    placeholder="Answer"
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

export default Question;
