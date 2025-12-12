"use client";
import React from "react";
import styled from "styled-components";
import { ArrowRight } from "lucide-react";
import Link from "next/link";


interface BrowseButton {
  name: string;
  path: string;

}
const BrowseButton :React.FC<BrowseButton> = ({ path, name }) => {
  return (
    <StyledWrapper>
      <Link href={path}>
        <button className="button" >
          <span>
            {name}
            <ArrowRight className="inline-block ml-2" size={16} />
          </span>
        </button>
      </Link>
    </StyledWrapper>
  );
};
const StyledWrapper = styled.div`
  .button {
    width: 180px;
    padding: 0;
    border: none;
    transform: rotate(5deg);
    transform-origin: center;
    font-family: "Gochi Hand", cursive;
    text-decoration: none;
    font-size: 15px;
    cursor: pointer;
    padding-bottom: 3px;
    border-radius: 5px;
    box-shadow: 0 2px 0 #494a4b;
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    background-color: #5cdb95;
  }

  .button span {
    background: #f1f5f8;
    display: block;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    border: 2px solid #494a4b;
  }

  .button:active {
    transform: translateY(5px);
    padding-bottom: 0px;
    outline: 0;
  }`;

export default BrowseButton;
