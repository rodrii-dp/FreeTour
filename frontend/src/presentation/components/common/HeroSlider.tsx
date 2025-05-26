import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import YellowUnderline from '../../assets/yellow-underline.svg';
import {Tour} from '../../../domain/entities/tour.ts';

interface HeroSlide {
  id: string;
  tourId: string;
  imageUrl: any; // Can be require() or uri
  title: string;
  subtitle: string;
}

interface HeroSliderProps {
  slides: HeroSlide[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  tours: Tour[];
}

// Define el tipo para la navegación
type HomeStackParamList = {
  TourDetails: {tour: Tour};
};

const {width} = Dimensions.get('window');

export const HeroSlider = ({
  slides,
  autoPlay = true,
  autoPlayInterval = 5000,
  tours = [],
}: HeroSliderProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollX = new Animated.Value(0);
  // Especifica el tipo correcto para la navegación
  const navigation = useNavigation<NavigationProp<HomeStackParamList>>();

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (autoPlay && slides.length > 1) {
      interval = setInterval(() => {
        setActiveIndex(prevIndex => (prevIndex + 1) % slides.length);
      }, autoPlayInterval);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [autoPlay, autoPlayInterval, slides.length]);

  // Navigate to tour details
  const navigateToTourDetails = (slide: HeroSlide) => {
    // If the slide has a tourId, find the corresponding tour
    if (slide.tourId) {
      const tour = tours.find(t => t.id === slide.tourId);
      if (tour) {
        navigation.navigate('TourDetails', {tour});
        return;
      }
    }

    // If no tourId or tour not found, navigate to the first tour as fallback
    if (tours.length > 0) {
      navigation.navigate('TourDetails', {tour: tours[0]});
    } else {
      console.log('No tours available to navigate to');
    }
  };

  const handleDotPress = (index: number) => {
    setActiveIndex(index);
  };

  const handleCTAPress = (slide: HeroSlide) => {
    // Navigate to tour details or special offer page
    // navigation.navigate('SpecialOffer', { offerId: slide.id });
    console.log('CTA pressed for slide:', slide.id);
  };

  // Get the tour associated with the current slide
  const getCurrentTour = () => {
    const currentSlide = slides[activeIndex];
    if (currentSlide.tourId) {
      return tours.find(t => t.id === currentSlide.tourId);
    }
    return null;
  };

  // Calculate discount information
  const getDiscountInfo = () => {
    const tour = getCurrentTour();
    if (!tour || !tour.price.discount) {
      return null;
    }

    const discount = tour.price.discount;
    const originalPrice = tour.price.value;
    let discountedPrice: number;

    if (discount.type === 'porcentaje') {
      discountedPrice = originalPrice - (originalPrice * discount.amount) / 100;
    } else {
      discountedPrice = originalPrice - discount.amount;
    }

    return {
      originalPrice,
      discountedPrice,
      description: discount.description || '¡Oferta!',
    };
  };

  const discountInfo = getDiscountInfo();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.9}
        style={{flex: 1}}
        onPress={() => navigateToTourDetails(slides[activeIndex])}>
        <ImageBackground
          source={slides[activeIndex].imageUrl}
          style={styles.heroImage}
          imageStyle={styles.backgroundImage}>
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>{slides[activeIndex].title}</Text>
            <YellowUnderline />
            <Text style={styles.heroSubtitle}>
              {slides[activeIndex].subtitle}
            </Text>
            <Text style={styles.heroMoreInfo}>Más información &rarr;</Text>
          </View>

          {discountInfo && (
            <TouchableOpacity
              style={styles.offerContainer}
              onPress={() => handleCTAPress(slides[activeIndex])}>
              <View style={styles.offerContent}>
                <Text style={styles.originalPrice}>
                  €{discountInfo.originalPrice}
                </Text>
                <Text style={styles.discountedPrice}>
                  €{discountInfo.discountedPrice.toFixed(0)}
                </Text>
                <Text style={styles.offerText}>{discountInfo.description}</Text>
              </View>
            </TouchableOpacity>
          )}

          {slides.length > 1 && (
            <View style={styles.pagination}>
              {slides.map((_, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.paginationDot,
                    index === activeIndex && styles.paginationDotActive,
                  ]}
                  onPress={() => handleDotPress(index)}
                />
              ))}
            </View>
          )}
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 300,
    width: '100%',
    marginBottom: 20,
  },
  heroImage: {
    flex: 1,
    width: '100%',
    resizeMode: 'cover',
    justifyContent: 'flex-end',
  },
  backgroundImage: {
    width: '100%',
    resizeMode: 'cover',
  },
  heroContent: {
    padding: 20,
    backgroundColor: 'transparent',
  },
  heroTitle: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: -5,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
  },
  heroSubtitle: {
    color: 'white',
    fontSize: 16,
    marginTop: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
  },
  heroMoreInfo: {
    color: 'white',
    fontSize: 14,
    textDecorationLine: 'underline',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  paginationDotActive: {
    backgroundColor: '#FFFFFF',
  },
  offerContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#FF5A5F',
    borderRadius: 8,
    padding: 0,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    overflow: 'hidden',
  },
  offerContent: {
    alignItems: 'center',
    padding: 8,
  },
  originalPrice: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
  discountedPrice: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 28,
  },
  offerText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 2,
    marginTop: 2,
    borderRadius: 4,
  },
});
