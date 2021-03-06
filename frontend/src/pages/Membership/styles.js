import styled from 'styled-components';
import { darken } from 'polished';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import DatePicker from 'react-datepicker';

export const Container = styled.div`
  width: 900px;
  align-self: center;
  display: flex;
  align-items: center;
  flex-direction: column;

  > form {
    width: 100%;
  }
`;

export const Panel = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 30px 0 20px;

  span {
    flex-grow: 1;
    font-size: 24px;
    font-weight: bold;
  }

  button {
    width: 110px;
    height: 37px;
    text-transform: uppercase;
    background: #ccc;
    color: #fff;
    border: 0;
    border-radius: 4px;
    transition: background 0.2s;

    &:hover {
      background: ${darken(0.1, '#ccc')};
    }

    display: flex;
    align-items: center;
    justify-content: space-around;

    span {
      font-weight: bold;
      font-size: 14px;
      border: 0;
      margin: 0 15px 0 0;
      flex-grow: 0;
    }

    svg {
      flex-grow: 0;
      margin: 0 0 0 15px;
    }
  }

  > button.save {
    background: #ee4d64;
    margin-left: 20px;
    transition: background 0.2s;

    &:hover {
      background: ${darken(0.1, '#ee4d64')};
    }
  }
`;

export const MembershipData = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 4px;
  padding: 30px 30px 10px 30px;

  label {
    font-weight: bold;
    font-size: 14px;
    display: flex;
    flex-direction: column;
    margin-bottom: 14px;
  }

  > div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    > label {
      width: 195px;
    }
  }

  .error {
    color: red;
  }
`;

export const AsyncSelectStudent = styled(AsyncSelect).attrs(() => ({
  className: 'select-student-container',
  classNamePrefix: 'select-student',
}))`
  margin: 6px 0 6px 0;

  .select-student__control {
    height: 45px;

    border: 1px solid #ddd;
    box-shadow: none;
    &:hover {
      border: 1px solid #ddd;
    }
  }

  .select-student__placeholder {
    font-size: 16px;
    font-weight: normal;
  }

  .select-student__loading-indicator {
    display: none;
  }
`;

export const SelectPlan = styled(Select).attrs(() => ({
  className: 'select-plan-container',
  classNamePrefix: 'select-plan',
}))`
  margin: 6px 0 6px 0;

  .select-plan__control {
    height: 45px;
    width: 195px;

    border: 1px solid #ddd;
    box-shadow: none;
    &:hover {
      border: 1px solid #ddd;
    }
  }

  .select-plan__placeholder {
    font-size: 16px;
    font-weight: normal;
  }

  .select-plan__loading-indicator {
    display: none;
  }
`;

export const DatePickerStart = styled(DatePicker)`
  width: 195px;
  font-size: 16px;
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #ddd;
  margin: 6px 0 6px 0;
  max-height: 45px;
  color: #444;

  &::placeholder {
    color: #999;
  }
`;

export const InputDisabled = styled.span`
  width: 195px;
  font-size: 16px;
  flex-grow: 1;
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #ddd;
  margin: 6px 0 6px 0;
  max-height: 45px;
  color: #444;
  font-weight: normal;
  display: block;
  background: #f5f5f5;
`;
