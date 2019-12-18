import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  align-self: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 1380px;
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

export const MembershipsTable = styled.table`
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

      /* Plano */
      > th:nth-child(2) {
        width: 130px;
        text-align: center;
      }

      /* Blank(1) */
      > th:nth-child(3) {
        width: 70px;
      }

      /* Início */
      > th:nth-child(4) {
        width: 210px;
        text-align: center;
      }

      /* Blank(2) */
      > th:nth-child(5) {
        width: 55px;
      }

      /* Término */
      > th:nth-child(6) {
        width: 210px;
        text-align: center;
      }

      /* Blank(3) */
      > th:nth-child(7) {
        width: 70px;
      }

      /* Ativa */
      > th:nth-child(8) {
        width: 60px;
        text-align: center;
      }

      /* Blank(4) */
      > th:nth-child(9) {
        width: 45px;
      }

      /* Editar */
      > th:nth-child(10) {
        width: 70px;
      }

      /* Apagar */
      > th:nth-child(11) {
        width: 70px;
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

export const MembershipData = styled.tr`
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

  /* Plano */
  > td:nth-child(2) {
    text-align: center;
  }

  /* Início */
  > td:nth-child(4) {
    text-align: center;
  }

  /* Término */
  > td:nth-child(6) {
    text-align: center;
  }

  /* Ativa */
  > td:nth-child(8) {
    text-align: center;

    > svg {
      color: #fff;
      border-radius: 50%;
      background: #ddd;
    }

    > svg.active {
      background: #42cb59;
    }
  }

  /* Editar */
  > td:nth-child(10) {
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
  > td:nth-child(11) {
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
