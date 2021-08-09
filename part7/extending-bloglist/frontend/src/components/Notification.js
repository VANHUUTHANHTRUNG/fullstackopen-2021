import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import { Alert } from '@material-ui/lab'

const Notification = () => {
  const { message, flag } = useSelector((state) => state.notification)

  if (message === null) {
    return null
  }

  return (
    <Alert data-testid={`${flag}-message`} severity={flag}>
      {message}
    </Alert>
  )
}

Notification.propTypes = {
  message: PropTypes.string,
  flag: PropTypes.string,
}

Notification.defaultProps = {
  // remove .isRequired before set null as default
  message: null,
  flag: null,
}

export default Notification
