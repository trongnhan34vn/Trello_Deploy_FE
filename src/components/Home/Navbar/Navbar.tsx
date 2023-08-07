import React from 'react';
import { logoElement } from '../../../assets/svg/logo';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav
      className="mx-auto relative overflow-hidden flex flex-nowrap items-center justify-between bg-[#FBFBFB] py-2 lg:flex-wrap lg:py-4"
      data-te-navbar-ref=""
    >
      <div className="flex flex-wrap items-center justify-between px-3">
        <div className="ml-2">
          <a
            className="text-xl text-neutral-800 dark:text-neutral-200"
            href="#"
          >
            {logoElement()}
          </a>
        </div>
        {/* Hamburger button for mobile view */}
        <button
          className="block border-0 bg-transparent px-2 text-neutral-500 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 lg:hidden"
          type="button"
          data-te-collapse-init=""
          data-te-target="#navbarSupportedContent3"
          aria-controls="navbarSupportedContent3"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          {/* Hamburger icon */}
          <span className="[&>svg]:w-7">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-7 w-7"
            >
              <path
                fillRule="evenodd"
                d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </button>
        {/* Collapsible navbar container */}
        <div
          className="!visible mt-2 hidden flex-grow basis-[100%] items-center lg:mt-0 lg:!flex lg:basis-auto"
          id="navbarSupportedContent3"
          data-te-collapse-item=""
        >
          {/* Left links */}
          <div
            className="list-style-none mr-auto flex flex-col pl-0 lg:mt-1 lg:flex-row"
            data-te-navbar-nav-ref=""
          >
            {/* Home link */}
            <div
              className="my-4 pl-2 lg:my-0 lg:pl-2 lg:pr-1"
              data-te-nav-item-ref=""
            >
              <a
                className="active p-4 disabled:text-black/30 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
                aria-current="page"
                href="#"
                data-te-nav-link-ref=""
              >
                Tính năng
                <i className="ti-angle-up"></i>
              </a>
            </div>
            {/* Features link */}
            <div
              className="mb-4 pl-2 lg:mb-0 lg:pl-0 lg:pr-1"
              data-te-nav-item-ref=""
            >
              <a
                className="p-4 text-neutral-500 transition duration-200 hover:text-neutral-700 hover:ease-in-out focus:text-neutral-700 disabled:text-black/30 motion-reduce:transition-none dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
                href="#"
                data-te-nav-link-ref=""
              >
                Giải pháp
              </a>
            </div>
            {/* Pricing link */}
            <div
              className="mb-4 pl-2 lg:mb-0 lg:pl-0 lg:pr-1"
              data-te-nav-item-ref=""
            >
              <a
                className="p-4 text-neutral-500 transition duration-200 hover:text-neutral-700 hover:ease-in-out focus:text-neutral-700 disabled:text-black/30 motion-reduce:transition-none dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
                href="#"
                data-te-nav-link-ref=""
              >
                Gói
              </a>
            </div>
            {/* Disabled link */}
            <div
              className="mb-4 pl-2 lg:mb-0 lg:pl-0 lg:pr-1"
              data-te-nav-link-ref=""
            >
              <a
                href="#"
                className="p-4 text-neutral-500 transition duration-200 hover:text-neutral-700 hover:ease-in-out focus:text-neutral-700 disabled:text-black/30 motion-reduce:transition-none dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
              >
                Biểu phí
              </a>
            </div>
            <div
              className="mb-4 pl-2 lg:mb-0 lg:pl-0 lg:pr-1"
              data-te-nav-link-ref=""
            >
              <a
                href="#"
                className="p-4 text-neutral-500 transition duration-200 hover:text-neutral-700 hover:ease-in-out focus:text-neutral-700 disabled:text-black/30 motion-reduce:transition-none dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
                data-te-nav-link-ref=""
              >
                Tài liệu
              </a>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Link
          to={'/login'}
          className="text-black text-xl font-semibold py-8 px-6"
        >
          Đăng nhập
        </Link>
        <Link
          to={'/register'}
          className="text-white text-xl font-semibold py-8 px-6 bg-[#0065FF] transition-all duration-200 ease-in-out hover:bg-[#0747A6] text"
        >
          Đăng kí Trello miễn phí
        </Link>
      </div>
    </nav>
  );
}
