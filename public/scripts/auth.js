function isAuthenticated() {
    if (!getToken()) {
      window.location.href = '/login.html';
    } else {
      return true;
    }
  }
  
  function getToken() {
    return localStorage.getItem('@foodApp:token');
  }
  
  function signin(token) {
    localStorage.setItem('@foodApp:token', token);
  
    window.location.href = '/';
  }
  
  function signout() {
    localStorage.removeItem('@foodApp:token');
  
    window.location.href = '/login.html';
  }
  
  export default { isAuthenticated, getToken, signin, signout }; 