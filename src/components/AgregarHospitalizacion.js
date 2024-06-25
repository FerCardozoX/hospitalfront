import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import axios from 'axios';

const AgregarHospitalizacion = ({ pacienteId }) => {
    const [fechaIngreso, setFechaIngreso] = useState('');
    const [fechaAlta, setFechaAlta] = useState('');
    const [detallesTratamiento, setDetallesTratamiento] = useState('');

    const agregarHospitalizacion = async () => {
        try {
            const response = await axios.post('https://proyectohospital.onrender.com/GestionHospital/agregarHospitalizacion/' + pacienteId, {
                fecha_ingreso: fechaIngreso,
                fecha_alta: fechaAlta,
                detalles_tratamiento: detallesTratamiento
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
            <Text>Fecha de ingreso:</Text>
            <TextInput value={fechaIngreso} onChangeText={setFechaIngreso} />
            <Text>Fecha de alta:</Text>
            <TextInput value={fechaAlta} onChangeText={setFechaAlta} />
            <Text>Detalles del tratamiento:</Text>
            <TextInput value={detallesTratamiento} onChangeText={setDetallesTratamiento} />
            <Button title="Agregar Hospitalización" onPress={agregarHospitalizacion} />
        </View>
    );
};

export default AgregarHospitalizacion;
