import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FloatingBtn = styled(Link)`
  position: fixed;
  bottom: 40px;
  right: 40px;
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
  cursor: pointer;
  text-decoration: none;
  z-index: 999;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 25px rgba(102, 126, 234, 0.6);
  }

  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
    bottom: 20px;
    right: 20px;
  }
`;

const ButtonContent = styled.div`
  text-align: center;
  color: white;
`;

const ButtonIcon = styled.div`
  font-size: 24px;
  margin-bottom: 4px;

  @media (max-width: 768px) {
    font-size: 20px;
    margin-bottom: 2px;
  }
`;

const ButtonText = styled.div`
  font-size: 11px;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 9px;
  }
`;

const FloatingButton = () => {
  return (
    <FloatingBtn to="/consultation">
      <ButtonContent>
        <ButtonIcon>💬</ButtonIcon>
        <ButtonText>실시간<br />상담</ButtonText>
      </ButtonContent>
    </FloatingBtn>
  );
};

export default FloatingButton;
