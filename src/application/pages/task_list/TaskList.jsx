import { Box, Container, makeStyles } from '@material-ui/core'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { TASK_LIST } from '@constants/url'
import useFetch from '@utils/useFetch'
import useMockFetch from '@utils/useFetch/mock'
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

/* -------------- Mock start -------------- */
const list = []

const raw = localStorage.getItem('taskList')

if (!raw) localStorage.setItem('taskList', JSON.stringify(list))

const parsed = raw ? JSON.parse(raw) : list
/* -------------- Mock end -------------- */

const taskTimeToDayjs = (task) => {
  const currentDate = new Date()
  return {
    plannedStartTime: task.plannedStartTime ? dayjs(new Date(currentDate.setHours(task.plannedStartTime[0], task.plannedStartTime[1]))) : null,
    plannedEndTime: task.plannedEndTime ? dayjs(new Date(currentDate.setHours(task.plannedEndTime[0], task.plannedEndTime[1]))) : null,
    startTime: task.startTime ? dayjs(new Date(currentDate.setHours(task.startTime[0], task.startTime[1]))) : null,
    endTime: task.endTime ? dayjs(new Date(currentDate.setHours(task.endTime[0], task.endTime[1]))) : null,
  }
}

const TaskList = () => {
  const classes = useStyles()
  const {
    fetchPost,
    state: { POST: { fetching, data, error } }
  } = useMockFetch(useFetch())
  const [list, setList] = useState([])

  const fetchList = (filter = {}) => {
    /* -------------- Mock start -------------- */
    const filtered = Object
      .entries(filter)
      .reduce((acc, [k, v]) => {
        if (typeof v === 'string') acc = acc.filter(task => task[k].includes(v))
        else if (typeof v === 'boolean') acc = acc.filter(task => task[k] === v)
        else if (v instanceof dayjs) {
          v = [v.hour(), v.minute()].toString()
          acc = acc.filter(task => `${task[k]}` === v)
        }
        return acc
      }, [...JSON.parse(localStorage.getItem('taskList') || parsed)])
    /* -------------- Mock end -------------- */

    return fetchPost(TASK_LIST, filter, {
      /* -------------- Mock start -------------- */
      type: 'success',
      latency: 1000,
      response: {
        data: filtered,
      }
      /* -------------- Mock end -------------- */
    })
  }

  const handleTaskUpdated = ({ data: taskData }) => setList((prevList) => {
      const newList = [ ...prevList ]
      const taskIndex = newList.findIndex(_task => _task.id === taskData.id)
      const task = {
        ...taskData,
        ...taskTimeToDayjs(taskData),
      }
      newList[taskIndex] = task
      return newList
    })

  useEffect(() => {
    setList(_list => data
      ? data.map((task) => {
        const { plannedStartTime, plannedEndTime, startTime, endTime, ...rest } = task
        return {
          ...taskTimeToDayjs(task),
          ...rest,
        }
      })
      : _list)
  }, [data])

  useEffect(() => {
    fetchPost(TASK_LIST, {}, {
      /* -------------- Mock start -------------- */
      type: 'success',
      latency: 1000,
      response: {
        data: parsed,
      }
      /* -------------- Mock end -------------- */
    })
  }, [])

  return (
    <Container className={classes.taskListContainer}>
      <Box display="flex">
        <Filter onChange={fetchList} />
        <Box width="100%" className={classes.innerTaskListContainer}>
          <CreateTaskForm onSuccess={() => fetchList()} />
          <List fetching={fetching} error={error} list={list} onTaskUpdated={handleTaskUpdated} />
        </Box>
      </Box>
    </Container>
  )
}

export default TaskList