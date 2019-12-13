import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  align-self: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 900px;
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
    height: 37px;
    text-transform: uppercase;
    background: #ee4d64;
    color: #fff;
    border: 0;
    border-radius: 4px;
    transition: background 0.2s;

    &:hover {
      background: ${darken(0.1, '#ee4d64')};
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
`;

export const Content = styled.div`
  width: 100%;
  background: #fff;
  padding: 30px 30px 15px 30px;
  border-radius: 4px;
`;

export const PlansTable = styled.table`
  border-spacing: 0;

  > thead {
    > tr {
      width: 900;

      > th {
        text-align: left;
        font-size: 16px;
        font-weight: bold;
        white-space: nowrap;
        padding-bottom: 5px;
      }

      /* Título */
      > th:nth-child(1) {
        width: 400px;
      }

      /* Duração */
      > th:nth-child(2) {
        width: 80px;
        text-align: center;
      }

      /* Blank(1) */
      > th:nth-child(3) {
        width: 100px;
      }

      /* Valor */
      > th:nth-child(4) {
        width: 120px;
        text-align: center;
      }

      /* Blank(2) */
      > th:nth-child(5) {
        width: 70px;
      }

      /* Editar */
      > th:nth-child(6) {
        width: 70px;
      }

      /* Apagar */
      > th:nth-child(7) {
        width: 70px;
      }
    }
  }

  > tbody {
    > tr {
      width: 1150;
      color: #666;
      font-size: 16px;

      > td {
        padding: 15px 0;
        border-bottom: 1px solid #eee;
      }

      /* Duração */
      > td:nth-child(2) {
        text-align: center;
      }

      /* Valor */
      > td:nth-child(4) {
        text-align: center;
      }

      /* Editar */
      > td:nth-child(6) {
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

      /* Apagar */
      > td:nth-child(7) {
        text-align: right;

        > button {
          font-size: 15px;
          color: #de3b3b;
          text-align: right;
          background: transparent;
          border: 0;
          transition: font-weight 0.2s;

          &:hover {
            font-weight: bold;
          }
        }
      }
    }

    tr:last-child {
      td {
        border-bottom: 0;
      }
    }
  }
`;
