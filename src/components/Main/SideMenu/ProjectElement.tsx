import React from 'react';
import { Project } from '../../../types/Project.type';
import { getFirstChar } from '../../../utils/getFirstChar';

interface ProjectElementProps {
  project: Project
}

const ProjectElement = ({project}: ProjectElementProps) => {
  return (
    <li className="mb-1 py-2 flex items-center rounded-[4px] hover:bg-[#A6C5E229]">
      <a
        href=""
        className="flex items-center relative text-[#B6C2CF] rounded-[4px] leading-tight font-bold min-h-[20px] py-[6px] pl-2"
      >
        <div className="left-0 top-0 mr-3">
          <div className="rounded-[3px] h-6 w-6 overflow-hidden">
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center w-full h-full text-[16px] font-bold text-[#1D2125]">
              {getFirstChar(project.name)}
            </div>
          </div>
        </div>
        <span className="text-[14px]">
          {project.name}
        </span>
      </a>
      <button className="w-[22px] h-[22px] text-[#B6C2CF] pr-2 mt-[6px] flex items-center justify-center ml-auto rounded-[4px]">
        <i className="fa-solid fa-angle-down"></i>
      </button>
    </li>
  );
};

export default ProjectElement;
