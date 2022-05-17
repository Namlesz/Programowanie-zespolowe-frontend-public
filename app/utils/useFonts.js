import * as Font from 'expo-font';

const useFonts = async () => {
    await Font.loadAsync({
        'arial-bold': require('../assets/fonts/arial-bold.ttf')
    });
};
export default useFonts;
