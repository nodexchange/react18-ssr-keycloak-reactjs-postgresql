import PropTypes from 'prop-types';
import styles from './Login.module';

const Login = props => {
  return (
    <div className={styles.login}>
      <h1>Login</h1>
      <form action="/auth" method="post">
        <label htmlFor="username">
          <i className="fas fa-user"></i>
        </label>
        <input
          type="text"
          name="username"
          placeholder="Username"
          id="username"
          required
        />
        <label htmlFor="password">
          <i className="fas fa-lock"></i>
        </label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          id="password"
          required
        />
        <input type="submit" value="Login" />
      </form>
    </div>
  );
};

Login.propTypes = {};

export default Login;
