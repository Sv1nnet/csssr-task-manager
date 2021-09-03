import { Box, TextField, Typography, makeStyles } from '@material-ui/core'
import { Form, Field } from 'react-final-form'
import { TimePicker } from "@material-ui/pickers";
import { FormBody } from '../../../../_blocks'

const useStyles = makeStyles({
  inputMargin: {
    marginTop: 15,
  },
  message: {
    width: '100%',
    paddingBottom: '.7em',
  },
})

const defaultTask = {
  user: '',
  type: '',
  name: '',
  plannedStartTime: null,
  plannedToTime: null,
  startTime: null,
  endTime: null,
}

const TaskForm = ({ task = defaultTask, data, error, isEdit, fetching, buttons, submitLabel, onInputFocus, onInputBlur, onSubmit }) => {
  const classes = useStyles()

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={task}
      render={formProps => (
        <form onSubmit={formProps.handleSubmit}>
          <FormBody loading={fetching} buttons={buttons} submitLabel={submitLabel}>
            <Field name="name" render={({ input }) => (
              <TextField
                {...input}
                fullWidth
                onFocus={onInputFocus}
                onBlur={onInputBlur}
                className={classes.inputMargin}
                disabled={fetching}
                name="name"
                id="name"
                label="Name"
                required
              />
            )} />
            <Field name="type" render={({ input }) => (
              <TextField
                {...input}
                fullWidth
                onFocus={onInputFocus}
                onBlur={onInputBlur}
                className={classes.inputMargin}
                disabled={fetching}
                name="type"
                id="type"
                label="Type"
              />
            )} />
            <Box display="flex" marginTop={1} marginBottom={2} width="100%">
              <Box width="50%">
                <Typography style={{ width: '100%' }} component="h2">Planned time</Typography>
                <Box display="flex" width="100%">
                  <Field name="plannedStartTime" render={({ input }) => (
                    <TimePicker
                      ampm={false}
                      {...input}
                      style={{ marginRight: '5px' }}
                      value={input.value || null}
                      className={classes.inputMargin}
                      label="Start"
                      name="plannedStartTime"
                      id="plannedStartTime"
                    />
                  )} />
                  <Field name="plannedToTime" render={({ input }) => (
                    <TimePicker
                      ampm={false}
                      {...input}
                      style={{ marginLeft: '5px' }}
                      value={input.value || null}
                      className={classes.inputMargin}
                      label="End"
                      name="plannedToTime"
                      id="plannedToTime"
                    />
                  )} />
                </Box>
              </Box>
              <Box marginLeft={1} width="50%">
                <Typography style={{ width: '100%' }} component="h2">Actual time</Typography>
                <Box display="flex" width="100%">
                  <Field name="startTime" render={({ input }) => (
                    <TimePicker
                      ampm={false}
                      {...input}
                      style={{ marginRight: '5px' }}
                      value={input.value || null}
                      className={classes.inputMargin}
                      label="Start"
                      name="startTime"
                      id="startTime"
                    />
                  )} />
                  <Field name="endTime" render={({ input }) => (
                    <TimePicker
                      ampm={false}
                      {...input}
                      style={{ marginLeft: '5px' }}
                      value={input.value || null}
                      className={classes.inputMargin}
                      label="End"
                      name="endTime"
                      id="endTime"
                    />
                  )} />
                </Box>
              </Box>
            </Box>
            {error && <Typography color="error" align="center" className={classes.message}>{error.message}</Typography>}
            {data && <Typography color="primary" align="center" className={classes.message}>{data}</Typography>}
          </FormBody>
        </form>
      )}
    />
  )
}

export default TaskForm