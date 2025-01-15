import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  useWindowDimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import {Button} from '../../components/common/Button';
import {useNavigation} from '@react-navigation/native';
import {SvgProps} from 'react-native-svg';
import Slide1 from '../../assets/slide-1.svg';
import Slide2 from '../../assets/slide-2.svg';
import Slide3 from '../../assets/slide-3.svg';

interface Slide {
  title: string;
  desc: string;
  SvgComponent: React.FC<SvgProps>;
}

const items: Slide[] = [
  {
    title: 'Titulo 1',
    desc: 'Ea et eu enim fugiat sunt reprehenderit sunt aute quis tempor ipsum cupidatat et.',
    SvgComponent: Slide1,
  },
  {
    title: 'Titulo 2',
    desc: 'Anim est quis elit proident magna quis cupidatat curlpa labore Lorem ea. Exercitation mollit velit in aliquip tempor occaecat dolor minim amet dolor enim cillum excepteur. ',
    SvgComponent: Slide2,
  },
  {
    title: 'Titulo 3',
    desc: 'Ex amet duis amet nulla. Aliquip ea Lorem ea culpa consequat proident. Nulla tempor esse ad tempor sit amet Lorem. Velit ea labore aute pariatur commodo duis veniam enim.',
    SvgComponent: Slide3,
  },
];

export const SlidesScreen = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const navigation = useNavigation();

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const {contentOffset, layoutMeasurement} = event.nativeEvent;
    const currentIndex = Math.floor(contentOffset.x / layoutMeasurement.width);
    setCurrentSlideIndex(currentIndex > 0 ? currentIndex : 0);
  };

  const scrollToSlide = (index: number) => {
    if (!flatListRef.current) {
      return;
    }

    flatListRef.current.scrollToIndex({index, animated: true});
  };

  return (
    <View style={{flex: 1}}>
      <FlatList
        ref={flatListRef}
        data={items}
        renderItem={({item}) => <SlideItem item={item} />}
        keyExtractor={item => item.title}
        horizontal
        pagingEnabled
        // scrollEnabled={false}
        onScroll={onScroll}
      />

      {currentSlideIndex === items.length - 1 ? (
        <Button
          text="Finalizar"
          onPress={() => navigation.goBack()}
          style={{position: 'absolute', bottom: 60, right: 30, width: 100}}
        />
      ) : (
        <Button
          text="Siguiente"
          onPress={() => scrollToSlide(currentSlideIndex + 1)}
          style={{position: 'absolute', bottom: 60, right: 30, width: 100}}
        />
      )}
    </View>
  );
};

interface SlideItemProps {
  item: Slide;
}

const SlideItem = ({item}: SlideItemProps) => {
  const {width} = useWindowDimensions();
  const {title, desc, SvgComponent} = item;

  return (
    <View
      style={{
        flex: 1,
        // backgroundColor: 'white',
        borderRadius: 5,
        padding: 40,
        justifyContent: 'center',
        width,
      }}>
      <SvgComponent
        width={width * 0.7}
        height={width * 0.7}
        style={{
          alignSelf: 'center',
        }}
      />
      <Text>{title}</Text>
      <Text>{desc}</Text>
    </View>
  );
};
