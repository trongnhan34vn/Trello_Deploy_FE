import React, {
  ChangeEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import AuthenSupport from './AuthenSupport';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { useDispatch, useSelector } from 'react-redux';
import {
  findAll,
  getResult,
  login,
  register,
} from '../../redux/reducers/userSlice';
import { LoadingContext } from '../../layouts/AuthenLayout/AuthenLayout';
import { validateEmail } from '../../utils/validate';
import { userSelector } from '../../redux/selectors';
import { notify } from '../../redux/reducers/notifySlice';

export default function Form() {
  const [inputValue, setInputValue] = useState({
    email: '',
    password: '',
  });
  const users = useSelector(userSelector).users;
  const loadingContext = useContext(LoadingContext);
  const [openInputPassword, setOpenInputPassword] = useState(false);
  const form = useRef<HTMLFormElement>(null);
  const location = useLocation();
  const dispatch = useDispatch();
  const isLogin = location.pathname === '/login';
  const titleElement = isLogin ? 'Đăng nhập vào Trello' : 'Đăng ký tài khoản';
  const policyElement = isLogin ? (
    <></>
  ) : (
    <p className="text-[14px] text-[#5E6C84] mb-5">
      Bằng việc nhấp vào “Tiếp tục” bên dưới, bạn đồng ý với{' '}
      <a className="underline text-[#0052CC]" href="">
        Điều khoản dịch vụ Atlassian Cloud
      </a>{' '}
      của Atlassian và chấp nhận{' '}
      <a className="underline text-[#0052CC]" href="">
        Chính sách bảo mật
      </a>{' '}
      .
    </p>
  );

  const checkExist = (email: string) => {
    return users.find((user) => user.email === email);
  };

  useEffect(() => {
    if (location.pathname === '/register') {
      dispatch(findAll());
    }
  }, [location]);

  const buttonElement = () => {
    if (!isLogin) {
      if (!validateEmail(inputValue.email)) {
        return {
          status: false,
          css: 'cursor-not-allowed bg-[#5e6c84]',
          disabled: true,
        };
      }
    }
    return {
      status: true,
      css: 'cursor-pointer bg-[#5AAC44]',
      disabled: false,
    };
  };

  const linkElement = () => {
    if (!isLogin) {
      return (
        <div className="flex justify-around my-[14px]">
          <Link
            to={'/login'}
            className="hover:underline text-sm text-[#0052cc]"
          >
            Bạn đã có tài khoản? Đăng nhập
          </Link>
        </div>
      );
    }
    return (
      <div className="flex justify-around my-[14px]">
        <a href="" className="hover:underline text-sm text-[#0052cc]">
          Không thể đăng nhập
        </a>
        <Link
          to={'/register'}
          className="hover:underline text-sm text-[#0052cc]"
        >
          Đăng kí tài khoản
        </Link>
      </div>
    );
  };

  const [errorEmailMessage, setErrorEmailMessage] = useState('');
  const [errorPassMessage, setErrorPassMessage] = useState('');
  const handleSubmit = (e: any) => {
    if (inputValue.email.trim() === '') {
      setErrorEmailMessage('Please enter your email!');
    }
    if (inputValue.password.trim() === '') {
      setErrorPassMessage('Please enter your password!');
    }

    if (!loadingContext) return;
    e.preventDefault();
    if (validateEmail(inputValue.email)) {
      setOpenInputPassword(true);
      if (inputValue.password.trim() !== '') {
        let userLogin = {
          email: inputValue.email,
          password: inputValue.password,
        };
        dispatch(login(userLogin));
        loadingContext.setActive();
        setTimeout(() => {
          dispatch(
            getResult({
              accessToken: null,
              user: null,
            })
          );
          loadingContext.setInActive();
        }, 3000);
      }
    }
  };

  const [onBoard, setOnBoard] = useState(false);

  useEffect(() => {
    if (inputValue.email.trim() !== '') setOnBoard(true);
  }, [inputValue]);

  useEffect(() => {
    if (onBoard) {
      if (inputValue.email === '') {
        setErrorEmailMessage('Please enter your email!');
      } else if (!validateEmail(inputValue.email)) {
        setErrorEmailMessage('Invalid Email! Please enter valid email!');
      } else {
        setErrorEmailMessage('');
      }
    }
  }, [inputValue]);

  useEffect(() => {
    if (location.state) {
      setInputValue({ ...inputValue, email: location.state.email });
    }
  }, [location.state]);

  const [onPass, setOnPass] = useState(false);

  useEffect(() => {
    if (inputValue.password.trim() !== '') setOnPass(true);
  }, [inputValue]);

  useEffect(() => {
    if (onPass) {
      if (inputValue.password.trim() === '') {
        setErrorPassMessage('Please enter your password!');
      } else {
        setErrorPassMessage('');
      }
    }
  }, [inputValue.password]);

  const navigate = useNavigate();
  const sendEmail = (e: any) => {
    e.preventDefault();
    if (!loadingContext) return;
    loadingContext.setActive();
    const currentForm = form.current;

    // this prevents sending emails if there is no form.
    // in case currentForm cannot possibly ever be null,
    // you could alert the user or throw an Error, here
    if (currentForm == null) return;

    if (!isLogin) {
      if (buttonElement().status && validateEmail(inputValue.email)) {
        if (!checkExist(inputValue.email)) {
          // the compiler is smart enough to know that currentForm here is of type HTMLFormElement
          emailjs
            .sendForm(
              'service_4fzu8mg',
              'template_cechnnm',
              currentForm,
              'aCHMsDgW7Yru7QbGd'
            )
            .then(
              (result) => {
                console.log(result);
                if (result.text === 'OK') {
                  let userRegis = {
                    email: inputValue.email,
                    password: 'pikachu123',
                    fullName: '',
                    imageUrl:
                      'https://firebasestorage.googleapis.com/v0/b/md1-test-84536.appspot.com/o/images%2Fpngwing.com%20(1).png?alt=media&token=4cdad30c-f4d7-4ab0-897f-95cc8649edcf',
                  };
                  dispatch(
                    register({
                      type: 'normal',
                      user: userRegis,
                    })
                  );
                  setTimeout(() => {
                    navigate('/email-check');
                    loadingContext.setInActive();
                  }, 3000);
                }
              },
              (error) => {
                console.log('error ----> ', error.text);
              }
            );
        } else {
          setTimeout(() => {
            dispatch(
              notify({
                type: 'error',
                message: 'This email has already existed! Please try again!',
              })
            );
            loadingContext.setInActive();
          }, 1000);
        }
      }
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let key = e.target.name;
    let value = e.target.value;
    setInputValue({ ...inputValue, [key]: value });
  };

  return (
    <div className="rounded-[3px] px-10 py-[25px] w-[400px] max-w-[400px] mx-auto shadow-lg">
      <h1 className="font-bold text-center mt-2 mb-6 text-[#5e6c84]">
        {titleElement}
      </h1>
      <form ref={form} onSubmit={sendEmail} action="">
        <input
          onChange={handleChange}
          name="email"
          value={inputValue.email}
          className="h-10 w-full outline-none focus:border-[#4c9aff] text-sm p-[7px] border-[#dfe1e6] border-[2px] rounded"
          type="text"
          placeholder="Email"
        />
        <div className="text-[12px] w-full mb-5 text-red-500">
          {errorEmailMessage}
        </div>
        {isLogin ? (
          <div
            className={`${
              openInputPassword
                ? 'h-10 mb-5 w-full'
                : 'opacity-0 h-0 mb-0 p-0 border-none w-0'
            } transition-all ease-in duration-200 outline-none relative top-0 focus:border-[#4c9aff] text-sm border-[#dfe1e6] rounded`}
          >
            <input
              onChange={handleChange}
              name="password"
              value={inputValue.password}
              className={`${
                openInputPassword
                  ? 'h-10 p-[7px] border-[2px] w-full'
                  : 'opacity-0 h-0 mb-0 p-0 border-none w-0'
              } transition-all ease-in duration-200 outline-none relative top-0 focus:border-[#4c9aff] text-sm border-[#dfe1e6] rounded`}
              type="password"
              placeholder="Password"
            />
            <div className="text-[12px] w-full text-red-500">
              {errorPassMessage}
            </div>
          </div>
        ) : (
          <></>
        )}

        {policyElement}
        {isLogin ? (
          <button
            onClick={handleSubmit}
            disabled={buttonElement().disabled}
            type="submit"
            className={`cursor w-full ${
              buttonElement().css
            } inline-block rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]`}
          >
            Tiếp tục
          </button>
        ) : (
          <button
            disabled={buttonElement().disabled}
            type="submit"
            className={`cursor w-full ${
              buttonElement().css
            } inline-block rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]`}
          >
            Tiếp tục
          </button>
        )}
      </form>

      <div
        className={`${
          buttonElement().disabled || isLogin
            ? 'opacity-100 z-10'
            : 'opacity-0 -z-50 hidden'
        } transition-all ease-in-out duration-200`}
      >
        <div>
          <p className="text-xs text-center text-[#5e6c84] my-4">HOẶC</p>
        </div>
        <AuthenSupport />
        {linkElement()}
      </div>
    </div>
  );
}
