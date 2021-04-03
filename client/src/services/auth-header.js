import ls from 'local-storage';

export default function authHeader(){
    const user = JSON.parse(ls.get('user'));

    if (user && user.accessToken) {
        return { 'x-access-token': user.accessToken };
    } else {
        return {};
    }
}