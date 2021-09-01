import { Box, Button, CircularProgress, makeStyles } from '@material-ui/core'
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  button: {
    '& .MuiButton-label': {
      minWidth: 60,
    }
  }
})

const FormBody = ({ className, submitLabel, children, loading }) => {
  const { button } = useStyles()

  return (
    <Box display="flex" justifyContent="center" flexWrap="wrap" padding={2} className={className}>
      {children}
      <Button variant="outlined" color="primary" type="submit" className={button}>
          {loading ? <CircularProgress size={24} /> : submitLabel}
      </Button>
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
