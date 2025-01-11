import React from 'react';
import styled from 'styled-components';
import { Container } from 'react-bootstrap';

export const ScrollableContainer = styled(Container)`
  height: 100vh; /* Full viewport height */
  overflow-y: auto; /* Enable vertical scrolling */

  /* Firefox scrollbar styles */
  scrollbar-width: thin;
  scrollbar-color: rgb(60, 159, 225) rgba(60, 159, 225, 0.2);

  /* WebKit (Chrome, Safari, Edge) scrollbar styles */
  &::-webkit-scrollbar {
    width: 12px; /* Scrollbar width */
  }

  &::-webkit-scrollbar-track {
    background: rgba(60, 159, 225, 0.1); /* Track color */
  }

  &::-webkit-scrollbar-thumb {
    background: rgb(60, 159, 225); /* Thumb color */
    border-radius: 6px;
    min-height: 100px; /* Force a taller draggable thumb */
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgb(45, 145, 215); /* Hover color */
  }

  &::-webkit-scrollbar-thumb:vertical {
    min-height: 100px !important; /* Ensure minimum height is applied */
  }
`;
