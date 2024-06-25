import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import axios from 'axios';

const AgregarTratamiento = ({ pacienteId }) => {
    const [descripcion, setDescripcion] = useState('');
    const [medicacion, setMedicacion] = useState('');
    const [procedimientos, setProcedimientos] = useState('');
    const [recomendaciones, setRecomendaciones] = useState('');
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');

    const agregarTratamiento = async () => {
        try {
            const response = await axios.post('https://proyectohospital.onrender.com/GestionHospital/agregarTratamiento/' + pacienteId, {
                descripcion,
                medicacion: [medicacion],
                procedimientos: [procedimientos],
                recomendaciones,
                fecha_inicio: fechaInicio,
                fecha_fin: fechaFin
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
            <Text>Descripción:</Text>
            <TextInput value={descripcion} onChangeText={setDescripcion} />
            <Text>Medicación:</Text>
            <TextInput value={medicacion} onChangeText={setMedicacion} />
            <Text>Procedimientos:</Text>
            <TextInput value={procedimientos} onChangeText={setProcedimientos} />
            <Text>Recomendaciones:</Text>
            <TextInput value={recomendaciones} onChangeText={setRecomendaciones} />
            <Text>Fecha de inicio:</Text>
            <TextInput value={fechaInicio} onChangeText={setFechaInicio} />
            <Text>Fecha de fin:</Text>
            <TextInput value={fechaFin} onChangeText={setFechaFin} />
            <Button title="Agregar Tratamiento" onPress={agregarTratamiento} />
        </View>
    );
};

export default AgregarTratamiento;
