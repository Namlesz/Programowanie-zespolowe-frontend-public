import React from 'react';
import { InputOutline } from 'react-native-input-outline';
import styles from '../styles';

const InputOutlineComponent = (props) => {
    return (
        <InputOutline
            activeColor={'#ff5f71'}
            fontSize={16}
            paddingVertical={20}
            backgroundColor={'rgba(0,0,0,0)'}
            style={styles.textInput}
            value={props.value}
            placeholder={props.placeholder}
            onChangeText={props.onChangeText}
            secureTextEntry={props.secureTextEntry}
            selectionColor={'rgb(98, 234, 232)'}
            keyboardType={props.keyboardType}
        />
    );
};
export default InputOutlineComponent;
