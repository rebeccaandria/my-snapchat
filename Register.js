import React from 'react'
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Keyboard,
    Button,
} from 'react-native'

export default class Register extends React.Component {

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
        // console.warn(collection);

        var url = 'http://snapi.epitech.eu/inscription'

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(collection),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(response => response.json())
            .catch(error => console.error('Error:', error))
            .then(() => {
                navigation.navigate('Connect')
            })

        const { email, password } = this.state

        if (email == "") {
            this.setState({ Error: 'merci de remplir votre email' })
        }
        else if (password == "") {
            this.setState({ Error: 'merci d\'entrer votre mot de passe' })
        }

        Keyboard.dismiss()
    }

    render() {

        const { navigation } = this.props

        return (
            <View style={styles.register}>

                <Text style={styles.header}>Première fois avec nous ?</Text>

                <TextInput style={styles.textinput} placeholder="Email"
                    onChangeText={
                        email => this.setState({ email })
                    }
                />

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
                    title="Connexion"
                    onPress={() => navigation.navigate('Connect')}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    register: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#36485f',
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
        borderBottomColor: 'rgba(127, 255, 212, 0.144)',
        borderBottomWidth: 1,
        color: 'white',
        backgroundColor: 'rgba(127, 255, 212, 0.068)',
    },
    button: {
        alignSelf: "stretch",
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#59cbbd',
        marginTop: 30,
    },
    btntext: {
        color: '#fff',
        fontWeight: 'bold',
    }
})