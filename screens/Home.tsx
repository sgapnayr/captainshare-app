import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
  ListRenderItemInfo,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-virtualized-view';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {banners, categories, recommendedDoctors} from '../data';
import {COLORS, icons, images, SIZES} from '../constants';
import SubHeaderItem from '../components/SubHeaderItem';
import Category from '../components/Category';
import HorizontalDoctorCard from '../components/HorizonalCaptainsCard';

interface BannerItem {
  id: number;
  discount: string;
  discountName: string;
  bottomTitle: string;
  bottomSubtitle: string;
}

interface CategoryItem {
  id: string;
  name: string;
}

const Home = () => {
  const navigation = useNavigation<NavigationProp<any>>();

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const keyExtractor = (item: BannerItem) => item.id.toString();

  const handleEndReached = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % banners.length);
  };

  const renderDot = (index: number) => {
    return (
      <View
        style={[styles.dot, index === currentIndex ? styles.activeDot : null]}
        key={index}
      />
    );
  };

  const renderBannerItem = ({item}: ListRenderItemInfo<BannerItem>) => (
    <View style={styles.bannerContainer}>
      <View style={styles.bannerTopContainer}>
        <View>
          <Text style={styles.bannerDicount}>{item.discount} OFF</Text>
          <Text style={styles.bannerDiscountName}>{item.discountName}</Text>
        </View>
        <Text style={styles.bannerDiscountNum}>{item.discount}</Text>
      </View>
      <View style={styles.bannerBottomContainer}>
        <Text style={styles.bannerBottomTitle}>{item.bottomTitle}</Text>
        <Text style={styles.bannerBottomSubtitle}>{item.bottomSubtitle}</Text>
      </View>
    </View>
  );
  /**
   * Render header
   */
  const renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.viewLeft}>
          <Image
            source={icons.user}
            resizeMode="contain"
            style={styles.userIcon}
          />
          <View style={styles.viewNameContainer}>
            <Text style={styles.greeeting}>Good Morning👋</Text>
            <Text
              style={[
                styles.title,
                {
                  color: COLORS.greyscale900,
                },
              ]}>
              User
            </Text>
          </View>
        </View>
        <View style={styles.viewRight}>
          <TouchableOpacity
            onPress={() => navigation.navigate('notifications')}>
            <Image
              source={icons.notificationBell2}
              resizeMode="contain"
              style={[styles.bellIcon, {tintColor: COLORS.greyscale900}]}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('favourite')}>
            <Image
              source={icons.heartOutline}
              resizeMode="contain"
              style={[styles.bookmarkIcon, {tintColor: COLORS.greyscale900}]}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  /**
   * Render search bar
   */
  const renderSearchBar = () => {
    const handleInputFocus = () => {
      // Redirect to another screen
      navigation.navigate('search');
    };

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('search')}
        style={[
          styles.searchBarContainer,
          {
            backgroundColor: COLORS.secondaryWhite,
          },
        ]}>
        <TouchableOpacity>
          <Image
            source={icons.search2}
            resizeMode="contain"
            style={styles.searchIcon}
          />
        </TouchableOpacity>
        <TextInput
          placeholder="Search"
          placeholderTextColor={COLORS.gray}
          style={styles.searchInput}
          onFocus={handleInputFocus}
        />
        <TouchableOpacity>
          <Image
            source={icons.filter}
            resizeMode="contain"
            style={styles.filterIcon}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  /**
   * Render banner
   */
  const renderBanner = () => {
    return (
      <View style={styles.bannerItemContainer}>
        <FlatList
          data={banners}
          renderItem={renderBannerItem}
          keyExtractor={keyExtractor}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.5}
          onMomentumScrollEnd={event => {
            const newIndex = Math.round(
              event.nativeEvent.contentOffset.x / SIZES.width,
            );
            setCurrentIndex(newIndex);
          }}
        />
        <View style={styles.dotContainer}>
          {banners.map((_, index) => renderDot(index))}
        </View>
      </View>
    );
  };

  /**
   * Render categories
   */
  const renderCategories = () => {
    return (
      <View>
        <SubHeaderItem
          title="Categories"
          navTitle="See all"
          onPress={() => navigation.navigate('categories')}
        />
        <FlatList
          data={categories.slice(1, 9)}
          keyExtractor={(item, index) => index.toString()}
          horizontal={false}
          numColumns={4} // Render two items per row
          renderItem={({item, index}) => (
            <Category
              name={item.name}
              icon={item.icon}
              iconColor={item.iconColor}
              backgroundColor={item.backgroundColor}
            />
          )}
        />
      </View>
    );
  };

  /**
   * render top doctor
   */
  const renderTopDoctors = () => {
    const [selectedCategories, setSelectedCategories] = useState(['1']);

    const filteredDoctors = recommendedDoctors.filter(
      doctor =>
        selectedCategories.includes('0') ||
        selectedCategories.includes(doctor.categoryId),
    );

    // Category item
    const renderCategoryItem = ({item}: {item: CategoryItem}) => (
      <TouchableOpacity
        style={{
          backgroundColor: selectedCategories.includes(item.id)
            ? COLORS.primary
            : 'transparent',
          padding: 10,
          marginVertical: 5,
          borderColor: COLORS.primary,
          borderWidth: 1.3,
          borderRadius: 24,
          marginRight: 12,
        }}
        onPress={() => toggleCategory(item.id)}>
        <Text
          style={{
            color: selectedCategories.includes(item.id)
              ? COLORS.white
              : COLORS.primary,
          }}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );

    // Toggle category selection
    const toggleCategory = (categoryId: any) => {
      const updatedCategories = [...selectedCategories];
      const index = updatedCategories.indexOf(categoryId);

      if (index === -1) {
        updatedCategories.push(categoryId);
      } else {
        updatedCategories.splice(index, 1);
      }

      setSelectedCategories(updatedCategories);
    };

    return (
      <View>
        <SubHeaderItem
          title="Top Captains"
          navTitle="See all"
          onPress={() => navigation.navigate('topdoctors')}
        />
        <FlatList
          data={categories}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          horizontal
          renderItem={renderCategoryItem}
        />
        <View
          style={{
            backgroundColor: COLORS.secondaryWhite,
            marginVertical: 16,
          }}>
          <FlatList
            data={filteredDoctors}
            keyExtractor={item => item.id}
            renderItem={({item}) => {
              return (
                <HorizontalDoctorCard
                  name={item.name}
                  image={item.image}
                  distance={item.license}
                  hourlyRate={item.hourlyRate}
                  hospital={item.location}
                  rating={item.rating}
                  numReviews={item.numReviews}
                  isAvailable={item.isAvailable}
                  onPress={() => navigation.navigate('doctordetails')}
                />
              );
            }}
          />
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={[styles.area, {backgroundColor: COLORS.white}]}>
      <View style={[styles.container, {backgroundColor: COLORS.white}]}>
        {renderHeader()}
        <ScrollView showsVerticalScrollIndicator={false}>
          {renderSearchBar()}
          {renderBanner()}
          {renderCategories()}
          {renderTopDoctors()}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  area: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    width: SIZES.width - 32,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 16,
  },
  userIcon: {
    width: 48,
    height: 48,
    borderRadius: 32,
  },
  viewLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  greeeting: {
    fontSize: 12,
    fontFamily: 'Urbanist Regular',
    color: 'gray',
    marginBottom: 4,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Urbanist Bold',
    color: COLORS.greyscale900,
  },
  viewNameContainer: {
    marginLeft: 12,
  },
  viewRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bellIcon: {
    height: 24,
    width: 24,
    tintColor: COLORS.black,
    marginRight: 8,
  },
  bookmarkIcon: {
    height: 24,
    width: 24,
    tintColor: COLORS.black,
  },
  searchBarContainer: {
    width: SIZES.width - 32,
    backgroundColor: COLORS.secondaryWhite,
    padding: 16,
    borderRadius: 12,
    height: 52,
    marginVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchIcon: {
    height: 24,
    width: 24,
    tintColor: COLORS.gray,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Urbanist Regular',
    marginHorizontal: 8,
  },
  filterIcon: {
    width: 24,
    height: 24,
    tintColor: COLORS.primary,
  },
  bannerContainer: {
    width: SIZES.width - 32,
    height: 154,
    paddingHorizontal: 28,
    paddingTop: 28,
    borderRadius: 32,
    backgroundColor: COLORS.primary,
  },
  bannerTopContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bannerDicount: {
    fontSize: 12,
    fontFamily: 'Urbanist Medium',
    color: COLORS.white,
    marginBottom: 4,
  },
  bannerDiscountName: {
    fontSize: 16,
    fontFamily: 'Urbanist Bold',
    color: COLORS.white,
  },
  bannerDiscountNum: {
    fontSize: 46,
    fontFamily: 'Urbanist Bold',
    color: COLORS.white,
  },
  bannerBottomContainer: {
    marginTop: 8,
  },
  bannerBottomTitle: {
    fontSize: 14,
    fontFamily: 'Urbanist Medium',
    color: COLORS.white,
  },
  bannerBottomSubtitle: {
    fontSize: 14,
    fontFamily: 'Urbanist Medium',
    color: COLORS.white,
    marginTop: 4,
  },
  userAvatar: {
    width: 64,
    height: 64,
    borderRadius: 999,
  },
  firstName: {
    fontSize: 16,
    fontFamily: 'Urbanist SemiBold',
    color: COLORS.dark2,
    marginTop: 6,
  },
  bannerItemContainer: {
    width: '100%',
    paddingBottom: 10,
    backgroundColor: COLORS.primary,
    height: 170,
    borderRadius: 32,
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: COLORS.white,
  },
});

export default Home;
