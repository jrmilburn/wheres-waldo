import React, { useEffect, useState } from 'react';

function Cursor() {
  const [cursorX, setCursorX] = useState(0);
  const [cursorY, setCursorY] = useState(0);
  const [deviceType, setDeviceType] = useState('');
  const [isClicking, setIsClicking] = useState(false);
  const [buttonHovered, setButtonHovered] = useState(false);

  useEffect(() => {
    fetch(`https://localhost:3000/api/maps/slopes`)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error));
  }, [isClicking])

  // check if it is a touch device
  const isTouchDevice = () => {
    try {
      document.createEvent('TouchEvent');
      setDeviceType('touch');
      return true;
    } catch (e) {
      setDeviceType('mouse');
      return false;
    }
  };

  const move = (e) => {
    const touchEvent = e.touches ? e.touches[0] : null;
    const x = !isTouchDevice() ? e.pageX : touchEvent?.pageX || 0;
    const y = !isTouchDevice() ? e.pageY : touchEvent?.pageY || 0;

    setCursorX(x);
    setCursorY(y);

    // Set the cursor border's position directly
    const cursorBorder = document.getElementById('cursor-border');
    if (cursorBorder) {
      cursorBorder.style.left = `${x}px`;
      cursorBorder.style.top = `${y}px`;
    }
  };

  const handleMouseDown = () => {
    setIsClicking(true);

  };

  const handleMouseUp = () => {
    setIsClicking(false);
  };

  // Align custom cursor when mouse re-enters the viewport
  const handleMouseEnter = (e) => {
    move(e); // Sync the custom cursor with the actual mouse position
  };

  // Handle resetting the cursor when leaving the page
  const handleMouseLeave = () => {
    const cursorBorder = document.getElementById('cursor-border');
    if (cursorBorder) {
      cursorBorder.style.opacity = '0'; // Hide custom cursor when mouse leaves the page
    }
  };

  useEffect(() => {
    document.addEventListener('mousemove', move);
    document.addEventListener('touchmove', move);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', move);
      document.removeEventListener('touchmove', move);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    const cursorBorder = document.getElementById('cursor-border');
    if (cursorBorder) {
      cursorBorder.style.opacity = '1'; // Ensure custom cursor is visible when the page is entered
    }
  }, [cursorX, cursorY]);

  return (
    <div>
      <style>
        {`
        * {
            margin: 0;
            cursor: none;
        }

        #cursor {
            position: absolute;
            background-color: ${isClicking ? 'crimson' : 'crimson'};
            height: 10px;
            width: 10px;
            border-radius: 50%;
            transform: translate(-50%, -50%);
            pointer-events: none;
            transition: background-color 0.2s ease;
            z-index: 600;
        }

        #cursor-border {
            position: absolute;
            width: 50px;
            height: 50px;
            background-color: transparent;
            border: 3px solid ${buttonHovered ? 'red' : '#fff'};
            transform: translate(-50%, -50%);
            pointer-events: none;
            transition: all 0.2s ease-out;
            z-index: 500;
            opacity: 1;
        }
      `}
      </style>
      <div
        id="cursor"
        style={{ left: `${cursorX}px`, top: `${cursorY}px` }}
      ></div>
      <div id="cursor-border"></div>
    </div>
  );
}

export default Cursor;
