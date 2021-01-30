import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { useHistory } from 'react-router-dom';
import './styles/Flat.scss';

import { useMeasure } from 'react-use';
import { useSpring, animated, useTransition } from 'react-spring';

import FlatUpdate from './FlatUpdate';

import './styles/Button.scss';

const Flat = forwardRef((cProps, ref) => {
  
  let boolean = true;
  const [second, setSecond] = useState(cProps.title);
  const [isShown, setIsShown] = useState(false);
  const showPath = "/flats/" + cProps.id;
  const history = useHistory();

  const modalRef = useRef();
  const openModal = () => {
    modalRef.current.openModal()
  };

  useEffect(() => {
    const interval = setInterval(() => {
      boolean = !boolean;
      setSecond(boolean ? 'Click here!' : cProps.title);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const [refMeasure, { height }] = useMeasure();

  const [propsAnimation, set] = useSpring(() => ({
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

  useImperativeHandle(ref, () => {
    return {
      hoverFlat: () => handleMouseEnter(),
      leaveFlat: () => handleMouseLeave()
    }
  });

  const handleMouseEnter = () => {
    cProps.onHover(cProps.id);
    set(updateHover(true));
    setIsShown(true);
  }

  const handleMouseLeave = () => {
    set(updateHover(false));
    setIsShown(false);
  }

  return (
    <animated.div 
      className='flat'
      style={propsAnimation}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={ref, refMeasure}
    >
      <img src={cProps.imgUrl} alt="urlImage"/>
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
                onClick={openModal}
                >UPDATE
              </button>
              <button 
                type="button" 
                className="button"
                onClick={cProps.onDelete}
                >DELETE
              </button>
            </div>
          </animated.div>
        ))}
      </div>
      <FlatUpdate id={cProps.id} ref={modalRef} submit={(id, data) => cProps.onUpdate(id, data)}/>
    </animated.div>
  );
})

export default Flat;
