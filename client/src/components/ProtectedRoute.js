// This component will accept a "user" prop.
// It is similar to the 'Loading.js' component.

/** Returns loading animation if loading is true (from App.js) and user is still being loaded.
 * Returns child route (in App.js) if loading is done and user is logged in.
 * Protected route redirects to /login, rather than child route, if user is not logged in. */