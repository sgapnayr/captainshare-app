import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, icons } from '../constants';
import { ScrollView } from 'react-native-virtualized-view';
import HorizontalNewsCard from '../components/HorizontalNewsCard';
import { newsCategories, trendingNews } from '../data';
import { NavigationProp, useNavigation } from '@react-navigation/native';

interface NewsItem {
  id: string;
  title: string;
  category: string;
  image: any;
  date: string;
  categoryId: string;
}

interface CategoryItem {
  id: string;
  name: string;
}

interface TrendingArticlesProps {
  navigation: any;
}

const TrendingArticles: React.FC<TrendingArticlesProps> = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['0']);

  const filteredNews = trendingNews.filter((newsItem: NewsItem) =>
    selectedCategories.includes('0') || selectedCategories.includes(newsItem.categoryId)
  );

  const renderCategoryItem = ({ item }: { item: CategoryItem }) => (
    <TouchableOpacity
      style={{
        backgroundColor: selectedCategories.includes(item.id) ? COLORS.primary : 'transparent',
        padding: 10,
        marginVertical: 5,
        borderColor: COLORS.primary,
        borderWidth: 1.3,
        borderRadius: 24,
        marginRight: 12,
      }}
      onPress={() => toggleCategory(item.id)}>
      <Text style={{
        color: selectedCategories.includes(item.id) ? COLORS.white : COLORS.primary
      }}>{item.name}</Text>
    </TouchableOpacity>
  );

  const toggleCategory = (categoryId: string) => {
    const updatedCategories = [...selectedCategories];
    const index = updatedCategories.indexOf(categoryId);

    if (index === -1) {
      updatedCategories.push(categoryId);
    } else {
      updatedCategories.splice(index, 1);
    }

    setSelectedCategories(updatedCategories);
  };

  const renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={icons.back}
              resizeMode="contain"
              style={[styles.backIcon, { tintColor: COLORS.black }]}
            />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: COLORS.black }]}>
            Trending
          </Text>
        </View>
        <TouchableOpacity onPress={() => {/* setModalVisible(true) */ }}>
          <Image
            source={icons.moreCircle}
            resizeMode="contain"
            style={[styles.moreIcon, { tintColor: COLORS.black }]}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.area, { backgroundColor: COLORS.white }]}>
      <View style={[styles.container, { backgroundColor: COLORS.white }]}>
        {renderHeader()}
        <ScrollView showsVerticalScrollIndicator={false}>
          <FlatList
            data={newsCategories}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            horizontal
            renderItem={renderCategoryItem}
          />
          <View style={{ backgroundColor: COLORS.secondaryWhite, marginVertical: 16 }}>
            <FlatList
              data={filteredNews}
              keyExtractor={(item) => item.id}
              renderItem={({ item }: { item: NewsItem }) => (
                <HorizontalNewsCard
                  title={item.title}
                  category={item.category}
                  image={item.image}
                  date={item.date}
                  onPress={() => navigation.navigate('articlesdetails')}
                />
              )}
            />
          </View>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 16,
  },
  scrollView: {
    backgroundColor: COLORS.tertiaryWhite,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backIcon: {
    height: 24,
    width: 24,
    tintColor: COLORS.black,
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: "Urbanist Bold",
    color: COLORS.black,
  },
  moreIcon: {
    width: 24,
    height: 24,
    tintColor: COLORS.black,
  },
});

export default TrendingArticles;