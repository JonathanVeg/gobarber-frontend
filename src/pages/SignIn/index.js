import { Form, Input } from '@rocketseat/unform';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import logo from '~/assets/logo.svg';
import { signInRequest } from '~/store/modules/auth/actions';

const schema = Yup.object().shape({
    email: Yup.string()
        .email("Insira email válido")
        .required("Email é obrigatório"),
    password: Yup.string().required("Senha é obrigatória"),
});

export default function SignIn() {
    const dispatch = useDispatch();

    function handleSubmit({ email, password }) {
        let tdata = {
            email,
            password,
        };
        dispatch(signInRequest(tdata.email, tdata.password));
    }

    return (
        <>
            <img src={logo} />

            <Form onSubmit={handleSubmit} schema={schema}>
                <Input name="email" type="email" placeholder="Seu e-mail" />
                <Input name="password" type="password" placeholder="Sua senha" />

                <button type="submit">Acessar</button>

                <Link to="/register">Criar conta gratuita</Link>
            </Form>
        </>
    );
}
