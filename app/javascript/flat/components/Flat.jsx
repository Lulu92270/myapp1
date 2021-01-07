import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './styles/Flat.scss';

import { useSpring, animated } from 'react-spring';

const Flat = ({imgUrl, title, onSelect, id, selected}) => {
  useEffect(() => {
    const interval = setInterval(() => {
      boolean = !boolean;
      setSecond(boolean ? 'Click here!' : title);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const [props, set] = useSpring(() => ({
    transform: 'scale(1)',
    boxShadow: '0px 5px 15px 0px rgba(0, 0, 0, 0.30)',
    from: { 
        transform: 'scale(0.5)',
        boxShadow: '0px 0px 0px 0px rgba(0, 0, 0, 0.30)'
    },
    config: { tension: 400, mass: 2, velocity: 5 }
  }))

  const updateHover = hovering => ({
      transform: `scale(${ hovering ? 1.1 : 1})`,
      boxShadow: `0px ${hovering ? '10px 20px' : '5px 15px'} 0px rgba(0, 0, 0, 0.30)`
  })

  let boolean = true;
  const [second, setSecond] = useState(title);
  const classes = selected ? ' selected' : '';
  const showPath = "/flats/" + id;
  const history = useHistory();

  return (
    <animated.div className={'flat rounded' + classes} style={props}
      onMouseEnter={() => set(updateHover(true))}
      onMouseLeave={() => set(updateHover(false))}
    > 
      <div onClick={() => onSelect(id)} className="flat-image">
        <img src={imgUrl} alt="Flat" />
      </div>
      <div className="flat-title" onClick={() => history.push(showPath)}>
        {selected ? second : title}
      </div>
    </animated.div>
  );
}

export default Flat;
