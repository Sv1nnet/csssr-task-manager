import { Card, makeStyles, IconButton, FormControlLabel, Switch } from '@material-ui/core'
import { Edit as EditIcon, Close as CloseIcon } from '@material-ui/icons'
import { useRef, useMemo, useState, useEffect, useCallback } from 'react'
import { TaskForm } from '..'
import { TASK } from '@constants/url'
import useFetch from '@utils/useFetch'
import useMockFetch from '@utils/useFetch/mock'

const useStyles = makeStyles({
  card: {
    position: 'relative',
    marginTop: 15,
    paddingTop: 10,
  },
  editButton: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  doneButton: {
    position: 'absolute',
    top: 0,
    left: 15,
  }
})

const Task = ({ task, onSuccess }) => {

  const classes = useStyles()
  const [isEdit, setIsEdit] = useState(false)
  const {
    fetchPost,
    state: { POST: { fetching, error } }
  } = useMockFetch(useFetch())
  const $task = useRef()
  const [done, setDone] = useState(task.done)

  const handleEditClick = useCallback(() => setIsEdit((_isEdit) => {
    const newIsEdit = !_isEdit
    if (!newIsEdit) {
      $task.current.$form.reset()
      setDone(task.done)
    }
    return newIsEdit
  }), [task.done])

  const buttons = useMemo(() => [
    {
      type: 'submit',
      label: 'Save',
      loadingState: (loading, defaultLoader) => loading ? defaultLoader : 'Save'
    },
    {
      color: 'secondary',
      label: 'Cancel',
      disabled: loading => loading,
      onClick: handleEditClick
    },
  ], [handleEditClick])

  const handleSubmit = (values) => {
    const plannedStartTime = values.plannedStartTime ? [values.plannedStartTime.hour(), values.plannedStartTime.minute()] : null
    const plannedEndTime = values.plannedEndTime ? [values.plannedEndTime.hour(), values.plannedEndTime.minute()] : null
    const startTime = values.startTime ? [values.startTime.hour(), values.startTime.minute()] : null
    const endTime = values.endTime ? [values.endTime.hour(), values.endTime.minute()] : null

    const { id, name, type, user, done, description } = values
    values = {
      id,
      name,
      type,
      user,
      description,
      plannedStartTime,
      plannedEndTime,
      startTime,
      endTime,
      done,
    }

    return fetchPost(TASK, { body: JSON.stringify({ ...values, done }) }, {
      /* -------------- Mock start -------------- */
      type: 'success',
      latency: 1000,
      response: {
        data: values.name === 'invalid_name' ? null : values,
        error: values.name === 'invalid_name' ? { message: 'Invalid name', code: 409 } : null,
      }
      /* -------------- Mock end -------------- */
    })
      .then((res) => {
        if (!res.error) {
          /* -------------- Mock start -------------- */
          const taskList = JSON.parse(`${localStorage.getItem('taskList')}`)
          const taskIndex = taskList.findIndex(task => task.id === values.id)
          taskList[taskIndex] = values
          localStorage.setItem('taskList', JSON.stringify(taskList))
          /* -------------- Mock end -------------- */
          if (isEdit) setIsEdit(false)
          onSuccess(res)
        }
      })
  }

  const handleDone = () => {
    setDone(!done)
    if (!isEdit) handleSubmit({ ...$task.current.$form.getState().values, done: !done })
  }

  useEffect(() => {
    if (error && !isEdit && !fetching && done !== task.done) setDone(task.done)
  }, [error, task, done, fetching, isEdit])

  return (
    <Card className={classes.card}>
      {<FormControlLabel
        className={classes.doneButton}
        control={
          <Switch
            checked={done}
            onChange={handleDone}
            disabled={fetching}
            name="done"
            color="primary"
          />
        }
        label="Done"
      />}
      {<IconButton className={classes.editButton} onClick={handleEditClick}>
        {!isEdit
          ? <EditIcon />
          : <CloseIcon />}
      </IconButton>}
      <TaskForm fetching={fetching} error={error} ref={$task} isEdit={isEdit} task={task} buttons={buttons} onSubmit={handleSubmit} />
    </Card>
  )
}

export default Task