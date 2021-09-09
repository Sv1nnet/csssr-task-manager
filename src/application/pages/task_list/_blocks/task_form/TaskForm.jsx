import { Box, TextField, Typography, makeStyles } from '@material-ui/core'
import { Form, Field } from 'react-final-form'
import { TimePicker } from "@material-ui/pickers";
import { FormBody } from '@blocks'
import { forwardRef, useImperativeHandle, useRef } from 'react';

const useStyles = makeStyles({
  inputMargin: {
    marginTop: 15,
  },
  inputColor: {
    '& input, & textarea': {
      color: 'black',
    }
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
  description: '',
  done: false,
  plannedStartTime: null,
  plannedToTime: null,
  startTime: null,
  endTime: null,
}

const TaskForm = forwardRef(function TaskForm({ task = defaultTask, data, error, isEdit, fetching, buttons, submitLabel, onSubmit }, ref) {
  const classes = useStyles()
  const $form = useRef()

  useImperativeHandle(ref, () => ({
    $form: $form.current
  }), [])

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={task}
      render={formProps => {
        $form.current = formProps.form
        return (
          <form onSubmit={formProps.handleSubmit}>
            <FormBody hideButtons={!(isEdit ?? true)} loading={fetching} buttons={buttons} submitLabel={submitLabel}>
              <Field name="name" render={({ input }) => (
                <TextField
                  {...input}
                  fullWidth
                  className={classes.inputMargin}
                  InputProps={{ className: classes.inputColor }}
                  disabled={!isEdit || fetching}
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
                  className={classes.inputMargin}
                  InputProps={{ className: classes.inputColor }}
                  disabled={!isEdit || fetching}
                  name="type"
                  id="type"
                  label="Type"
                />
              )} />
              <Field name="description" render={({ input }) => (
                <TextField
                  {...input}
                  fullWidth
                  multiline
                  className={classes.inputMargin}
                  InputProps={{ className: classes.inputColor }}
                  disabled={!isEdit || fetching}
                  name="description"
                  id="description"
                  label="Description"
                />
              )} />
              <Box display="flex" marginTop={1} marginBottom={2} width="100%">
                <Box width="50%">
                  <Typography style={{ width: '100%' }} component="h2">Planned time</Typography>
                  <Box display="flex" width="100%">
                    <Field name="plannedStartTime" render={({ input }) => (
                      <TimePicker
                        clearable
                        ampm={false}
                        {...input}
                        disabled={!isEdit || fetching}
                        style={{ marginRight: '5px' }}
                        InputProps={{ className: classes.inputColor }}
                        value={input.value || null}
                        className={classes.inputMargin}
                        label="Start"
                        name="plannedStartTime"
                        id="plannedStartTime"
                      />
                    )} />
                    <Field name="plannedEndTime" render={({ input }) => (
                      <TimePicker
                        clearable
                        ampm={false}
                        {...input}
                        disabled={!isEdit || fetching}
                        style={{ marginLeft: '5px' }}
                        InputProps={{ className: classes.inputColor }}
                        value={input.value || null}
                        className={classes.inputMargin}
                        label="End"
                        name="plannedEndTime"
                        id="plannedEndTime"
                      />
                    )} />
                  </Box>
                </Box>
                <Box marginLeft={1} width="50%">
                  <Typography style={{ width: '100%' }} component="h2">Actual time</Typography>
                  <Box display="flex" width="100%">
                    <Field name="startTime" render={({ input }) => (
                      <TimePicker
                        clearable
                        ampm={false}
                        {...input}
                        disabled={!isEdit || fetching}
                        style={{ marginRight: '5px' }}
                        InputProps={{ className: classes.inputColor }}
                        value={input.value || null}
                        className={classes.inputMargin}
                        label="Start"
                        name="startTime"
                        id="startTime"
                      />
                    )} />
                    <Field name="endTime" render={({ input }) => (
                      <TimePicker
                        clearable
                        ampm={false}
                        {...input}
                        disabled={!isEdit || fetching}
                        style={{ marginLeft: '5px' }}
                        InputProps={{ className: classes.inputColor }}
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
        )
      }}
    />
  )
})

export default TaskForm