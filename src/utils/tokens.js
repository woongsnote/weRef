export function accessToken() {
    const accessToken = window.localStorage.accessToken;
    return accessToken
};

export function refreshToken() {
    const refreshToken = window.localStorage.refreshToken;
    return refreshToken
};

// 아래와 같이 사용
// import { accessToken ,refreshToken} from "../../utils/tokens";
// console.log(accessToken())
// console.log(refreshToken())