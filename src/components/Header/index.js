import React from 'react';
import { Link } from 'react-router-dom';

import Notifications from '../Notifications';
import logo_purple from './../../assets/logo_purple.svg';
import { Container, Content, Profile } from './styles';
import {useSelector} from 'react-redux'

export default function Header() {
    const profile = useSelector(state => state.user.profile);

    return (
        <Container>
            <Content>
                <nav>
                    <img src={logo_purple} alt="Go Barber" />
                    <Link to="/dashboard"> DASHBOARD </Link>
                </nav>

                <aside>
                    <Notifications />
                    <Profile>
                        <div>
                            <strong>{profile.name}</strong>

                            <Link to="/profile">Meu perfil</Link>
                        </div>
                        <img src={profile.avatar.url || "https://api.adorable.io/avatars/50/abott@adorable.png"} alt="Profile" />
                    </Profile>
                </aside>
            </Content>
        </Container>
    );
}
