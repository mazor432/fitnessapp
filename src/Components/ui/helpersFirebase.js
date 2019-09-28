import { firebase } from '../../firebase';

export const firebaseLooper = (snapshot) => {
    const data = [];
    snapshot.forEach((childSnapshot) => {
        data.push({
            ...childSnapshot.val(),
            id: childSnapshot.key
        })
    });
    return data;
}

export const logoutFirebase = () => {
    firebase.auth().signOut().then(() => {
    }, (error) => {
        console.log('Error loging out')
    })

}