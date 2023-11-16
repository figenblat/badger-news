// ArticleDetailsScreen.jsx
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Animated, Linking, Image, Pressable} from 'react-native';
import { ScrollView } from 'react-native';

const ArticleDetailsScreen = ({ route }) => {
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const fadeAnimation = useRef(new Animated.Value(0)).current;

  const articleImg = "https://raw.githubusercontent.com/CS571-F23/hw8-api-static-content/main/articles/" + details.img;

  useEffect(()=>{
    fetch(`https://cs571.org/api/f23/hw8/article?id=${route.params.articleId}`, {
        headers:{
            'X-CS571-ID': 'bid_3f77594611bcb68f84c6e1f3737d970485ae9f189cd52bfdbf356cbb114bbe6b'
        }
    }).then(res => res.json())
    .then(data => {
        setDetails(data);
        fadeInAnimation();
        setLoading(false);
        });
    }, []);


  const fadeInAnimation = () => {
    Animated.timing(fadeAnimation, {
      duration: 2500,
      useNativeDriver: true,
    }).start();
  };

  const bodyText = (body) => {
    return body.map((paragraph, index) => (
      <Text key={index} style={styles.paragraph}>
        {paragraph}
      </Text>
    ));
};
  

  const handleOpenURL = () => {
    if (details.url) {
      Linking.openURL(details.url);
    }
  };


  return (
    <ScrollView>
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#00000f" />
      ) : (
        <>
        <Animated.View style={[styles.fade, {opacity: fadeAnimation,},]}>
            <Image source={{ uri: articleImg }} style={styles.image} />
            <Text style={styles.title}>{details.title}</Text>
            <Text style={styles.author}>Author: {details.author}</Text>
            <Text style={styles.posted}>Posted Date: {details.posted}</Text>
            {bodyText(details.body)}
            <Pressable onPress={handleOpenURL} style= {styles.centerLink}>
                <Text style={styles.link}>Read full article here.</Text>
            </Pressable>
        </Animated.View>
        </>
      )}
    </View>
  </ScrollView>
);
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
  },
  author: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  posted: {
    marginBottom: 8,
  },
  paragraph: {
    marginBottom: 8,
  },
  centerLink: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
    marginTop: 16, 
  },
  image: {
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  fade: {
    padding: 20,
    backgroundColor: 'eggshell',
  },
});

export default ArticleDetailsScreen;
