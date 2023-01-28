import React, { useEffect, useContext, useState } from 'react';
import { View, StyleSheet, Button } from 'react-native';

import FormContainer from '../../Shared/Form/FormContainer';
import Input from '../../Shared/Form/Input';
import Error from '../../Shared/Error';

// Context
import AuthGlobal from '../../Context/store/AuthGlobal';
import { loginUser } from '../../Context/actions/Auth.actions';

const Login = (props) => {
  const context = useContext(AuthGlobal);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (context.stateUser.isAuthenticated === true) {
      props.navigation.navigate('UserProfile');
    }
  }, [context.stateUser.isAuthenticated]);

  const handleSubmit = () => {
    const user = {
      username: username,
      password,
    };

    if (username === '' || password === '') {
      setError('Please, fill in your credentials');
    } else {
      loginUser(user, context.dispatch);
    }
  };

  return (
    <FormContainer title={'Iniciar sesión'}>
      <Input
        placeholder={'Ingrese el usuario'}
        name={'username'}
        id={'username'}
        value={username}
        onChangeText={(text) => setUsername(text)}
      />

      <Input
        placeholder={'Ingrese la contraseña'}
        name={'password'}
        id={'password'}
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />

      <View style={styles.buttonGroup}>
        {error ? <Error message={error} /> : null}
        <Button
          title="Ingresar"
          onPress={handleSubmit}
          color={'#1948BA'}
        ></Button>
      </View>
    </FormContainer>
  );
};

const styles = StyleSheet.create({
  buttonGroup: {
    width: '80%',
    alignItems: 'center',
  },
  middleText: {
    marginBottom: 20,
    alignSelf: 'center',
  },
});

export default Login;
