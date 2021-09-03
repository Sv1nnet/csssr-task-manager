import { Box, makeStyles, Button, Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core'
import { useState } from 'react'
import { TaskForm } from '..'
import { TASK } from '../../../../constants/url'
import useFetch from '../../../../utils/useFetch'
import useMockFetch from '../../../../utils/useFetch/mock'

const useStyles = makeStyles({
  accordion: {
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
    width: 90
  }
})

const CreateTaskForm = ({ fetchingList, onSuccess }) => {
  const classes = useStyles()
  const {
    fetchPost,
    state: { POST: { fetching, error, data } },
    /* -------------- Mock start -------------- */
  } = useMockFetch(useFetch())
  /* -------------- Mock end -------------- */
  const [formOpen, setFormOpen] = useState(false)

  const handleOpen = () => setFormOpen(!formOpen)

  const handleSubmit = (values, { restart }) => {
    const plannedStartTime = [values.plannedTimeFrom?.hour() ?? null, values.plannedTimeFrom?.minute() ?? null]
    const plannedEndTime = [values.plannedTimeTo?.hour() ?? null, values.plannedTimeTo?.minute() ?? null]
    const startTime = [values.actualTimeFrom?.hour() ?? null, values.actualTimeFrom?.minute() ?? null]
    const endTime = [values.actualTimeTo?.hour() ?? null, values.actualTimeTo?.minute() ?? null]
    
    const { name, type } = values
    values = {
      name,
      type,
      plannedStartTime,
      plannedEndTime,
      startTime,
      endTime,
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
          onSuccess(res);
          /* -------------- Mock start -------------- */
          let taskList = localStorage.getItem('taskList')
          if (!Array.isArray(taskList)) taskList = []
          taskList.push(values)
          localStorage.setItem('taskList', JSON.stringify(taskList))
          /* -------------- Mock end -------------- */
        }
      })
  }
  console.log('fetching create task form', fetching)
  return (
    <Box width="70%" margin="auto">
      <Box marginTop={2}>
        <Button onClick={handleOpen} className={classes.button} variant="outlined" color={formOpen ? 'secondary' : 'primary'}>
          {formOpen ? 'Close' : 'Create'}
        </Button>
      </Box>
      <Accordion expanded={formOpen} className={classes.accordion}>
        <AccordionSummary className={classes.summary} />
        <AccordionDetails className={classes.details}>
          <TaskForm data={data} error={error} onSubmit={handleSubmit} submitLabel="create" fetching={fetchingList || fetching} />
        </AccordionDetails>
      </Accordion>
    </Box>
  )
}

export default CreateTaskForm