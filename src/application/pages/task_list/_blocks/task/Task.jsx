import { Box, Container, TextField, makeStyles, Button } from '@material-ui/core'
import { TaskForm } from '..'

const useStyles = makeStyles({

})

const Task = ({ task, isEdit, fetching, buttons, submitLabel, onInputFocus, onInputBlur, onSubmit }) => {
  const classes = useStyles()

  return (
    <TaskForm onSubmit={() => { }} />
  )
}

export default Task