import React from 'react';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { loadGapiInsideDOM } from 'gapi-script';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMessage, register } from '../../redux/reducers/userSlice';
import { userSelector } from '../../redux/selectors';
import { useNavigate } from 'react-router-dom';
import { notify } from '../../redux/reducers/notifySlice';

export default function AuthenSupport() {
  useEffect(() => {
    (async () => {
      await loadGapiInsideDOM();
    })();
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const clientId: string =
    '14129973311-78p5ga6l83t0i0da4g2m07hsovvekaph.apps.googleusercontent.com';

  const onSuccess = (res: any) => {
    let userRegister = {
      email: res.profileObj.email,
      password: 'pikachu123',
      fullName: res.profileObj.familyName + ' ' + res.profileObj.givenName,
      imageUrl: res.profileObj.imageUrl,
    };
    dispatch(register({ type: 'via3th', user: userRegister }));
  };

  const onFailure = (res: any) => {
    console.log('Failure! ----->', res);
  };

  const responseFacebook = (res: any) => {
    console.log(res);
  };

  const accessToken = useSelector(userSelector).loginResponse.accessToken;
  const faildLogin = useSelector(userSelector).loginFailed;

  useEffect(() => {
    if (accessToken && accessToken !== '') {
      setTimeout(() => {
        navigate('/main-app');
      }, 3000);
    }
  }, [accessToken]);

  useEffect(() => {
    if (faildLogin && faildLogin !== '') {
      dispatch(
        notify({
          type: 'error',
          message: 'Login failed! Please try again!',
        })
      );
      setTimeout(() => {
        dispatch(getMessage(''))
        dispatch(notify(null))
      }, 3000);
    }
  }, [faildLogin]);
  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        buttonText="Tiếp tục với Google"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        isSignedIn={false}
        render={(renderProps) => (
          <button
            onClick={renderProps.onClick}
            className="hover:bg-[#f9fafc] w-full flex text-center items-center h-10 rounded mb-3 shadow-[1px_1px_5px_0_rgba(0,0,0,0.2)] justify-center"
          >
            <span className="block w-[18px] h-[18px] bg-[url(https://d2k1ftgv7pobq7.cloudfront.net/meta/c/p/res/images/8215f6659adc202403198fef903a447e/sign-in-with-google.svg)]"></span>
            <p className="text-sm font-bold text-[#505f79] p-2">
              Tiếp tục với Google
            </p>
          </button>
        )}
      />
      <a
        href=""
        className="hover:bg-[#f9fafc] w-full flex text-center items-center h-10 rounded mb-3 shadow-[1px_1px_5px_0_rgba(0,0,0,0.2)] justify-center"
      >
        <span className="block w-[18px] h-[18px] bg-[url(https://d2k1ftgv7pobq7.cloudfront.net/meta/c/p/res/images/72ece804e5285ab6507e2406157cda3c/microsoft-logo.svg)]"></span>
        <p className="text-sm font-bold text-[#505f79] p-2">
          Tiếp tục với Microsoft
        </p>
      </a>
      <a
        href=""
        className="hover:bg-[#f9fafc] w-full flex text-center items-center h-10 rounded mb-3 shadow-[1px_1px_5px_0_rgba(0,0,0,0.2)] justify-center"
      >
        <span className="block w-[18px] h-[18px] bg-contain bg-[url(https://d2k1ftgv7pobq7.cloudfront.net/meta/c/p/res/images/6fc4ecf05a97cfb43cfcbb14738a5aa0/apple-logo-black.svg)]"></span>
        <p className="text-sm font-bold text-[#505f79] p-2">
          Tiếp tục với Apple
        </p>
      </a>
      <FacebookLogin
        appId="305108898614060"
        callback={responseFacebook}
        render={(renderProps) => (
          <button
            onClick={renderProps.onClick}
            className="hover:bg-[#f9fafc] w-full flex text-center items-center h-10 rounded mb-3 shadow-[1px_1px_5px_0_rgba(0,0,0,0.2)] justify-center"
          >
            <span className="block w-[18px] h-[18px] bg-[url(https://d2k1ftgv7pobq7.cloudfront.net/meta/c/p/res/images/267584bf90783090ede8f337d9baf909/slack-logo.svg)]"></span>
            <p className="text-sm font-bold text-[#505f79] p-2">
              Tiếp tục với Facebook
            </p>
          </button>
        )}
      />
      <hr className="mt-[25px] mb-[14px] h-[1px] border-t-[1px] border-t-[hsl(0,0%,80%)]" />
    </div>
  );
}
