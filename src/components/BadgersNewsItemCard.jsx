
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const BadgerNewsItemCard = ({ article, navigation }) => {

  const articleImg = "https://raw.githubusercontent.com/CS571-F23/hw8-api-static-content/main/articles/" + article.img;

  const selectArticle = () => {
    navigation.navigate('ArticleDetails', { articleId: article.fullArticleId });
  };


  return (
    <TouchableOpacity onPress={selectArticle}>
      <View style = {styles.card}> 
        <Image source={{ uri: articleImg }} style={styles.image} />
        <Text style = {styles.title}>{article.title}</Text>
     </View>
    </TouchableOpacity>
  );
};


export default BadgerNewsItemCard;

const styles = StyleSheet.create({
  card: {
    margin: 5,
    padding: 16,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    height: 200,
    width: 375,
    borderRadius: 8,
    marginBottom: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
