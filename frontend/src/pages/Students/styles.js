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
  margin: 30px 0 30px;

  span {
    flex-grow: 1;
    font-size: 24px;
    font-weight: bold;
  }

  button {
    width: 150px;
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
    margin-left: 20px;
    width: 250px;

    > svg {
      color: #a9a9a9;
      position: absolute;
      margin-top: 10px;
      margin-left: 10px;
    }

    > input {
      width: 250px;

      border-radius: 4px;
      border: 1px solid #eee;
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
        padding-bottom: 20px;
        text-transform: uppercase;
      }
    }
  }

  tbody {
    tr {
      width: 1150;

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
  width: 180px;
`;

export const ThEdit = styled.th`
  width: 55px;
`;

export const ThDelete = styled.th`
  width: 55px;
`;
