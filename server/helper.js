function validationErr (error,res){
    // Check if the error is a validation error
    if (error.name === 'ValidationError') {
        // Check if the headers were already sent before sending the response
        if (res.headersSent) {
            return;
        }
        
        // Collect all validation errors
        const errorMessages = Object.values(error.errors).map(err => err.message);
  
        // Return a response with the validation error messages
        return res.status(400).json({
          success: false,
          message: 'Validation Error',
          errors: errorMessages
        });
      }

    // Handle other types of errors (e.g., server errors)
      if (!res.headersSent) {
        res.status(500).json({
          success: false,
          message: 'Internal Server Error',
        });
      }
}

module.exports = {
    "validationErr": validationErr
}