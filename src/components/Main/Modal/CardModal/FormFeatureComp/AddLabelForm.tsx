import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as labelSlice from '../../../../../redux/reducers/labelSlice';
import { Label, LabelForm } from '../../../../../types/Label.type';
import { FeatureContext } from '../CreateFeatureBtn';
import { labelSelector } from '../../../../../redux/selectors';
import * as cardLabelSlice from '../../../../../redux/reducers/cardLabelSlice';
import { CardLabelForm } from '../../../../../types/CardLabel.type';
import { CardDB } from '../../../../../types/Card.type';
import Spinner from '../../../../../assets/svg/Spinner';

interface AddLabelFormProps {
  labels: Label[];
  setAddLabel: React.Dispatch<React.SetStateAction<string>>;
  handleClick: (id: number) => void;
  selectInputs: number[];
  selectCard: CardDB | null;
}

const AddLabelForm = ({
  handleClick,
  labels,
  setAddLabel,
  selectInputs,
  selectCard,
}: AddLabelFormProps) => {
  const dispatch = useDispatch();
  const [selectLabel, setSelectLabel] = useState<Label | null>(null);
  const featureContext = useContext(FeatureContext);

  const handleSelect = (label: Label) => {
    setSelectLabel(label);
  };

  const labelsFilter = labels.filter(
    (label) => label.labelName?.trim() !== '' && label.labelName === undefined
  );

  const checkActive = (labelId: number) => {
    if (!selectLabel) return;
    if (labelId === selectLabel.id) return true;
    return false;
  };

  const [inputValue, setInputValue] = useState<LabelForm | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let labelName = e.target.value;

    setInputValue({
      name: selectLabel ? selectLabel.name : '',
      code: selectLabel ? selectLabel.code : '',
      labelName: labelName,
    });
  };

  useEffect(() => {
    if (!selectLabel) return;
    setInputValue({
      ...inputValue,
      name: selectLabel.name,
      code: selectLabel.code,
    });
  }, [selectLabel]);

  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (!featureContext) return;
    if (!selectLabel) return;
    if (!inputValue) return;
    setLoading(true);
    if (
      (inputValue.labelName?.trim() === '' ||
        inputValue.labelName === undefined) &&
      labels.find((label) => label.code === inputValue.code) !== undefined
    ) {
      if (!selectInputs.includes(selectLabel.id)) {
        setTimeout(() => {
          handleClick(selectLabel.id);
        }, 2000);
      }
    } else {
      setTimeout(() => {
        dispatch(labelSlice.create(inputValue));
      }, 2000);
    }
    setTimeout(() => {
      featureContext.closeFn();
      setLoading(false);
    }, 2000);
  };

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
          checkActive(label.id) ? 'border-[2px] border-[#579DFF]' : ''
        } w-full h-9 rounded-[3px] cursor-pointer`}
      >
        {' '}
      </div>
    );
  });
  return (
    <div>
      <button
        onClick={() => setAddLabel('home')}
        className="absolute px-2 top-2 text-[#9FADBC]"
      >
        <i className="fa-solid text-[14px] fa-chevron-left"></i>
      </button>
      <div className="">
        <h3 className="text-[12px] font-bold mt-3 pb-2 text-[#9FADBC]">
          Tiêu đề
        </h3>
        <input
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
      <button
        onClick={handleSubmit}
        disabled={selectLabel ? false : true}
        className={`${
          selectLabel
            ? 'bg-[#579DFF] text-[#1D2125]'
            : 'bg-[#BCD6F00A] text-[#9FADBC] cursor-not-allowed'
        } px-[12px] py-[6px] text-[14px] rounded-[3px] relative `}
      >
        {loading ? (
          <span className="inline-flex items-center max-w-full min-w-[40px] justify-center w-full h-full">
            <div className="absolute top-1/2 -translate-y-1/2 left-[80%] ">
              <Spinner />
            </div>

            {/* <span className="text-[#fff]">Loading...</span> */}
          </span>
        ) : (
          <span> Tạo mới</span>
        )}
      </button>
    </div>
  );
};

export default AddLabelForm;
