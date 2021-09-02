import { useState, useEffect } from 'react'
import { Form, Field } from 'react-final-form'
import { TextField, Box, Container, Typography, Button, Avatar, makeStyles } from '@material-ui/core'
import { FormBody } from '../../_blocks'
import useFetch from '../../utils/useFetch'
import useMockFetch from '../../utils/useFetch/mock'
import { EDIT_PROFILE, GET_PROFILE } from '../../constants/url'

const useStyles = makeStyles({
  message: {
    width: '100%',
    paddingBottom: '.7em',
  },
})

const Profile = () => {
  const {
    fetchPost,
    fetchGet,
    state: { POST, GET },
    /* -------------- Mock start -------------- */
  } = useMockFetch(useFetch())
  /* -------------- Mock end -------------- */
  const { message } = useStyles()
  const [initialValues, setInitialValues] = useState({ })
  const [disabled, setDisabled] = useState(true) // disable inputs until we get user profile data

  const handleAvatarChange = (file, input) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      input.onChange({
        base64: reader.result,
        file,
      })
    }
    reader.readAsDataURL(file)
  }

  const handleSubmitRFF = (values, { restart }) => {
    const form = new FormData()

    Object
      .entries(values)
      .forEach(([k, v]) => {
        if (k !== 'avatar') form.append(k, v)
        else form.append(k, v.file)
      })

    return fetchPost(EDIT_PROFILE, { body: form }, {
      /* -------------- Mock start -------------- */
      type: 'success',
      latency: 1000,
      response: {
        data: (({ password, confirmPassword, answer, ...data }) => data)(values),
        error: null,
      }
      /* -------------- Mock end -------------- */
    })
      .then((res) => {
        if (!res.error) {
          setInitialValues(res.data)
          /* -------------- Mock start -------------- */
          Object
            .entries(res.data)
            .forEach(([k, v]) => {
              if (k !== 'avatar') localStorage.setItem(k, v || '')
              else if (typeof v === 'string') localStorage.setItem(k, v || '')
              else {
                const reader = new FileReader()
                reader.onloadend = () => {
                  localStorage.setItem(k, reader.result)
                }
                reader.readAsDataURL(v.file)
              }
            })
          /* -------------- Mock end -------------- */
          restart()
        }
      })
  }

  const validate = ({ password, confirmPassword, secretQuestion, answer, name, surname, patronymic }) => {
    const error = { }

    const passwordMinLength = 6

    const onlyDigits = /^\d+$/
    if (onlyDigits.test(name)) error.name = 'Name should contain at least one letter'
    if (onlyDigits.test(surname)) error.name = 'Surname should contain at least one letter'
    if (onlyDigits.test(patronymic)) error.name = 'Patronymic should contain at least one letter'

    if (secretQuestion !== initialValues.secretQuestion || answer) {
      if (!password) error.password = 'Password is requried if secret question or answer changed'
      else if (password.length < passwordMinLength) error.password = 'Password too short'
      else if (password !== confirmPassword) {
        error.password = 'Password and password confirmation mismatch'
        error.confirmPassword = 'Password and password confirmation mismatch'
      }
    } else if (password) {
      if (password.length < passwordMinLength) error.password = 'Password too short'
      else if (password !== confirmPassword) {
        error.confirmPassword = 'Password and password confirmation mismatch'
      }
    }

    return error
  }

  useEffect(() => {
    fetchGet(GET_PROFILE, { }, {
      /* -------------- Mock start -------------- */
      type: 'success',
      latency: 1000,
      response: {
        data: {
          login: localStorage.getItem('login'),
          avatar: localStorage.getItem('avatar'),
          name: localStorage.getItem('name'),
          surname: localStorage.getItem('surname'),
          patronymic: localStorage.getItem('patronymic'),
          secretQuestion: localStorage.getItem('secretQuestion'),
        },
        error: null,
      }
      /* -------------- Mock end -------------- */
    }).then((res) => {
      setInitialValues(res.data)
      setDisabled(false)
    })
  }, [])

  return (
    <Container maxWidth="xs">
      <Form
        validate={validate}
        onSubmit={handleSubmitRFF}
        initialValues={initialValues}
        render={formProps => (
          <form onSubmit={formProps.handleSubmit}>
            <FormBody loading={POST.fetching || GET.fetching} submitLabel="Save">
              <Box marginBottom={2} width="100%">
                <Field name="avatar" render={({ input }) => (
                  <Button disabled={disabled} component="label">
                    <Avatar src={input.value?.base64 || input.value} />
                    <input
                      onChange={e => handleAvatarChange(e.target.files[0], input)}
                      value={input.value.files}
                      type="file"
                      accept=".png, .jpg, .jpeg"
                      hidden
                    />
                  </Button>
                )} />
              </Box>
              <Box marginBottom={2} width="100%">
                <Field name="login" render={({ input, meta: { error, touched } }) => (
                  <TextField
                    {...input}
                    type="text"
                    id="login"
                    placeholder="Login"
                    fullWidth
                    disabled
                    error={touched && !!error}
                    helperText={touched ? error : ''}
                  />
                )} />
              </Box>
              <Box marginBottom={2} width="100%">
                <Field name="name" render={({ input, meta: { error, touched } }) => (
                  <TextField
                    {...input}
                    disabled={disabled}
                    id="name"
                    placeholder="Name"
                    fullWidth
                    error={touched && !!error}
                    helperText={touched ? error : ''}
                  />
                )} />
              </Box>
              <Box marginBottom={2} width="100%">
                <Field name="surname" render={({ input, meta: { error, touched } }) => (
                  <TextField
                    {...input}
                    disabled={disabled}
                    id="surname"
                    placeholder="Surname"
                    fullWidth
                    error={touched && !!error}
                    helperText={touched ? error : ''}
                  />
                )} />
              </Box>
              <Box marginBottom={2} width="100%">
                <Field name="patronymic" render={({ input, meta: { error, touched } }) => (
                  <TextField
                    {...input}
                    disabled={disabled}
                    id="patronymic"
                    placeholder="Patronymic"
                    fullWidth
                    error={touched && !!error}
                    helperText={touched ? error : ''}
                  />
                )} />
              </Box>
              <Box marginBottom={2} width="100%">
                <Field name="secretQuestion" render={({ input, meta: { error, touched } }) => (
                  <TextField
                    {...input}
                    disabled={disabled}
                    id="secretQuestion"
                    placeholder="Secret question"
                    fullWidth
                    error={touched && !!error}
                    helperText={touched ? error : ''}
                  />
                )} />
              </Box>
              <Box marginBottom={2} width="100%">
                <Field name="answer" render={({ input, meta: { error, touched } }) => (
                  <TextField
                    {...input}
                    disabled={disabled}
                    id="answer"
                    autoComplete="off"
                    placeholder="Answer"
                    fullWidth
                    error={touched && !!error}
                    helperText={touched ? error : ''}
                  />
                )} />
              </Box>
              <Box marginBottom={2} width="100%">
                <Field name="password" render={({ input, meta: { error, touched } }) => (
                  <TextField
                    {...input}
                    disabled={disabled}
                    type="password"
                    id="password"
                    placeholder="Password"
                    fullWidth
                    error={touched && !!error}
                    helperText={touched ? error : ''}
                  />
                )} />
              </Box>
              <Box marginBottom={2} width="100%">
                <Field name="confirmPassword" render={({ input, meta: { error, touched } }) => (
                  <TextField
                    {...input}
                    disabled={disabled}
                    type="password"
                    id="confirm-password"
                    placeholder="Confirm password"
                    fullWidth
                    error={touched && !!error}
                    helperText={touched ? error : ''}
                  />
                )} />
              </Box>
              {POST.error && <Typography color="error" align="center" className={message}>{POST.error.message}</Typography>}
              {POST.data && <Typography color="primary" align="center" className={message}>Profile saved</Typography>}
            </FormBody>
          </form>
        )}
      />
    </Container>
  )
}

export default Profile