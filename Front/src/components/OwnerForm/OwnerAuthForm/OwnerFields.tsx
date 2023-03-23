import {useContext, useEffect, useState} from 'react';
import styled from 'styled-components';

import { InputBox, FormContext } from '../../AuthForm/AuthFields';
import { BiCaretDown, BiCaretUp } from "react-icons/bi";
import { labelText } from '../../AuthForm/AuthDescription';
import { weekdays, DayBusinessHour } from './OwnerAuthDescription';
import { ImCancelCircle } from "react-icons/im";


export {FileField, CategotySelectField, BusinessHourField}

type TselectOptions = {
  [key: string]: string[];
};

const FileField = ({ type, name }: { type: string; name: string }) => {
  const {values, getFieldProps, touched, errors } = useContext(FormContext);
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    let fileArray: File[] | null = []
    if (name === "newStoreBrcImages") {
      fileArray = values["newStoreBrcImages"] ? Array.from(values["newStoreBrcImages"]) : null
    }
    else {
      fileArray = values["brcImage"] ? Array.from(values["brcImage"]) : null
    }
    console.log(fileArray)
    const selectedFiles = fileArray ? fileArray.map((file) => {
      console.log(file)
      return URL.createObjectURL(file);
    }) : [];
    setImages([...selectedFiles])
  },[values[name]])
  
  const newImages = images.map((img, idx) => {
        return (
          <div key={idx}>
            <img src={img} alt='' />
          </div>
        );
      });

  return (
    <InputBox>
      <label htmlFor={name}>{labelText[name]}</label>
      {images.length ? "새로 업로드한 이미지" : null}
      {newImages}
      <input type={type} id={name} accept='image/*' multiple {...getFieldProps(name)} />
      <div className='bar'></div>
      {!touched[name] || !errors[name] ? null : (
        <span id='FileError'>{errors[name]}</span>
      )}
    </InputBox>
  );
};


const CategotySelectField = ({
  options,
  name,
}: {
  options: TselectOptions;
  name: string[];
}) => {
  const { values, getFieldProps, touched, errors } = useContext(FormContext);

  const subOptions = values.hobbyMainCategory
    ? options[values.hobbyMainCategory].map((opt, idx) => {
        return (
          <option value={opt} key={idx}>
            {opt}
          </option>
        );
      })
    : null;

  return (
    <InputBox>
      <label htmlFor={name[1]}>{labelText[name[1]]}</label>
      <SelectBox>
      <select id={name[0]} {...getFieldProps(name[0])}>
        {Object.keys(options).map((option, idx) => {
          return (
            <option value={option} key={idx}>
              {option}
            </option>
          );
        })}
      </select>
      <select id={name[1]} {...getFieldProps(name[1])} value={values.hobbyMajorCategory}>
        {subOptions}
      </select>
      </SelectBox>
      {!touched[name[1]] || !errors[name[1]] ? null : (
        <span id='SelectError'>{errors[name[1]]}</span>
      )}
    </InputBox>
  );
};


const BusinessHourField = () => {
  const { values, handleBusinessHour, getFieldProps } = useContext(FormContext);

  const [hourOpen, setHourOpen] = useState(false);

  const hourHandler = () => {
    setHourOpen((prev) => !prev);
  };

  return (
    <InputBox>
      <div onClick={hourHandler} className='businesssheader'>
        영업시간 설정 {hourOpen ? <BiCaretUp /> : <BiCaretDown />}
      </div>

      <HourDisclosure open={hourOpen}>
        {Object.keys(weekdays).map((days: string, idx) => {
          return (
            <DayBusinessHour
              day={days}
              hourHandler={handleBusinessHour}
              values={values}
              key={idx}
            />
          );
        })}
      </HourDisclosure>
    </InputBox>
  );
};

const SelectBox = styled.div`
display: flex;
justify-content: space-evenly;
  select {
    width: 40%;
    text-align: center;
    height: 30px;
  }
`

const HourDisclosure = styled.div<{open: boolean}>`
  background-color: var(--gray-color-light);
  border-radius: 10px;
  padding: 10px;
  overflow: hidden;
  height: ${props => `${props.open ? "580px" : "0px"}`};
  transition: height 0.7s;
`;
