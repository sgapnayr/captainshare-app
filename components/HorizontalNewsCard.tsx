import { View, Text, StyleSheet, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';
import React from 'react';
import { COLORS, SIZES } from '../constants';

interface HorizontalNewsCardProps {
  title: string;
  category: string;
  image: ImageSourcePropType;
  date: string;
  onPress: () => void;
}

const HorizontalNewsCard: React.FC<HorizontalNewsCardProps> = ({
  title,
  category,
  image,
  date,
  onPress
}) => {

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, { backgroundColor: COLORS.white }]}>
      <Image
        source={image}
        resizeMode="cover"
        style={styles.image}
      />
      <View style={styles.columnContainer}>
        <Text style={[styles.date, { color: COLORS.grayscale700 }]}>
          {date}
        </Text>
        <View style={styles.topViewContainer}>
          <Text style={[styles.name, { color: COLORS.greyscale900 }]}>
            {title}
          </Text>
        </View>
        <View style={styles.viewContainer}>
          <View style={styles.categoryContainer}>
            <Text style={styles.category}>{category}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: SIZES.width - 32,
    backgroundColor: COLORS.white,
    padding: 6,
    borderRadius: 16,
    marginBottom: 12,
    height: 132,
    alignItems: 'center',
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  columnContainer: {
    flexDirection: 'column',
    marginLeft: 12,
    flex: 1,
  },
  name: {
    fontSize: 17,
    fontFamily: "Urbanist Bold",
    color: COLORS.greyscale900,
    marginVertical: 6,
    marginRight: 40,
  },
  date: {
    fontSize: 10,
    fontFamily: "Urbanist Medium",
    color: COLORS.grayscale700,
    marginVertical: 4,
  },
  topViewContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: SIZES.width - 164,
  },
  bottomViewContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 2,
  },
  viewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  categoryContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: COLORS.tansparentPrimary,
    borderRadius: 3,
  },
  category: {
    fontSize: 10,
    fontFamily: "Urbanist SemiBold",
    color: COLORS.primary,
    marginHorizontal: 4,
  },
});

export default HorizontalNewsCard;
