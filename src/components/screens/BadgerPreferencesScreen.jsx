import { Text, View, Switch, StyleSheet, Button } from "react-native";
import { useState, useEffect } from "react";
import { useNavigation } from '@react-navigation/native';
import { useArticleFilter } from '../filterContext';


function BadgerPreferencesScreen(props) {

    const [allArticles, setAllArticles] = useState([]);
    const[tags, setTags] = useState([])
    const [isOn, setIsOn] = useState({});
    const navigation = useNavigation();
    const { setFilteredArticles } = useArticleFilter();

    useEffect(()=>{
        fetch('https://cs571.org/api/f23/hw8/articles', {
            headers:{
                'X-CS571-ID': 'bid_3f77594611bcb68f84c6e1f3737d970485ae9f189cd52bfdbf356cbb114bbe6b'
            }
        }).then(res => res.json())
        .then(data => {
            setAllArticles(data);

            const tagList = [];
            data.forEach(article => {
                article.tags.forEach(tag => {
                if (!tagList.includes(tag)) {
                    tagList.push(tag);
                    }
                 });
            });
            setTags(tagList);

            const defaultOn = {};
                tagList.forEach((tag) => {
                defaultOn[tag] = true;
            });
            setIsOn(defaultOn);
        });
    }, []);

  
    const handleSwitchToggle = (tag, value) => {
        setIsOn({ ...isOn, [tag]: value });
      };
      


    useEffect(() => {
        const filterArticles = (articles) => {
            if (Object.values(isOn).every(value => !value)) {
                let filtered = [];
                return filtered;
            } 
            else {
                let filtered = articles.filter((article) => {
                    return article.tags.some((tag) => isOn[tag]);
                });
                return filtered;
            }
        };
    
        setFilteredArticles(filterArticles(allArticles));
    }, [isOn, allArticles]);

      

    return (
        <View>
          {tags.map((tag, index) => (
            <View key={index} style = {styles.card}>
              <Text>{tag}</Text>
              <Switch
               trackColor={{ true: 'darksalmon', false: 'lightgrey' }}
               thumbColor={isOn[tag] ? 'crimson' : 'grey'}
               value={!!isOn[tag]}
               onValueChange={(value) => handleSwitchToggle(tag, value)}
              />
            </View>
          ))}
        </View>
      );
    }

export default BadgerPreferencesScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    card: {
        margin: 20,
        padding: 40,
        borderRadius:100,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {
          width: 2,
          height: 4,
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
      },
  });