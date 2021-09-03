import { Box, Container, TextField, Typography, makeStyles } from '@material-ui/core'
import { useState, useEffect, useReducer } from 'react'
import { TimePicker } from "@material-ui/pickers";
import useFetch from '../../../../utils/useFetch'
import useMockFetch from '../../../../utils/useFetch/mock'

const useStyles = makeStyles({
  container: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 220,
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

const Filter = () => {
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

  const handleTimeChange = (value, name) => {
    setState(prevState => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleChange = ({ target }) => setState(prevState => ({
    ...prevState,
    [target.name]: target.value,
  }))

  return (
    <Container className={classes.container}>
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
            ampm={false}
            label="Start"
            name="plannedStartTime"
            id="plannedStartTime"
            value={plannedStartTime}
            onChange={value => handleTimeChange(value, 'plannedStartTime')}
          />
          <TimePicker
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
            ampm={false}
            label="Start"
            name="startTime"
            id="startTime"
            value={startTime}
            onChange={value => handleTimeChange(value, 'startTime')}
          />
          <TimePicker
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
    </Container>
  )
}

export default Filter
