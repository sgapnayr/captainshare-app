import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-virtualized-view';
import { useNavigation } from '@react-navigation/native';
import { COLORS, icons, images, SIZES } from '../constants';
import SubHeaderItem from '../components/SubHeaderItem';
import { news, newsCategories, recommendedNews } from '../data';
import HorizontalNewsCard from '../components/HorizontalNewsCard';

interface ArticlesProps {
    navigation: any; // Replace 'any' with the correct type if available (e.g. from React Navigation types)
}

type Nav = {
    navigate: (value: string) => void
}

const Articles: React.FC<ArticlesProps> = () => {
    const { navigate } = useNavigation<Nav>();

    /**
     * render header
     */
    const renderHeader = () => {
        return (
            <View style={styles.headerContainer}>
                <View style={styles.headerLeft}>
                    <Image
                        source={images.logo}
                        resizeMode="contain"
                        style={styles.headerLogo}
                    />
                    <Text style={[styles.headerTitle, { color: COLORS.greyscale900 }]}>
                        Articles
                    </Text>
                </View>
                <View style={styles.headerRight}>
                    <TouchableOpacity>
                        <Image
                            source={icons.search3}
                            resizeMode="contain"
                            style={[styles.searchIcon, { tintColor: COLORS.greyscale900 }]}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigate('mybookmarkedarticles')}>
                        <Image
                            source={icons.bookmarkOutline}
                            resizeMode="contain"
                            style={[styles.moreCircleIcon, { tintColor: COLORS.greyscale900 }]}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    /**
     * render trending articles
     */
    const renderTrendingArticles = () => {
        return (
            <View>
                <SubHeaderItem
                    title="Trending"
                    navTitle="See all"
                    onPress={() => navigate('trendingarticles')}
                />
                <FlatList
                    data={news}
                    keyExtractor={(item, index) => index.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <TouchableOpacity>
                            <View style={styles.articleContainer}>
                                <Image source={item.image} resizeMode="cover" style={styles.articleImage} />
                                <Text style={[styles.articleTitle, { color: COLORS.greyscale900 }]}>
                                    {item.title.substring(0, 48)}...
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>
        );
    };

    /**
     * render articles
     */
    const renderArticles = () => {
        const [selectedCategories, setSelectedCategories] = useState<string[]>(['0']);

        const filteredNews = recommendedNews.filter(
            (newsItem) => selectedCategories.includes('0') || selectedCategories.includes(newsItem.categoryId)
        );

        // Category item
        const renderCategoryItem = ({ item }: { item: { id: string; name: string } }) => (
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
                onPress={() => toggleCategory(item.id)}
            >
                <Text style={{ color: selectedCategories.includes(item.id) ? COLORS.white : COLORS.primary }}>
                    {item.name}
                </Text>
            </TouchableOpacity>
        );

        // Toggle category selection
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

        return (
            <View>
                <SubHeaderItem title="Articles" navTitle="See all" onPress={() => navigate('articlesseeall')} />
                <FlatList
                    data={newsCategories}
                    keyExtractor={(item, index) => index.toString()}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    renderItem={renderCategoryItem}
                />
                <View style={{ backgroundColor: COLORS.secondaryWhite, marginVertical: 16 }}>
                    <FlatList
                        data={filteredNews}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <HorizontalNewsCard
                                title={item.title}
                                category={item.category}
                                image={item.image}
                                date={item.date}
                                onPress={() => navigate('articlesdetails')}
                            />
                        )}
                    />
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={[styles.area, { backgroundColor: COLORS.white }]}>
            <View style={[styles.container, { backgroundColor: COLORS.white }]}>
                {renderHeader()}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {renderTrendingArticles()}
                    {renderArticles()}
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
        width: SIZES.width - 32,
        justifyContent: 'space-between',
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerLogo: {
        height: 24,
        width: 24,
        tintColor: COLORS.primary,
    },
    headerTitle: {
        fontSize: 20,
        fontFamily: "Urbanist Bold",
        color: COLORS.black,
        marginLeft: 12,
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchIcon: {
        width: 24,
        height: 24,
        tintColor: COLORS.black,
    },
    moreCircleIcon: {
        width: 24,
        height: 24,
        tintColor: COLORS.black,
        marginLeft: 12,
    },
    articleContainer: {
        height: 218,
        width: 220,
        flexDirection: 'column',
        marginRight: 12,
    },
    articleImage: {
        width: 220,
        height: 140,
        borderRadius: 20,
    },
    articleTitle: {
        fontSize: 18,
        fontFamily: "Urbanist Bold",
        color: COLORS.greyscale900,
        marginTop: 12,
    },
});

export default Articles;