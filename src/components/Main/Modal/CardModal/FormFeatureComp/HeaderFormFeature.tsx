import React, { useContext } from 'react';
import { FormFeatureState } from '../FormFeatureLayout';
import { FeatureContext } from '../CreateFeatureBtn';

export default function HeaderFormFeature({closeFn}: FormFeatureState) {
  const featureContext = useContext(FeatureContext);
  return (
    <div>
      <button
        onClick={() => closeFn()}
        className="absolute z-10 top-1 right-1 text-[#B6C2CF] py-1 px-2"
      >
        <i className="fa-solid fa-xmark"></i>
      </button>
      <div className="text-sm font-bold text-[#B6C2CF]">
        <h2 className="h-10 text-center leading-10">{featureContext ? featureContext.feature.name : ''}</h2>
      </div>
    </div>
  );
}
