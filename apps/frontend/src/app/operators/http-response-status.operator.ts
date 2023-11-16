// const mapApiExceptionHttpErrorResponse = (
//   error: HttpErrorResponse
// ): { title: string; message: string } => {
//   const apiExceptions = {
//     NotFoundException: "We couldn't find what you were looking for",
//     DataIntegrityViolationException: 'That already exists',
//     MethodArgumentNotValidException: 'That is invalid',
//     BadCredentialsException: "Those credentials don't match our records",
//     ResponseStatusException: "We couldn't process your request",
//   };

//   const httpStatusExceptions = {
//     400: "We couldn't process your request",
//     401: 'You are not authorized to do that',
//     403: 'You are not authorized to do that',
//     404: "We couldn't find what you were looking for",
//     500: 'Something went wrong',
//   };

//   let title =
//     apiExceptions[error.error.exception as keyof typeof apiExceptions];
//   let message = error.error.message;

//   if (!title) {
//     title =
//       httpStatusExceptions[error.status as keyof typeof httpStatusExceptions] ??
//       'Unknown Api Error';
//   }

//   if (!message) {
//     message = error.message ?? 'Could not parse error message';
//   }

//   return { title, message };
// };
