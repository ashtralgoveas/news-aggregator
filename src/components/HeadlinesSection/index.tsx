import styled from 'styled-components';

export const Header = styled.h1`
  font-family: 'Times New Roman';
  text-align: left;
  color: #000;
  font-weight: 900;
  @media screen and (max-width: 425px) {
    font-size: 45px;
  }
`;

export const Container = styled.div`
  width: 93%;
  padding-right: (1.5rem, 0.75rem);
  padding-left: (1.5rem, 0.75rem);
  margin-right: auto;
  margin-left: auto;
`;

// eslint-disable-next-line react-refresh/only-export-components
export const card = {
  marginTop: '10px',
  marginBottom: '50px',
};
