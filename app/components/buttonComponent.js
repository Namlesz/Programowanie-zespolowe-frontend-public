import React from 'react';
import styles from '../styles';
import { TouchableOpacity, Text} from 'react-native';
import { NeomorphBox } from 'react-native-neomorph-shadows';

const ButtonComponent = (props) => {
    return(
    <NeomorphBox style={styles.neu}>
        <NeomorphBox
            inner
            lightShadowColor="#b3fffd"
            darkShadowColor="#13d8d5"
            style={styles.neuAcceptInner_hidden}
        >
            <TouchableOpacity
                activeOpacity={0.75}
                style={styles.button}
                onPress={props.onPress}
                disabled={props.disabled}
            >
                <Text style={styles.text0}>{props.title}</Text>
            </TouchableOpacity>
        </NeomorphBox>
    </NeomorphBox>
    )
}

export default ButtonComponent;
