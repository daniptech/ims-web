import { getEnvValue } from "./Environment";
import { include, reverse } from 'named-urls'

const endpoint = {
    auth: include('/api/user', {
        sendOTP: 'send-otp',
        verifyOTP: 'authenticate'
    })
}

export function getAPIUrl(url, params = null) {
    const path = reverse(
        url.split(".").reduce((o, i) => o[i], endpoint),
        params
    );
    console.log(path, "path");
    return getEnvValue("REACT_APP_API_URL") + path;
}