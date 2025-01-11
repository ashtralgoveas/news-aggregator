import styled, { keyframes } from 'styled-components';
const spinAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// Keyframes for glowing effect
const glowAnimation = keyframes`
  0% { box-shadow: 0 0 10px rgba(60, 159, 225, 0.5); }
  50% { box-shadow: 0 0 20px rgba(60, 159, 225, 1); }
  100% { box-shadow: 0 0 10px rgba(60, 159, 225, 0.5); }
`;

// Spinner Container with enhanced positioning and responsiveness
export const SpinnerContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

// Enhanced Loading Circle
export const LoadingCircle = styled.div`
  width: 60px;
  height: 60px;
  border: 6px solid rgba(60, 159, 225, 0.3);
  border-top-color: rgb(60, 159, 225);
  border-radius: 50%;
  animation:
    ${spinAnimation} 1s linear infinite,
    ${glowAnimation} 1.5s ease-in-out infinite;
`;
