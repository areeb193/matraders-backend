"use client";

import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { Phone } from 'lucide-react';

const CallButton = () => {
  return (
    <StyledWrapper>
        <Link href='/contact'>
      <button className="Download-button">
        <Phone/>
        <span>Contact Us</span>
      </button>
      </Link>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .Download-button {
    display: flex;
    align-items: center;
    font-family: inherit;
    font-weight: 500;
    font-size: 17px;
    padding: 12px 20px;
    color: white;
    background: linear-gradient(144deg, #166534, #169934 50%, #168844);
    border: none;
    box-shadow: 0 0.7em 1.5em -0.5em rgba(59, 78, 48, 0.527);
    letter-spacing: 0.05em;
    border-radius: 8px;
    cursor: pointer;
    position: relative;
    transition: all 0.2s;
  }

  .Download-button svg {
    margin-right: 8px;
    width: 25px;
  }

  .Download-button:hover {
    box-shadow: 0 0.5em 1.5em -0.5em #3b9982;
    border-top-left-radius: 40px;
    border-bottom-right-radius: 40px;
  }

  .Download-button:active {
    box-shadow: 0 0.3em 1em -0.5em #3bf682;
  }

  .Download-button::before {
    content: "";
    width: 4px;
    height: 40%;
    background-color: white;
    position: absolute;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    left: 0;
    transition: all 0.2s;
  }

  .Download-button::after {
    content: "";
    width: 4px;
    height: 40%;
    background-color: white;
    position: absolute;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    right: 0;
    transition: all 0.2s;
  }

  .Download-button:hover::before,
  .Download-button:hover::after {
    height: 60%;
  }

  .Download-button:hover::before {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
    transform: translate(5px, -15px) rotate(45deg);
  }

  .Download-button:hover::after {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
    transform: translate(-5px, 15px) rotate(45deg);
  }`;

export default CallButton;
