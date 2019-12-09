import styled from 'styled-components';

export const Container = styled.div`
  align-self: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 1200px;
`;

export const Panel = styled.div`
  width: inherit;
  display: flex;
  justify-content: space-between;
  margin: 30px 0 20px;

  span {
    flex-grow: 1;
    font-size: 24px;
    font-weight: bold;
  }

  button {
    width: 142px;
    text-transform: uppercase;
    background: #ee4d64;
    color: #fff;
    border: 0;
    border-radius: 4px;

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

  > form {
    margin-left: 17px;

    > svg {
      color: #a9a9a9;
      position: absolute;
      margin-top: 10px;
      margin-left: 10px;
    }

    > input {
      width: 237px;
      height: 37px;

      border-radius: 4px;
      border: 1px solid #ddd;
      padding: 10px 10px 10px 40px;

      &::placeholder {
        color: #a9a9a9;
      }
    }
  }
`;

export const StudentsTable = styled.table`
  width: inherit;
  background: #fff;
  padding: 30px 30px 5px 30px;
  border-spacing: 0;

  thead {
    tr {
      width: 1150;

      th {
        text-align: left;
        font-size: 16px;
        font-weight: bold;
        white-space: nowrap;
        padding-bottom: 5px;
        text-transform: uppercase;
      }
    }
  }

  tbody {
    tr {
      width: 1150;
      color: #666666;
      font-size: 16px;

      td {
        padding: 15px 0;
        border-bottom: 1px solid #eee;
      }
    }

    tr:last-child {
      td {
        border-bottom: 0;
      }
    }
  }
`;

export const ThName = styled.th`
  width: 470px;
`;

export const ThEmail = styled.th`
  width: 380px;
`;

export const ThAge = styled.th`
  width: 40px;
`;

export const ThBlank = styled.th`
  width: 100px;
`;

export const ThEdit = styled.th`
  width: 75px;
`;

export const ThDelete = styled.th`
  width: 75px;
`;

export const TdAge = styled.td`
  text-align: center;
`;

export const TdEdit = styled.td`
  text-align: right;
`;

export const TdDelete = styled.td`
  text-align: right;
`;

export const ButtonEdit = styled.button`
  font-size: 15px;
  color: #4d85ee;
  text-align: right;
  background: transparent;
  border: 0;
`;

export const ButtonDelete = styled.button`
  font-size: 15px;
  color: #de3b3b;
  text-align: right;
  background: transparent;
  border: 0;
`;
