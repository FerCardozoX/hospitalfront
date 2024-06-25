import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import axios from 'axios';

const AgregarDiagnostico = ({ pacienteId }) => {
    const [fecha, setFecha] = useState('');
    const [diagnostico, setDiagnostico] = useState('');

    const agregarDiagnostico = async () => {
        try {
            const response = await axios.post('https://proyectohospital.onrender.com/GestionHospital/agregarDiagnostico/' + pacienteId, {
                fecha,
                diagnostico
            });
            console.log(response.data);
            // Aquí podrías manejar la respuesta de tu servidor
        } catch (error) {
            console.error(error);
            // Aquí podrías manejar el error
        }
    };

    return (
        <View>
            <Text>Fecha:</Text>
            <TextInput value={fecha} onChangeText={setFecha} />
            <Text>Diagnóstico:</Text>
            <TextInput value={diagnostico} onChangeText={setDiagnostico} />
            <Button title="Agregar Diagnóstico" onPress={agregarDiagnostico} />
        </View>
    );
};

export default AgregarDiagnostico;
