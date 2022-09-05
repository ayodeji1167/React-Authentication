import { useEffect, useRef, useState } from 'react';
import axios from '../api/axios'

import {
  faCheck,
  faTimes,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%]).{8,24}$/;

export default function Registration() {
  const userNameRef = useRef();
  const errRef = useRef();

  const [userName, setUserName] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatchPwd, setValidMatchPwd] = useState(false);
  const [matchPwdFocus, setMatchPwdFocus] = useState(false);

  const [errMssg, setErrMessage] = useState('');
  const [success, setSuccess] = useState(false);

  //this set the focus  on the username inputs when the components load
  useEffect(() => {
    userNameRef.current.focus();
  }, []);

  //This runs whenever the name input changes ... we use this to validate our name
  useEffect(() => {
    const result = USER_REGEX.test(userName);

    setValidName(result);
  }, [userName]);

  // This runs whenever the matchpwd or pwd changes...It first checks if the password is valid...lastly chechks if both are same
  useEffect(() => {
    const result = PWD_REGEX.test(password);

    setValidPassword(result);

    const isMatch = password === matchPwd;
    setValidMatchPwd(isMatch);
  }, [password, matchPwd]);

  //This clears any error message when user is currently inputing into fields
  useEffect(() => {
    setErrMessage('');
  }, [userName, password, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //If button was enabled with Javascript hack
    const v1 = USER_REGEX.test(userName);
    const v2 = PWD_REGEX.test(password);
    if (!v1 || !v2) {
      setErrMessage('Invalid Entry');
      return;
    }
    try {
      const response = await axios.post('/user/signup', JSON.stringify({ userName, password }), {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      console.log(response);
      setSuccess(true)
      // Clear input fields
    } catch (error) {
      if (!error?.response) {
        setErrMessage('No Server Response')
      }
      else if (error?.response.status === 409) {
        setErrMessage('Username Taken')
      }
      else {
        setErrMessage('Registration Failed')
      }
      errRef.current.focus()
    }

  };

  return (
    <>
      {success ? (
        <section>
          <h1>Success!</h1>
          <p>
            <a href='#'>Sign In</a>
          </p>
        </section>
      ) : (
        <section>
          <p
            ref={errRef}
            className={errMssg ? 'errmsg' : 'offscreen'}
            aria-live='assertive'
          >
            {errMssg}
          </p>
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            {/* USERNAME--------------------------------------------------- */}
            <label htmlFor='username'>
              Username:
              <span className={validName ? 'valid' : 'hide'}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validName || !userName ? 'hide' : 'invalid'}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>

            <input
              type='text'
              id='username'
      
              onChange={(e) => setUserName(e.target.value)}
              ref={userNameRef}
              required
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
              aria-invalid={validName ? 'false' : 'true'}
              aria-describedby='uidnote'
            />
            <p
              id='uidnote'
              className={
                userFocus && userName && !validName
                  ? 'instructions'
                  : 'offscreen'
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              4 to 24 characters.
              <br />
              Must begin with a letter.
              <br />
              Letters, numbers, underscores, hyphens allowed.
            </p>

            {/* PASSWORD--------------------------------------------------- */}
            <br />
            <label htmlFor='password'>
              Password:
              <span className={validPassword ? 'valid' : 'hide'}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validPassword || !password ? 'hide' : 'invalid'}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type='password'
              id='password'
              onChange={(e) => setPassword(e.target.value)}
              required
              onFocus={() => setPasswordFocus(true)}
              onBlur={() => setPasswordFocus(false)}
              aria-invalid={validPassword ? 'false' : 'true'}
              aria-describedby='pwdnote'
            />
            <p
              id='pwdnote'
              className={
                passwordFocus && !validPassword ? 'instructions' : 'offscreen'
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              8 to 24 characters <br />
              Must include uppercase and lowercase letters, a number and a
              special character. <br />
              Allowed special characters:
              <span aria-label='exclamation mark'>!</span>
              <span aria-label='at symbol'>@</span>
              <span aria-label='hashtag'>#</span>
              <span aria-label='dollar sign'>$</span>
              <span aria-label='percent'>%</span>
            </p>

            <br />
            {/* MATCH PASSWORD--------------------------------------------------- */}
            <label htmlFor='matchpassword'>
              Confirm Password:
              <span className={matchPwd && validMatchPwd ? 'valid' : 'hide'}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validMatchPwd || !matchPwd ? 'hide' : 'invalid'}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>

            <input
              type='password'
              id='matchpassword'
              onChange={(e) => setMatchPwd(e.target.value)}
              onFocus={() => setMatchPwdFocus(true)}
              onBlur={() => setMatchPwdFocus(false)}
              aria-invalid={validMatchPwd ? 'false' : 'true'}
              aria-describedby='matchpwdnote'
              required
            />
            <p
              id='matchpwdnote'
              className={
                matchPwdFocus && !validMatchPwd ? 'instructions' : 'offscreen'
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Must match the password input field
            </p>

            <button
              disabled={
                !validName || !validPassword || !validMatchPwd ? true : false
              }
            >
              Sign Up
            </button>

            <p>
              Already Registered? <br />
              <span className='line'>
                <Link to='/login'>Login</Link>
              </span>
            </p>
          </form>
        </section>
      )}
    </>
  );
}
