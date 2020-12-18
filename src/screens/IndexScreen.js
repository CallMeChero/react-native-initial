import React, {useContext} from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import { Context as BlogContext } from '../context/BlogContext';
// u slucaju da imamo vise contexta
import { FontAwesome } from '@expo/vector-icons';

const IndexScreen = () => {
    const { state, addBlogPost } = useContext(BlogContext);

    return <View>
        <Button title="Add blog post" onPress={() => addBlogPost()}></Button>
        <FlatList 
        data={state}
        keyExtractor={(blogPost) => blogPost.title}
        renderItem={({item}) => {
            return <View style={styles.row}>
                    <Text style={styles.title}>{item.title}</Text>
                    <FontAwesome name="trash-o" style={styles.icon}/>
                </View>
        }}/>
    </View>;
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