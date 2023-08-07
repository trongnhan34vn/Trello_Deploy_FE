import { Popover, Transition } from '@headlessui/react';
import { createContext, Fragment } from 'react';
import { ModalFeatureProps } from './CardModalComp/ModalFeature';
import FormFeature from './FormFeatureLayout';
import { Task } from '../../../../types/Task.type';

interface FeatureBtn {
  feature: ModalFeatureProps,
  closeFn: () => void
  task?: Task
}

export const FeatureContext = createContext<FeatureBtn | null>(null);

export default function CreateFeatureBtn(props: {
  feature: ModalFeatureProps;
}) {
  return (
    <Popover>
      <Popover.Button className="w-full mb-2 outline-none">
        <div className="hover:bg-[#A6C5E229] z-0 w-full bg-[#A1BDD914] rounded-[3px] h-8  max-w-[300px] overflow-hidden py-[6px] px-3 text-left text-sm text-[#9FADBC] ">
          <i className={`${props.feature.icon} w-[16px] mr-[6px]`}></i>
          <p className=" inline-block ">{props.feature.name}</p>
        </div>
      </Popover.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Popover.Panel className="absolute z-50">
          {({ close }) => {
            return (
              <FeatureContext.Provider value={{feature: props.feature, closeFn: close}}>
                <FormFeature closeFn={close} />;
              </FeatureContext.Provider>
            );
          }}
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
