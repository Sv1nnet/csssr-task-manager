import { CircularProgress, makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  loader: {
    display: 'flex',
    position: 'fixed',
    left: 0,
    top: 0,
    zIndex: 10001,
    height: '100%',
    width: '100%',
  },
  loaderBg: {
    position: 'absolute',
    left: 0,
    top: 0,
    background: 'rgba(255, 255, 255, .4)',
    height: '100%',
    width: '100%',
  },
  loaderCircle: {
    margin: 'auto',
  }
})

const Loader = () => {
  const { loader, loaderBg, loaderCircle } = useStyles()
  return (
    <div className={loader}>
      <div className={loaderBg}></div>
      <CircularProgress className={loaderCircle} />
    </div>
  )
}

export default Loader
