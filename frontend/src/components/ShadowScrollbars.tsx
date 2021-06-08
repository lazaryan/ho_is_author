import { FC, useCallback, useRef } from 'react';
import { ScrollbarProps, Scrollbars, positionValues } from 'react-custom-scrollbars';

const ScrollView: FC<any> = (props) => {
  return (<div className="box" {...props} />)
}

const ShadowScrollbars: FC<ScrollbarProps> = ({ style, ...props }) => {
  const pxShadow = useRef(15);

  const shadowTopRef = useRef<HTMLDivElement | null>(null);
  const shadowBottomRef = useRef<HTMLDivElement | null>(null);

  const handleUpdate = useCallback((values: positionValues) => {
    const { scrollTop, scrollHeight, clientHeight } = values;

    if (shadowTopRef.current) {
      const shadowTopOpacity = 1 / pxShadow.current * Math.min(scrollTop, pxShadow.current);

      shadowTopRef.current.style.opacity = shadowTopOpacity.toString();
    }

    if (shadowBottomRef.current) {
      const bottomScrollTop = scrollHeight - clientHeight;
      const shadowBottomOpacity = 1 / pxShadow.current * (bottomScrollTop - Math.max(scrollTop, bottomScrollTop - pxShadow.current));

      shadowBottomRef.current.style.opacity = shadowBottomOpacity.toString();
    }
  }, [pxShadow, shadowTopRef, shadowBottomRef]);

  return (<div className="shadow-scroll-bars" style={style}>
    <Scrollbars
      renderView={ScrollView}
      onUpdate={handleUpdate}
      hideTracksWhenNotNeeded
      {...props}
    />
    <div ref={shadowTopRef} className="top-shadow" />
    <div ref={shadowBottomRef} className="bottom-shadow" />
  </div>)
}

export default ShadowScrollbars;
