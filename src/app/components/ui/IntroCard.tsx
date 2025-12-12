import React from 'react';
import styled from 'styled-components';

const IntroCard = () => {
  return (
    <StyledWrapper>
      <div className="notification">
        <div className="notiglow" />
        <div className="notiborderglow" />
        <div className="notititle">M.A Traders</div>
        <div className="notibody">We Have Experienced More Than 5 Years
</div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .notification {
    display: flex;
    flex-direction: column;
    isolation: isolate;
    position: relative;
    width: 20rem;
    height: 6rem;
    background: linear-gradient(to bottom right, #00c853, #2dadff);
    box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.2);
    border-radius: 1rem;
    overflow: hidden;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-size: 16px;
--gradient: linear-gradient(to bottom right, #00c853, #2dadff);
    --color: #00c853
  }

  .notification:before {
    position: absolute;
    content: "";
    inset: 0.0625rem;
    border-radius: 0.9375rem;
    background: #18181b;
    z-index: 2
  }

  .notification:after {
    position: absolute;
    content: "";
    width: 0.25rem;
    inset: 0.65rem auto 0.65rem 0.5rem;
    border-radius: 0.125rem;
    background: var(--gradient);
    transition: transform 300ms ease;
    z-index: 4;
  }

  .notification:hover:after {
    transform: translateX(0.15rem)
  }

  .notititle {
    color: var(--color);
    padding: 0.65rem 0.25rem 0.4rem 1.25rem;
    font-weight: 500;
    font-size: 1.1rem;
    transition: transform 300ms ease;
    z-index: 5;
  }

  .notification:hover .notititle {
    transform: translateX(0.15rem)
  }

  .notibody {
    color: #99999d;
    padding: 0 1.25rem;
    transition: transform 300ms ease;
    z-index: 5;
  }

  .notification:hover .notibody {
    transform: translateX(0.25rem)
  }

 .notiglow,
.notiborderglow {
  position: absolute;
  width: 20rem;
  height: 20rem;
  transform: translate(-90%, -30%);
  background: radial-gradient(
    circle at center,
    rgba(0, 200, 83, 0.5),   /* soft green */
    rgba(45, 173, 255, 0.4), /* soft blue */
    transparent
  );
  opacity: 1;
  transition: opacity 300ms ease;
  filter: blur(40px); /* 👈 glow ko smooth aur subtle banane ke liye */
}



  .notiglow {
    z-index: 3;
  }

  .notiborderglow {
    z-index: 1;
  }

  .notification:hover .notiglow {
    opacity: 0.1
  }

  .notification:hover .notiborderglow {
    opacity: 0.1
  }

  .note {
    color: var(--color);
    position: fixed;
    top: 80%;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    font-size: 0.9rem;
    width: 75%;
  }
  @media (max-width: 400px) {
  .notification{
    width: 18rem;
    height: 6rem;
  }
@media (max-width: 400px) and (min-width: 380px) {
  .notification{
    width: 18rem;
    height: 6.4rem;
  }

  }
  @media (max-width: 379px) and (min-width: 320px) {
  .notification{
    width: 14rem;
    height: 6.4rem;
  }

  }
  
  `;

export default IntroCard;
