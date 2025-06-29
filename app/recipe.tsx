import { TText } from '@/components/ThemedText';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function Recipe() {

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TText type="title">Recipes Here</TText>
                <TText type="subtitle">Yummy</TText>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        alignItems: 'center',
        marginTop: 60,
        marginBottom: 40,
    },
    inputContainer: {
        gap: 16,
        marginBottom: 40,
    },
    textInput: {
        borderWidth: 1,
        borderRadius: 12,
        padding: 16,
        fontSize: 16,
        minHeight: 120,
    },
    generateButton: {
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    placeholder: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.6,
    },
}); 