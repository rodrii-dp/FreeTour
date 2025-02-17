import {useState} from 'react';
import {NativeScrollEvent, NativeSyntheticEvent} from 'react-native';

export const useScroll = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const {contentOffset, layoutMeasurement} = event.nativeEvent;
    const currentIndex = Math.floor(contentOffset.x / layoutMeasurement.width);
    setActiveIndex(currentIndex > 0 ? currentIndex : 0);
  };

  return {
    activeIndex,
    setActiveIndex,
    onScroll,
  };
};
