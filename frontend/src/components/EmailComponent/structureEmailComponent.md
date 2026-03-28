| File Name                     | Description                                                      | Used Endpoints                   |
| ----------------------------- | ---------------------------------------------------------------- | -------------------------------- |
| `EmailVerificationForm.js`    | Component for verifying the email address after clicking a link. | `verifyEmail(token)`             |
| `ResetPasswordRequestForm.js` | Form to enter the email address and request a password reset.    | `resetPasswordRequest(emailDto)` |
| `ResetPasswordForm.js`        | Form to set a new password based on the token from the email.    | `resetPassword(emailDto)`        |
