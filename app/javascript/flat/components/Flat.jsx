import React, { useRef, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './styles/Flat.scss';
import './styles/Button.scss';

import { useMeasure } from 'react-use';
import { useSpring, animated } from 'react-spring';

import { fetchDelete } from './Fetches';

const Flat = ({imgUrl, title, onSelect, id, selected, flat}) => {
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
  }))

  const [props1, set1] = useSpring(() => ({
    height: 0,
    opacity: 0
  }));
  
  const updateHover1 = hovering => ({
    height: hovering ? height : 0,
    opacity: hovering ? 1 : 0
  })

  const updateHover = hovering => ({
      transform: `scale(${ hovering ? 1.1 : 1})`,
      boxShadow: `0px ${hovering ? '10px 20px' : '5px 15px'} 0px rgba(0, 0, 0, 0.30)`,
  })

  let boolean = true;
  const [second, setSecond] = useState(title);
  const [isShown, setIsShown] = useState(false);
  const classes = selected ? ' selected' : '';
  const showPath = "/flats/" + id;
  const history = useHistory();

  return (
    <animated.div 
      className={'flat' + classes} style={props}
      onMouseEnter={() => { set(updateHover(true)), set1(updateHover1(true)), setIsShown(true)}}
      onMouseLeave={() => { set(updateHover(false)), set1(updateHover1(false)), setIsShown(false)}}
      onClick={() => onSelect(id)}
      ref={ref}
      style={{backgroundImage: `url(${imgUrl})`}}
    >
      <animated.div className="flat-description" style={props1} >
        <div className="flat-title">
          {isShown ? second : ""}
        </div>
        <div className="buttons">
          <button 
            type="button"
            className="button-update"
            onClick={() => history.push(`/flats/update/${id}`)}
            >UPDATE
          </button>
          <button 
            type="button" 
            className="button-delete"
            onClick={() => {
              fetchDelete(flat);
              // setDisplayArray(flats.filter(flat => flat !== selectedFlat));
            }}
            >DELETE
          </button>
        </div>
      </animated.div>
    </animated.div>
  );
}

export default Flat;
