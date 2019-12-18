import styled from 'styled-components';

export const Container = styled.div`
  align-self: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 700px;
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
`;

export const Content = styled.div`
  width: 100%;
  background: #fff;
  padding: 30px 30px 15px 30px;
  border-radius: 4px;
`;

export const HelpOrdersTable = styled.table`
  border-spacing: 0;

  > thead {
    > tr {
      > th {
        text-align: left;
        font-size: 16px;
        font-weight: bold;
        white-space: nowrap;
        padding-bottom: 5px;
      }

      /* Aluno */
      > th:nth-child(1) {
        width: 330px;
      }

      /* Responder */
      > th:nth-child(2) {
        width: 330px;
      }
    }
  }

  > tbody {
    > tr:last-child {
      > td {
        border-bottom: 0;
      }
    }
  }
`;

export const HelpOrderData = styled.tr`
  color: #666;
  font-size: 16px;

  > td {
    padding: 15px 0;
    border-bottom: 1px solid #eee;
  }

  /* Aluno */
  > td:nth-child(1) {
    text-align: left;
  }

  /* Responder */
  > td:nth-child(2) {
    text-align: right;

    > button {
      font-size: 15px;
      color: #4d85ee;
      text-align: right;
      background: transparent;
      border: 0;
      transition: font-weight 0.2s;

      &:hover {
        font-weight: bold;
      }
    }
  }
`;

export const NoData = styled.tr`
  color: #666;
  font-size: 16px;

  > td {
    padding: 15px 0;
    text-align: center;
    font-style: italic;
  }
`;
