import { getEnvValue } from "./Environment";
import { include, reverse } from 'named-urls'

const endpoint = {
    auth: include('/api/user', {
        login: 'login',
        verifyOTP: 'authenticate',
        user:'',
        userAll:'all'
    })
}

export function getAPIUrl(url, params = null) {
    const path = reverse(
        url.split(".").reduce((o, i) => o[i], endpoint),
        params
    );
    return getEnvValue("REACT_APP_API_URL") + path;
}