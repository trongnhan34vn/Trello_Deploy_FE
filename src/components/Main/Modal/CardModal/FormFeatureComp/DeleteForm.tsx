import React, { SetStateAction, useContext } from 'react';
import { Label } from '../../../../../types/Label.type';
import { useDispatch } from 'react-redux';
import * as labelSlice from '../../../../../redux/reducers/labelSlice';
import { FeatureContext } from '../CreateFeatureBtn';

interface DeleteForm {
  setAddLabel: React.Dispatch<SetStateAction<string>>;
  editLabel: Label | null;
}

const DeleteForm = ({ setAddLabel, editLabel }: DeleteForm) => {
  const dispatch = useDispatch();
  const featureContext = useContext(FeatureContext);

  return (
    <div className="flex items-center">
      <button
        onClick={() => setAddLabel('edit')}
        className="absolute top-2 text-[#9FADBC] px-2"
      >
        <i className="fa-solid text-[14px] fa-chevron-left "></i>
      </button>
      <div>
        <div className="text-[14px] text-[#B6C2CF] mb-2">
          Việc này sẽ xóa nhãn này khỏi tất cả các thẻ. Không có hoàn tác.
        </div>
        <button
          onClick={() => {
            if(!editLabel) return
            dispatch(labelSlice.remove(editLabel.id));
            featureContext?.closeFn();
          }}
          className="w-full text-[#1D2125] bg-[#F87462] px-[12px] py-[6px] text-[14px] opacity-80 hover:opacity-100 rounded-[3px] transition-all ease-in duration-100"
        >
          Xoá
        </button>
      </div>
    </div>
  );
};

export default DeleteForm;
