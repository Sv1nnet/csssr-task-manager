import { Box, Button, CircularProgress, makeStyles } from '@material-ui/core'
import PropTypes from 'prop-types';
import cn from 'classnames'

const useStyles = makeStyles({
  button: {
    '& .MuiButton-label': {
      minWidth: 60,
    }
  },
  multipleButtons: {
    '&:not(:last-of-type)': {
      marginRight: 15,
    },
  },
})

const FormBody = ({ className, hideButtons, submitLabel, children, buttons, loading }) => {
  const classes = useStyles()

  const renderButtons = () => buttons
    ? buttons.map(button => {
      const disabled = typeof button.disabled === 'function' ? button.disabled(loading) : button.disabled
      return (
        <Button key={button.label} disabled={disabled} variant={button.variant || 'outlined'} color={button.color || 'primary'} type={button.type || 'button'} className={cn(classes.button, classes.multipleButtons)} onClick={!loading ? button.onClick : undefined}>
          {button.loadingState ? button.loadingState(loading, <CircularProgress size={24} />) : button.label}
        </Button>
      )
    })
    : (
      <Button variant="outlined" color="primary" type="submit" className={classes.button}>
        {loading ? <CircularProgress size={24} /> : submitLabel}
      </Button>
    )

  return (
    <Box display="flex" justifyContent="center" flexWrap="wrap" padding={2} className={className}>
      {children}
      {hideButtons ? null : renderButtons()}
    </Box>
  )
}
FormBody.propTypes = {
  className: PropTypes.string,
  submitLabel: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
  loading: PropTypes.bool,
};

FormBody.defaultProps = {
  className: '',
}

export default FormBody;
