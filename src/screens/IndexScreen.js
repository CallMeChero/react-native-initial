import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity } from 'react-native';
import { Context as BlogContext } from '../context/BlogContext';
// u slucaju da imamo vise contexta
import { FontAwesome } from '@expo/vector-icons';

const IndexScreen = ({ navigation }) => {
    const { state, deleteBlogPost, getBlogPosts } = useContext(BlogContext);

    useEffect(() => {
        getBlogPosts();

        /*
            Posto imamo useEffect koji ima kao 2 parametar []
            moramo gledati da li je doslo do ponovnov vracanja na rutu
            jer se nece opaliti API nakon sto napravimo neki API request
        */
        const listener = navigation.addListener('didFocus', () => {
            getBlogPosts();
        });

        // alias za ngOnDestroy u Angularu
        return () => {
            listener.remove();
        }
    }, []);

    return <View>
        <FlatList 
        data={state}
        keyExtractor={(blogPost) => blogPost.title}
        renderItem={({item}) => {
            return (
            <TouchableOpacity 
                onPress={() => navigation.navigate('Show', { id: item.id })}
            >
                <View style={styles.row}>
                    <Text style={styles.title}>{item.title} - {item.id}</Text>
                    <TouchableOpacity onPress={() => deleteBlogPost(item.id)}>
                        <FontAwesome name="trash-o" style={styles.icon}/>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
            );
        }}/>
    </View>;
};

IndexScreen.navigationOptions = ({ navigation }) => {
    return {
        headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Create')}>
                <FontAwesome name="plus" size={30} color="black" style={{ marginRight: 5}}/>
            </TouchableOpacity>
        )
    };
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderColor: 'gray'
    },
    title: {
        fontSize: 18
    },
    icon: {
        fontSize: 24,
        color: 'crimson'
    }
});

export default IndexScreen;