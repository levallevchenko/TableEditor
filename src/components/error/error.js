import React from 'react';
import PropTypes from 'prop-types';

function Error ({errorData}) {

  return (
    <div className="error">
      <p className="error__data">{errorData}</p>
    </div>
  );
}

Error.propTypes = {
  errorData: PropTypes.string.isRequired,
};

export default Error;
