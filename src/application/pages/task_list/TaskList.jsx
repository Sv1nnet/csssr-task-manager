import { Box, Container, makeStyles } from '@material-ui/core'
import { Filter, List, CreateTaskForm } from './_blocks'

const useStyles = makeStyles({
  taskListContainer: {
    position: 'relative',
    maxWidth: 850,
  },
  innerTaskListContainer: {
    boxSizing: 'border-box',
    paddingLeft: 120,
    paddingRight: 120,
  }
})

const TaskList = () => {
  const classes = useStyles()

  return (
    <Container className={classes.taskListContainer}>
      <Box display="flex">
        <Filter />
        <Box width="100%" className={classes.innerTaskListContainer}>
          <CreateTaskForm onSuccess={() => {}}/>
          <List />
        </Box>
      </Box>
    </Container>
  )
}

export default TaskList