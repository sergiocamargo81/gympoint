import styled from 'styled-components';

export const Container = styled.div`
  align-self: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 900px;

  div {
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
      width: 100px;
      text-transform: uppercase;
      background: #ee4d64;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
    }

    input {
      width: 250px;
      margin-left: 20px;
      border-radius: 4px;
      border: 1px solid #eee;
      padding: 10px 10px 10px 30px;
    }
  }
`;

export const StudentsTable = styled.table`
  width: inherit;
  background: #fff;
  padding: 25px 25px 5px 25px;

  thead {
    tr {
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
