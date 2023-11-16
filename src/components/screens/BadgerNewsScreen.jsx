import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import ArticleDetailsScreen from '../ArticleDetailsScreen';
import BadgerNewsItemCard from "../BadgersNewsItemCard";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useArticleFilter } from '../filterContext';


const NewsStack = createNativeStackNavigator();

function BadgerNewsScreen(props) {
    const [articles, setArticles] = useState([]);
    const { filteredArticles } = useArticleFilter();

    useEffect(()=>{
        fetch('https://cs571.org/api/f23/hw8/articles', {
            headers:{
                'X-CS571-ID': 'bid_3f77594611bcb68f84c6e1f3737d970485ae9f189cd52bfdbf356cbb114bbe6b'
            }
        }).then(res => res.json())
        .then(data => {
            setArticles(data);
            });
        }, []);

    const NewsList = ({ navigation }) => {
         if (filteredArticles.length != 0) {
            return (
                <ScrollView>
                  <View style={styles.container}>
                    {filteredArticles.map((article) => (
                      <BadgerNewsItemCard key={article.id} article={article} navigation={navigation} />
                    ))}
                  </View>
                </ScrollView>
              );
              }
         
        else{
            return (
                <View style={styles.container}>
                  <Text style={styles.title}>No articles found that fit the selected preferences!</Text>
                </View>
              );
        }
      };

    return (
        <NewsStack.Navigator>
            <NewsStack.Screen
             name="NewsList"
             component={NewsList} 
             options={{ headerShown: false }}
        />
        <NewsStack.Screen
          name="ArticleDetails"
          component={ArticleDetailsScreen}
          options={{ headerShown: true, title: 'Article' }}
        />
      </NewsStack.Navigator>
)}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontWeight: 'bold',
      fontSize: 20,
      marginBottom: 10,
    },
    card: {
        margin: 10,
        padding: 16,
        borderRadius: 8,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
  });

export default BadgerNewsScreen;
