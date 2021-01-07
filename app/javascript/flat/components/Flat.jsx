import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './styles/Flat.scss';

import { useSpring, animated } from 'react-spring';

const Flat = ({imgUrl, title, onSelect, id, selected}) => {
  useEffect(() => {
    const interval = setInterval(() => {
      boolean = !boolean;
      setSecond(boolean ? 'Click me!' : title);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const props = useSpring({
    from: { opacity: 0, marginTop: -500 },
    to: { opacity: 1, marginTop: 10 },
    config: { delay: 1000, duration: 1000 }
  })

  let boolean = true;
  const [second, setSecond] = useState(title);
  const classes = selected ? ' selected' : '';
  const showPath = "/flats/" + id;
  const history = useHistory();

  return (
    <animated.div className={'flat rounded' + classes} style={props} > 
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
