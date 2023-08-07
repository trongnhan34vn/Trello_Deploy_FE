import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import { validateEmail } from '../../../utils/validate';

export default function Header() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  return (
    <header className="w-full text-neutral-500 shadow-lg hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-600">
      {/* Main navigation container */}
      <Navbar />
      <div className="min-h-screen bg-gradient-to-r from-violet-500 to-fuchsia-500 w-full">
        <div className="w-[1200px] mx-auto flex gap-7 py-14 px-10">
          <div className="">
            <h1 className="leading-tight font-bold text-5xl mb-4 text-white">
              Trello tập hợp tất cả nhiệm vụ, thành viên nhóm và công cụ của bạn
              lại với nhau
            </h1>
            <p className="text-xl text-white mb-10">
              Duy trì mọi thứ ở cùng một nơi — dù cho nhóm của bạn không ở cùng
              nhau.
            </p>
            <form action="">
              <input
                required
                onChange={handleChange}
                type="email"
                placeholder="Email"
                className="mb-4 w-3/4 block px-4 outline-none py-4 rounded-sm"
              />
              <button

                onClick={() => {
                  if(validateEmail(email)) {
                    navigate('/register', { state: { email: email } });
                  }
                }}
                type="submit"
                className="bg-[#3b71ca] inline-block rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              >
                Đăng kí - Hoàn toàn miễn phí
              </button>
            </form>
          </div>
          <div className="w-[58,33%]">
            <img
              className="w-full h-auto"
              src="https://images.ctfassets.net/rz1oowkt5gyp/75rDABL8fyMtNLlUAtBxrg/c5e145977a86c41c47e17c69410c64f7/TrelloUICollage_4x.png?w=2280&fm=webp"
              alt=""
            />
          </div>
        </div>
      </div>
    </header>
  );
}
