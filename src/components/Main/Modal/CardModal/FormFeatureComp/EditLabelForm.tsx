import React, { useContext, useEffect, useState } from 'react';
import { Label } from '../../../../../types/Label.type';
import { CardDB } from '../../../../../types/Card.type';
import { useDispatch, useSelector } from 'react-redux';
import * as labelSlice from '../../../../../redux/reducers/labelSlice';
import { FeatureContext } from '../CreateFeatureBtn';
import { labelSelector } from '../../../../../redux/selectors';
import { CardLabelForm } from '../../../../../types/CardLabel.type';
import * as cardLabelSlice from '../../../../../redux/reducers/cardLabelSlice';
import Spinner from '../../../../../assets/svg/Spinner';

interface EditLabelFormProps {
  labels: Label[];
  setAddLabel: React.Dispatch<React.SetStateAction<string>>;
  handleClick: (id: number) => void;
  selectInputs: number[];
  selectCard: CardDB | null;
  editLabel: Label | null;
}

const initState: Label = {
  id: 0,
  name: '',
  labelName: '',
  code: '',
};

const EditLabelForm = ({
  labels,
  setAddLabel,
  handleClick,
  selectCard,
  selectInputs,
  editLabel,
}: EditLabelFormProps) => {
  const dispatch = useDispatch();
  const featureContext = useContext(FeatureContext);

  const [selectLabel, setSelectLabel] = useState<Label | null>(null);

  useEffect(() => {
    if (!editLabel) return;
    setSelectLabel(editLabel);
    setInputValue(editLabel);
  }, [editLabel]);

  const [inputValue, setInputValue] = useState<Label>(initState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue({ ...inputValue, labelName: e.target.value });
  };

  const handleSelect = (label: Label) => {
    setSelectLabel(label);
  };

  const labelsFilter = labels.filter(
    (label) => label.labelName?.trim() !== '' && label.labelName === undefined
  );

  const checkActive = (labelId: string) => {
    if (!selectLabel) return;
    if (labelId === selectLabel.code) return true;
    return false;
  };

  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (!featureContext) return;
    setLoading(true);
    setTimeout(() => {
      if (inputValue.id > 6) {
        dispatch(labelSlice.update(inputValue));
      } else {
        if (inputValue.labelName?.trim() !== '' && inputValue.labelName) {
          dispatch(
            labelSlice.create({
              name: inputValue.name,
              code: inputValue.code,
              labelName: inputValue.labelName,
            })
          );
        }
      }
      setLoading(false);
      featureContext.closeFn();
    }, 2000);
  };

  useEffect(() => {
    if (!selectLabel) return;
    setInputValue({
      ...inputValue,
      code: selectLabel.code,
      name: selectLabel.name,
    });
  }, [selectLabel]);

  const labelJustAdd = useSelector(labelSelector).labelJustAdd;

  useEffect(() => {
    if (!labelJustAdd) return;
    if (!selectCard) return;
    let cardLabel: CardLabelForm = {
      labelId: labelJustAdd.id,
      cardId: selectCard.id,
    };
    dispatch(cardLabelSlice.create(cardLabel));
    setTimeout(() => {
      dispatch(labelSlice.reset());
    }, 500);
  }, [labelJustAdd]);

  const labelElement = labelsFilter.map((label) => {
    return (
      <div
        onClick={() => handleSelect(label)}
        key={label.id}
        style={{ backgroundColor: `${label.code}` }}
        className={`${
          checkActive(label.code) ? 'border-[2px] border-[#579DFF]' : ''
        } w-full h-9 rounded-[3px] cursor-pointer`}
      >
        {' '}
      </div>
    );
  });

  const handleDelete = (id: number) => {
    // dispatch(labelSlice.remove(id));
    // featureContext?.closeFn()
    setAddLabel('delete');
  };

  return (
    <div>
      <button
        onClick={() => setAddLabel('home')}
        className="absolute top-2 text-[#9FADBC] px-2 "
      >
        <i className="fa-solid text-[14px] fa-chevron-left "></i>
      </button>
      <div className="">
        <h3 className="text-[12px] font-bold mt-3 pb-2 text-[#9FADBC]">
          Tiêu đề
        </h3>
        <input
          value={inputValue.labelName ? inputValue.labelName : ''}
          onChange={handleChange}
          className="bg-[#22272B] text-[#9FADBC] leading-5 text-[14px] w-full border-[2px] border-[#A6C5E229] rounded-[3px] px-3 py-2"
          type="text"
        />
      </div>
      <div className="mb-2">
        <h3 className="text-[12px] font-bold mt-3 pb-2 text-[#9FADBC]">
          Chọn một màu
        </h3>
        <div className="grid-cols-3 grid gap-2 mb-3">{labelElement}</div>
      </div>
      <hr className="border-[#A6C5E229] my-3" />
      <div className="flex justify-between items-center">
        <button
          onClick={handleSubmit}
          disabled={selectLabel ? false : true}
          className={`${
            selectLabel
              ? 'bg-[#579DFF] text-[#1D2125]'
              : 'bg-[#BCD6F00A] text-[#9FADBC] cursor-not-allowed'
          } px-[12px] py-[6px] text-[14px] rounded-[3px] relative hover:opacity-100 opacity-80 transition-all ease-in-out duration-100 `}
        >
          {loading ? (
            <span className="inline-flex items-center max-w-full min-w-[40px] justify-center w-full h-full">
              <div className="absolute top-1/2 -translate-y-1/2 left-[80%] ">
                <Spinner />
              </div>
              {/* <span className="text-[#fff]">Loading...</span> */}
            </span>
          ) : (
            <span>Sửa</span>
          )}
        </button>
        <button
          onClick={() => handleDelete(editLabel ? editLabel.id : 0)}
          className={`text-[#1D2125] bg-[#F87462] px-[12px] py-[6px] text-[14px] opacity-80 hover:opacity-100 rounded-[3px] transition-all ease-in duration-100 `}
        >
          Xoá
        </button>
      </div>
    </div>
  );
};

export default EditLabelForm;
