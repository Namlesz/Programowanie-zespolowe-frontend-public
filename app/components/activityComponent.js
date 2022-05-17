import React from 'react';
import styles from '../styles';
import { View, ActivityIndicator } from 'react-native';

const ActivityComponent = (props) => {
    return (
        <View style={styles.loading}>
            <ActivityIndicator color={'#62eae8'} size="large" />
        </View>
    );
};

export default ActivityComponent;
