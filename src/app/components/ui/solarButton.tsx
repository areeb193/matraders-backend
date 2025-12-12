import React from 'react';
import styled from 'styled-components';

interface SolarButtonProps {
  onClick: () => void;
  className?: string;
  children?: React.ReactNode;
  active?: boolean;
}

const SolarButton: React.FC<SolarButtonProps> = ({ onClick, className, children, active }) => {
  return (
    <StyledWrapper>
      <button
        onClick={onClick}
        className={`btn ${active ? "active" : ""} ${className || ""}`}
      >
        {children}
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .btn {
    font-size: 14px;
    background: none;
    letter-spacing:0.3px;
    padding: 1em 1.5em;
    color: #030303ff;
    text-transform: uppercase;
    position: relative;
    transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease;
    cursor: pointer;
    border: 2px solid black;
  }

  .btn::before {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    height: 2px;
    width: 0;
    background-color: #dfaf14ff;
    transition: 0.5s ease;
  }

  .btn:hover {
    color: #1e1e2b;
    transition-delay: 0.5s;
  }

  .btn:hover::before {
    width: 100%;
  }

  .btn:active {
    background-color: #dfaf14ff;
  }

  .btn::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    height: 0;
    width: 100%;
    background-color: #dfaf14ff;
    transition: 0.4s ease;
    z-index: -1;
  }

  .btn:hover::after {
    height: 100%;
    transition-delay: 0.4s;
    color: aliceblue;
  }

  .btn.active {
    background: #dfaf14ff;
    color: #1e1e2b;
  }

  .btn.active:hover {
    transform: scale(1.03);
  }

  /* ✅ Responsive Adjustments for Mobile */
  @media (max-width: 768px) {
    .btn {
      font-size: 14px;
      padding: 0.7em 1em;
      width: 100%; /* 👈 All buttons same width on tablets & below */
    }
  }

  @media (max-width: 480px) {
    .btn {
      font-size: 13px;
      padding: 0.6em 0.9em;
      width: 100%; /* 👈 Ensures same width on mobile */
    }
  }
`;

export default SolarButton;
