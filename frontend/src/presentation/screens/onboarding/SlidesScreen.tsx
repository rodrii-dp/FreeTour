import React, {useRef} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  useWindowDimensions,
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
import {useScroll} from '../../hooks/useScroll.tsx';

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
  const flatListRef = useRef<FlatList>(null);
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  const {width} = useWindowDimensions();

  const {activeIndex: currentSlideIndex, setActiveIndex, onScroll} = useScroll();

  const isLastSlide = currentSlideIndex === items.length - 1;

  const goToNextSlide = () => {
    if (isLastSlide) {
      navigation.navigate('Signin');
    } else {
      const nextIndex = currentSlideIndex + 1;
      flatListRef.current?.scrollToIndex({index: nextIndex, animated: true});
      setActiveIndex(nextIndex);
    }
  };

  const skipOnboarding = () => {
    navigation.navigate('Signin');
  };

  return (
    <View style={styles.container}>
      {/* Skip button – hidden on last slide */}
      <View style={styles.skipRow}>
        {!isLastSlide && (
          <Pressable onPress={skipOnboarding} style={styles.skipButton}>
            <Text style={styles.skipText}>Saltar</Text>
          </Pressable>
        )}
      </View>

      {/* Slides */}
      <View style={styles.slidesContainer}>
        <FlatList
          ref={flatListRef}
          data={items}
          renderItem={({item}) => <SlideItem item={item} width={width} />}
          keyExtractor={item => item.title}
          horizontal
          pagingEnabled
          onScroll={onScroll}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          getItemLayout={(_, index) => ({
            length: width,
            offset: width * index,
            index,
          })}
        />
      </View>

      {/* Pagination dots – outside the FlatList so they don't flicker */}
      <View style={styles.dotsContainer}>
        <PaginationDots
          totalDots={items.length}
          activeIndex={currentSlideIndex}
        />
      </View>

      {/* Action buttons */}
      <View style={styles.buttonsContainer}>
        <CustomButton
          text={isLastSlide ? 'Empezar' : 'Siguiente'}
          onPress={goToNextSlide}
        />
        <Pressable
          style={styles.secondaryLink}
          onPress={() => navigation.navigate('Signup')}>
          <Text style={globalStyles.link}>Crear cuenta</Text>
        </Pressable>
      </View>
    </View>
  );
};

interface SlideItemProps {
  item: Slide;
  width: number;
}

const SlideItem = ({item, width}: SlideItemProps) => {
  const {title, desc, SvgComponent} = item;

  return (
    <View style={[styles.slideItem, {width}]}>
      <SvgComponent
        width={width * 0.7}
        height={width * 0.7}
        style={styles.slideImage}
      />
      <Text
        style={[
          globalStyles.title,
          styles.slideTitle,
        ]}>
        {title}
      </Text>
      <Text style={styles.slideDesc}>{desc}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  skipRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingTop: 56,
    minHeight: 80,
  },
  skipButton: {
    padding: 8,
  },
  skipText: {
    color: '#FF5A5F',
    fontSize: 16,
    fontWeight: '600',
  },
  slidesContainer: {
    flex: 1,
  },
  dotsContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  buttonsContainer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    gap: 12,
  },
  secondaryLink: {
    alignSelf: 'center',
  },
  slideItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  slideImage: {
    alignSelf: 'center',
  },
  slideTitle: {
    marginBottom: 7,
    fontWeight: '600',
    textAlign: 'center',
  },
  slideDesc: {
    color: '#afb0b3',
    fontSize: 18,
    textAlign: 'center',
  },
});
