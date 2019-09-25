import { Form, Input } from '@rocketseat/unform';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { dispatch } from 'rxjs/internal/observable/range';
import * as Yup from 'yup';
import logo from '~/assets/logo.svg';
import { signUpRequest } from '~/store/modules/auth/actions';

const schema = Yup.object().shape({
    name: Yup.string().required("Nome é obrigatório"),
    email: Yup.string()
        .email("Insira email válido")
        .required("Email é obrigatório"),
    password: Yup.string()
        .min(6, "Pelo menos 6 caracteres")
        .required("Senha é obrigatória"),
});

export default function SignUp() {
    const dispatch = useDispatch();

    function handleSubmit({ name, email, password }) {
        dispatch(signUpRequest(name, email, password));
    }

    return (
        <>
            <img src={logo} />

            <Form onSubmit={handleSubmit} schema={schema}>
                <Input name="name" placeholder="Nome completo" />
                <Input name="email" type="email" placeholder="Seu e-mail" />
                <Input name="password" type="password" placeholder="Sua senha" />

                <button type="submit">Criar conta</button>

                <Link to="/">Já tenho login</Link>
            </Form>
        </>
    );
}
