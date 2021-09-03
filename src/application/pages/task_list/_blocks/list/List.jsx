import { Box, makeStyles } from "@material-ui/core"
import { Task, CreateTaskForm } from ".."

const useStyles = makeStyles({
  container: {
  },
})

const List = () => {
  const classes = useStyles()
  return (
    <Box width="70%" margin="auto" className={classes.container}>
      {/* <CreateTaskForm /> */}
    </Box>
  )
}

export default List
