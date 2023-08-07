import React from 'react';
import { Project } from '../../../types/Project.type';
import ProjectElement from './ProjectElement';


interface ProjectProps {
  projects: Project[];
  openModal: () => void
}

const Projects = ({projects, openModal}: ProjectProps) => {

  const projectElement = projects.map(project => {
    return (
      <ProjectElement key={project.id} project={project} />
    )
  })

  return (
    <ul className="task-manage pt-3 pb-10">
      <div className="insert-task flex">
        <div className="items-baseline h-8 flex justify-start pl-2">
          <p className="text-xs font-semibold leading-4 text-[#B6C2CF] flex-1 py-2">
            Các Không gian làm việc
          </p>
        </div>
        <button
          onClick={() => openModal()}
          className="w-[22px] text-[#B6C2CF] hover:bg-[#A6C5E229] h-[22px] mt-[6px] flex items-center justify-center ml-auto rounded-[4px]"
        >
          <i className="fa-solid fa-plus"></i>
        </button>
      </div>
      {projectElement}
    </ul>
  );
};

export default Projects;
