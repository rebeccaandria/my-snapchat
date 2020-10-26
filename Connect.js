import React from 'react'
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Keyboard,
    Button,
    AsyncStorage
} from 'react-native'

export default class Connect extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: ''
        }
    }

    submit = () => {

        const { navigation } = this.props

        let collection = {}

        collection.email = this.state.email
        collection.password = this.state.password
        console.warn(collection)

        var url = 'http://snapi.epitech.eu/connection';

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(collection),
            headers: new Headers({
                Accept: 'application/json',
                'Content-Type': 'application/json'
            })
        }).then(response => response.json())
            .catch(error => console.error('Error:', error))
            .then(async responseJson => {
                console.log('Success:', responseJson.data)

                try {
                    await AsyncStorage.setItem(
                        'token',
                        responseJson.data.token
                    )
                    navigation.navigate('SnapImage')

                } catch (error) {
                    console.error(error)
                }
            })

        const { email, password } = this.state

        if (email == "") {
            this.setState({ Error: 'merci de remplir votre email' })
        }
        else if (password == "") {
            this.setState({ Error: 'merci d\'entrer votre mot de passe' })
        }

        Keyboard.dismiss();
    }

    render() {

        const { navigation } = this.props

        return (
            <View style={styles.register}>

                <Text style={styles.header}>Tu as déjà un compte ?</Text>

                <TextInput style={styles.textinput} placeholder="Email"
                    onChangeText={
                        email => this.setState({ email })
                    } />
                <TextInput style={styles.textinput} placeholder="Mot de passe"
                    onChangeText={
                        password => this.setState({ password })
                    }
                />

                <Text style={{ color: 'red', textAlign: 'center' }}>
                    {this.state.Error}
                </Text>

                <TouchableOpacity
                    onPress={this.submit}
                    style={styles.button}>
                    <Text style={styles.btntext}>Envoyer</Text>
                </TouchableOpacity>

                <Button
                    style={styles.button}
                    title="Register"
                    onPress={() => navigation.navigate('Register')}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    register: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#455d7c',
        paddingLeft: 60,
        paddingRight: 60,
    },
    header: {
        color: 'white',
        textAlign: 'center',
        fontSize: 24,
        paddingBottom: 10,
        marginBottom: 40,
        borderBottomColor: '#199187',
        borderBottomWidth: 1,
    },
    textinput: {
        alignSelf: "stretch",
        height: 40,
        marginBottom: 30,
        borderBottomColor: 'rgba(72, 167, 154, 0.63)',
        borderBottomWidth: 1,
        color: 'white',
        backgroundColor: 'rgba(72, 167, 154, 0.144)',
    },
    button: {
        alignSelf: "stretch",
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#48a79b',
        marginTop: 30,
    },
    btntext: {
        color: '#fff',
        fontWeight: 'bold',
    }
})