import { Box, Container, TextField, Card, Typography, makeStyles } from '@material-ui/core'
import { useState } from 'react'
import { TimePicker } from "@material-ui/pickers";

const useStyles = makeStyles({
  container: {
    position: 'absolute',
    left: 0,
    top: 62,
    width: 220,
    padding: 5,
  },
  card: {
    padding: '0 10px 10px 10px'
  },
  inputMargin: {
    marginTop: 10,
  },
})

const defaultState = {
  user: '',
  type: '',
  name: '',
  plannedStartTime: null,
  plannedEndTime: null,
  startTime: null,
  endTime: null,
}

const Filter = ({ onChange }) => {
  const [{
    user,
    type,
    name,
    plannedStartTime,
    plannedEndTime,
    startTime,
    endTime,
  }, setState] = useState(defaultState)
  const classes = useStyles()

  const handleTimeChange = (value, filterName) => {
    const newState = {
      user,
      type,
      name,
      plannedStartTime,
      plannedEndTime,
      startTime,
      endTime,
      [filterName]: value,
    }
    setState(newState)
    onChange(newState)
  }

  const handleChange = ({ target }) => {
    const newState = {
      user,
      type,
      name,
      plannedStartTime,
      plannedEndTime,
      startTime,
      endTime,
      [target.name]: target.value,
    }
    setState(newState)
    onChange(newState)
  }

  return (
    <Container className={classes.container}>
      <Card className={classes.card}>
        <Box display="flex" justifyContent="center" flexWrap="wrap">
          <Box marginTop={1} width="230px">
            <TextField
              className={classes.inputMargin}
              name="user"
              id="user"
              label="User"
              onChange={handleChange}
              value={user}
            />
            <TextField
              className={classes.inputMargin}
              name="type"
              id="type"
              label="Type"
              onChange={handleChange}
              value={type}
            />
            <TextField
              className={classes.inputMargin}
              name="name"
              id="name"
              label="Name"
              onChange={handleChange}
              value={name}
            />
          </Box>
          <Box marginTop={1} width="230px">
            <Typography component="h2">Planned time</Typography>
            <TimePicker
              clearable
              ampm={false}
              label="Start"
              name="plannedStartTime"
              id="plannedStartTime"
              value={plannedStartTime}
              onChange={value => handleTimeChange(value, 'plannedStartTime')}
            />
            <TimePicker
              clearable
              ampm={false}
              className={classes.inputMargin}
              label="End"
              name="plannedEndTime"
              id="plannedEndTime"
              value={plannedEndTime}
              onChange={value => handleTimeChange(value, 'plannedEndTime')}
            />
          </Box>
          <Box marginTop={1} width="230px">
            <Typography component="h2">Actual time</Typography>
            <TimePicker
              clearable
              ampm={false}
              label="Start"
              name="startTime"
              id="startTime"
              value={startTime}
              onChange={value => handleTimeChange(value, 'startTime')}
            />
            <TimePicker
              clearable
              ampm={false}
              className={classes.inputMargin}
              label="End"
              name="endTime"
              id="endTime"
              value={endTime}
              onChange={value => handleTimeChange(value, 'endTime')}
            />
          </Box>
        </Box>
      </Card>
    </Container>
  )
}

export default Filter
