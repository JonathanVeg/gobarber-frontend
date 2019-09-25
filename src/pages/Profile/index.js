import { Form, Input } from '@rocketseat/unform';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '~/store/modules/auth/actions';
import { updateProfileRequest } from '~/store/modules/user/actions';

import AvatarInput from './AvatarInput';
import { Container } from './styles';

export default function Profile() {
    const dispatch = useDispatch();
    const profile = useSelector(state => state.user.profile);

    function handleSubmit(data) {
        dispatch(updateProfileRequest(data));
    }

    function handleSignOut(data) {
        dispatch(signOut());
    }

    return (
        <Container>
            <Form initialData={profile} onSubmit={handleSubmit}>
                <AvatarInput name="avatar_id" />
                <Input name="name" placeholder="Nome Completo" />
                <Input name="email" placeholder="Seu e-mail" />
                <hr />
                <Input type="password" name="oldPassword" placeholder="Sua senha atual" />
                <Input type="password" name="password" placeholder="Sua nova senha" />
                <Input type="password" name="confirmPassword" placeholder="Sua nova senha (confirmação)" />

                <button type="submit"> Atualizar perfil </button>
            </Form>

            <button type="Button" onClick={handleSignOut}>
                Sair do GoBarber
            </button>
        </Container>
    );
}
