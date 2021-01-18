import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './styles/Flat.scss';

import { useMeasure } from 'react-use';
import { useSpring, animated, useTransition } from 'react-spring';

import './styles/Button.scss';

const Flat = ({imgUrl, title, onHover, id, onDelete, showModal}) => {
  
  let boolean = true;
  const [second, setSecond] = useState(title);
  const [isShown, setIsShown] = useState(false);
  const showPath = "/flats/" + id;
  const history = useHistory();

  useEffect(() => {
    const interval = setInterval(() => {
      boolean = !boolean;
      setSecond(boolean ? 'Click here!' : title);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const [ref, { height }] = useMeasure();

  const [props, set] = useSpring(() => ({
    transform: 'scale(1)',
    boxShadow: '0px 5px 15px 0px rgba(0, 0, 0, 0.30)',
    from: { 
        transform: 'scale(0.5)',
        boxShadow: '0px 0px 0px 0px rgba(0, 0, 0, 0.30)'
    },
    config: { tension: 400, mass: 2, velocity: 5 }
  }));

  const updateHover = hovering => ({
      transform: `scale(${hovering ? 1.1 : 1})`,
      boxShadow: `0px ${hovering ? '10px 20px' : '5px 15px'} 0px rgba(0, 0, 0, 0.30)`
  });

  const transition = useTransition(isShown, null, {
    from: { opacity: 0, height: 0 },
    enter: { opacity: 1, height: height },
    leave: { opacity: 0, height: 0 }
  });

  return (
    <animated.div 
      className='flat'
      style={props}
      onMouseEnter={() => { onHover(id), set(updateHover(true)), setIsShown(true)}}
      onMouseLeave={() => { set(updateHover(false)), setIsShown(false)}}
      ref={ref}
    >
      <img src={imgUrl} alt="urlImage"/>
      <div>
        {transition.map(({ item, key, props }) => (
          item && <animated.div className="flat-description" style={props} key={key}>
            <div className="flat-title" onClick={() => history.push(showPath)}>
              {second}
            </div>
            <div className="buttons">
              <button 
                type="button"
                className="button"
                onClick={() => {showModal()}}
                >UPDATE
              </button>
              <button 
                type="button" 
                className="button"
                onClick={() => {onDelete()}}
                >DELETE
              </button>
            </div>
          </animated.div>
        ))}
      </div>
    </animated.div>
  );
}

export default Flat;