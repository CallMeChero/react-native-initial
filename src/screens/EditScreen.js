import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Context } from '../context/BlogContext';

const EditScreen = ({navigation}) => {
    const { state } = useContext(Context);
    const blogPost = state.find(post => post.id === navigation.getParam('id'))
    const [title, setTitle] = useState(blogPost.title);
    const [content, setContent] = useState(blogPost.content);
    return (
        <View>
            <Text>Edit Title</Text>
            <TextInput value={title} onChangeText={(newTitle) => setTitle(newTitle)}/>
            <Text>Edit Context</Text>
            <TextInput value={content} onChangeText={(newContext) => setContent(newContext)}/>
        </View>
    );
}

const styles = StyleSheet.create({});

export default EditScreen;