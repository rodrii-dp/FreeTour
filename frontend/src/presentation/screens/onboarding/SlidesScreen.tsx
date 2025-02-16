import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  useWindowDimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Pressable,
} from 'react-native';
import {Text} from 'react-native-paper';
import {CustomButton} from '../../components/common/CustomButton.tsx';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {SvgProps} from 'react-native-svg';
import Slide1 from '../../assets/slide-1.svg';
import Slide2 from '../../assets/slide-2.svg';
import Slide3 from '../../assets/slide-3.svg';
import {globalStyles} from '../../../config/theme/theme.ts';
import {RootStackParams} from '../../navigator/Navigator.tsx';
import {PaginationDots} from '../../components/common/PaginationDots.tsx';

interface Slide {
  title: string;
  desc: string;
  SvgComponent: React.FC<SvgProps>;
}

const items: Slide[] = [
  {
    title: 'Bienvenido a TourNest',
    desc: 'Aquí encontrarás una gran variedad de lugares por descubrir al alcance de un solo clic.',
    SvgComponent: Slide1,
  },
  {
    title: 'Gestiona tus experiencias',
    desc: 'Reserva fácilmente tu lugar en los tours que más te interesen.',
    SvgComponent: Slide2,
  },
  {
    title: 'Explora sin límites',
    desc: 'Sumérgete en aventuras inolvidables y descubre todo lo que el mundo tiene para ofrecer.',
    SvgComponent: Slide3,
  },
];

export const SlidesScreen = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const {contentOffset, layoutMeasurement} = event.nativeEvent;
    const currentIndex = Math.floor(contentOffset.x / layoutMeasurement.width);
    setCurrentSlideIndex(currentIndex > 0 ? currentIndex : 0);
  };

  return (
    <View style={styles.container}>
      <View style={styles.slidesContainer}>
        <FlatList
          ref={flatListRef}
          data={items}
          renderItem={({item}) => (
            <SlideItem item={item} currentSlideIndex={currentSlideIndex} />
          )}
          keyExtractor={item => item.title}
          horizontal
          pagingEnabled
          onScroll={onScroll}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <View style={styles.buttonsContainer}>
        <CustomButton
          text="Iniciar sesión"
          onPress={() => navigation.navigate('Signin')}
        />
        <Pressable
          style={{
            alignSelf: 'center',
          }}
          onPress={() => navigation.navigate('Signup')}>
          <Text
            style={{
              ...globalStyles.link,
              textAlign: 'center',
            }}>
            Crear cuenta
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

interface SlideItemProps {
  item: Slide;
  currentSlideIndex: number;
}

const SlideItem = ({item, currentSlideIndex}: SlideItemProps) => {
  const {width} = useWindowDimensions();
  const {title, desc, SvgComponent} = item;

  return (
    <View
      style={{
        flex: 1,
        width,
        justifyContent: 'center',
      }}>
      <SvgComponent
        width={width * 0.7}
        height={width * 0.7}
        style={{
          alignSelf: 'center',
        }}
      />

      <Text
        style={[
          globalStyles.title,
          {
            marginBottom: 7,
            fontWeight: 600,
            textAlign: 'center',
          },
        ]}>
        {title}
      </Text>
      <Text
        style={{
          color: '#afb0b3',
          fontSize: 18,
          textAlign: 'center',
          marginHorizontal: 15,
        }}>
        {desc}
      </Text>

      {items.length > 1 && (
        <View style={styles.dotsContainer}>
          <PaginationDots
            totalDots={items.length}
            activeIndex={currentSlideIndex}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  slidesContainer: {
    flex: 1,
  },
  buttonsContainer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  dotsContainer: {
    marginTop: 40,
  },
});
