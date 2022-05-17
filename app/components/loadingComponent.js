import React from 'react';
import {ActivityIndicator, View} from "react-native";
import styles from "../styles";

const LoadingComponent = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#63ece9"/>
            </View>
        </View>
    )
}
export default LoadingComponent;