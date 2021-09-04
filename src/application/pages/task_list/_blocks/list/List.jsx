import { Box, Typography, makeStyles } from "@material-ui/core"
import { Loader } from '@blocks'
import { Task } from ".."

const useStyles = makeStyles({
  message: {
    width: '100%',
    paddingBottom: '.7em',
  },
})

const List = ({ list = [], onTaskUpdated, fetching, error }) => {
  const classes = useStyles()
  return (
    <Box width="70%" margin="auto" marginBottom={2}>
      {fetching && <Loader />}
      {error && <Typography color="error" align="center" className={classes.message}>{error.message}</Typography>}
      {list.map(task => <Task key={task.id} onSuccess={onTaskUpdated} task={task} />)}
    </Box>
  )
}

export default List
