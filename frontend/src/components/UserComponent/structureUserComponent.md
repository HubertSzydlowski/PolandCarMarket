| Filename                       | Description                                                      | Used Endpoints                                 |
| ------------------------------ | ---------------------------------------------------------------- | ---------------------------------------------- |
| `UserList.js`                  | Displays a list of all users.                                    | `getAllUsers()`                                |
| `UserDetails.js`               | Details of a single user.                                        | `getUserById(id)`                              |
| `UserCreateForm.js`            | User registration form (for admin or general registration).      | `createUser(userDto)`                          |
| `UserEditForm.js`              | Form for editing user data.                                      | `updateUser(id, userDto)`                      |
| `UserDeleteButton.js`          | Button/service for deleting a user.                              | `deleteUser(id)`                               |
| `LoginForm.js`                 | Login form.                                                      | `login(userDto)`                               |
| `LogoutButton.js`              | Button to log out the user.                                      | `logout()`                                     |
| `TokenRefresher.js`            | Technical component for token refreshing (can be a hook or HOC). | `refreshToken(token)`                          |
| `UserFavorites.js`             | List of user's favorite advertisements.                          | `getFavorites(userId)`                         |
| `AddToFavoritesButton.js`      | Button to add an advertisement to favorites.                     | `addToFavorites(userId, advertisementId)`      |
| `RemoveFromFavoritesButton.js` | Button to remove an advertisement from favorites.                | `removeFromFavorites(userId, advertisementId)` |
