import {showMessage} from 'react-native-flash-message';

export function notWorking(){
    showMessage({
        message: 'Przepraszamy, ta funkcja nie jest jeszcze gotowa',
        type: 'info'
    });
}
