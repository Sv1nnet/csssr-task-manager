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

const FormBody = ({ className, submitLabel, children, buttons, loading }) => {
  const classes = useStyles()

  return (
    <Box display="flex" justifyContent="center" flexWrap="wrap" padding={2} className={className}>
      {children}
      {buttons
        ? buttons.map(button => (
          <Button variant={button.variant || 'outlined'} color={button.color || 'primary'} type={button.type || 'button'} className={cn(classes.button, classes.multipleButtons)}>
            {loading ? <CircularProgress size={24} /> : button.label}
          </Button>
        ))
        : (
          <Button variant="outlined" color="primary" type="submit" className={classes.button}>
            {loading ? <CircularProgress size={24} /> : submitLabel}
          </Button>
        )
      }
    </Box>
  )
}
FormBody.propTypes = {
  className: PropTypes.string,
  submitLabel: PropTypes.string.isRequired,
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
