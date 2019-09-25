import { formatDistance, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import React, { useEffect, useMemo, useState } from 'react';
import { MdNotifications } from 'react-icons/md';
import api from '~/services/api';

import { Badge, Container, Notification, NotificationList, Scroll } from './styles';

export default function Notifications() {
    const [visible, setVisible] = useState(false);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        async function loadNotifications() {
            const response = await api.get("notifications");

            const data = response.data.map(notification => ({
                ...notification,
                timeDistance: formatDistance(parseISO(notification.createdAt), new Date(), {
                    addSuffix: true,
                    locale: pt,
                }),
            }));

            setNotifications(data);
        }

        loadNotifications();
    }, []);

    const hasUnread = useMemo(() => !!notifications.find(it => it.read === false), [notifications]);

    async function handleMarkAsRead(id) {
        await api.put(`notifications/${id}`);

        setNotifications(notifications.map(n => (n._id === id ? { ...n, read: true } : n)));
    }

    return (
        <Container>
            <Badge hasUnread={hasUnread}>
                <MdNotifications
                    color="#7159c1"
                    size={20}
                    onClick={() => {
                        setVisible(!visible);
                    }}
                />
            </Badge>

            <NotificationList visible={visible}>
                <Scroll>
                    {notifications.map(notification => (
                        <Notification key={notification._id} unread={!notification.read}>
                            <p>{notification.content}</p>
                            <time>{notification.timeDistance}</time>
                            {!notification.read && (
                                <button type="button" onClick={() => handleMarkAsRead(notification._id)}>
                                    Marcar como lida
                                </button>
                            )}
                        </Notification>
                    ))}
                </Scroll>
            </NotificationList>
        </Container>
    );
}
