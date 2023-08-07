import React, { useContext } from 'react';
import FormAddMember from './FormAddMember';
import FormTask from './FormWork';
import { FeatureContext } from '../CreateFeatureBtn';
import FormDate from './FormDate';
import FormTaskMember from '../CardModalComp/FormTaskMember';
import FormAddLabel from './AddLabel';

export default function FormFeatureContent() {
  const featureContext = useContext(FeatureContext);
  const formFeatureElement = () => {
    if(!featureContext) return;
    
    if (featureContext.feature.code === 'TV') return <FormAddMember />
    if (featureContext.feature.code === 'VCL') return <FormTask />
    if (featureContext.feature.code === 'N') return <FormDate />
    if (featureContext.feature.code === 'TS') return <FormTaskMember />
    if (featureContext.feature.code === 'Label') return <FormAddLabel />
  }
  return (
    <div className="min-h-fit scrollable-div overflow-y-scroll justify-start flex flex-col p-3">
      {formFeatureElement()}
      {/* <FormAddMember /> */}
    </div>
  );
}
