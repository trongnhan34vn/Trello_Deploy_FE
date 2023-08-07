import React, { useContext } from 'react';
import { FeatureContext } from './CreateFeatureBtn';
import FormFeatureContent from './FormFeatureComp/FormFeatureContent';
import HeaderFormFeature from './FormFeatureComp/HeaderFormFeature';

export interface FormFeatureState {
  closeFn : () => void;
}

export default function FormFeatureLayout({closeFn}: FormFeatureState) {
  const featureContext = useContext(FeatureContext);
  const feature = featureContext ? featureContext.feature : null;
  const isLabel = () => {
    if(!feature) return false 
    if(feature.code === 'Label') return true;
    return false
  }
    return (
    <div
      className={`${isLabel() ? 'top-[-700%]' : 'top-0'} w-[304px] absolute z-[999] transition-all ease-in-out duration-200 rounded-[8px] min-h-fit bg-[#282E33] left-0`}
    >
      <HeaderFormFeature closeFn={closeFn} />
      <FormFeatureContent />
    </div>
  );
}
