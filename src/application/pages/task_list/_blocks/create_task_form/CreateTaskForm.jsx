import { Box, makeStyles, Button, Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core'
import { useRef, useState } from 'react'
import { TaskForm } from '..'
import { TASK } from '@constants/url'
import useFetch from '@utils/useFetch'
import useMockFetch from '@utils/useFetch/mock'

const useStyles = makeStyles({
  accordion: {
    marginBottom: 15,
    '&.MuiAccordion-root:before': {
      display: 'none',
    }
  },
  details: {
    padding: 0,
  },
  summary: {
    display: 'none',
  },
  formContainer: {
    transition: 'height .3s ease',
    overflow: 'hidden',
    boxSizing: 'border-box',
  },
  card: {
    margin: 3
  },
  button: {
    width: 90,
  }
})

const CreateTaskForm = ({ fetchingList, onSuccess }) => {
  const classes = useStyles()
  const $task = useRef()

  const {
    fetchPost,
    resetState,
    state: { POST: { fetching, error, data } },
    /* -------------- Mock start -------------- */
  } = useMockFetch(useFetch())
  /* -------------- Mock end -------------- */
  const [formOpen, setFormOpen] = useState(false)

  const handleOpen = () => {
    setFormOpen(!formOpen)
    if (!formOpen) $task.current.$form.reset()
    resetState('POST')
  }

  const handleSubmit = (values, { restart }) => {
    const plannedStartTime = values.plannedStartTime ? [values.plannedStartTime.hour(), values.plannedStartTime.minute()] : null
    const plannedEndTime = values.plannedEndTime ? [values.plannedEndTime.hour(), values.plannedEndTime.minute()] : null
    const startTime = values.startTime ? [values.startTime.hour(), values.startTime.minute()] : null
    const endTime = values.endTime ? [values.endTime.hour(), values.endTime.minute()] : null
    
    const { name, type, description } = values
    /* -------------- Mock start -------------- */
    const user = localStorage.getItem('login')
    /* -------------- Mock end -------------- */
    values = {
      name,
      type,
      description,
      user,
      plannedStartTime,
      plannedEndTime,
      startTime,
      endTime,
      done: false,
    }

    return fetchPost(TASK, { body: JSON.stringify(values) }, {
      /* -------------- Mock start -------------- */
      type: 'success',
      latency: 1000,
      response: {
        data: values.name === 'invalid_name' ? null : 'Task has been created',
        error: values.name === 'invalid_name' ? { message: 'Invalid name', code: 409 } : null,
      }
      /* -------------- Mock end -------------- */
    })
      .then((res) => {
        if (!res.error) {
          restart();
          /* -------------- Mock start -------------- */
          let taskList = JSON.parse(`${localStorage.getItem('taskList')}`)

          if (!Array.isArray(taskList)) taskList = []
          taskList.push({ ...values, id: ('task-id-' + Date.now()) })
          localStorage.setItem('taskList', JSON.stringify(taskList))
          /* -------------- Mock end -------------- */
          onSuccess(res);
        }
      })
  }

  return (
    <Box width="70%" margin="auto">
      <Box marginTop={2}>
        <Button onClick={handleOpen} className={classes.button} variant="contained" color={formOpen ? 'secondary' : 'primary'}>
          {formOpen ? 'Close' : 'Create'}
        </Button>
      </Box>
      <Accordion expanded={formOpen} className={classes.accordion}>
        <AccordionSummary className={classes.summary} />
        <AccordionDetails className={classes.details}>
          <TaskForm ref={$task} isEdit data={data} error={error} onSubmit={handleSubmit} submitLabel="create" fetching={fetchingList || fetching} />
        </AccordionDetails>
      </Accordion>
    </Box>
  )
}

export default CreateTaskForm