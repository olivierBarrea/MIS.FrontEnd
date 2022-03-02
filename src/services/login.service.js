export const loginService = {
    login
};

function login(username, password) {
    if(username != "" && password != "" && username==password) {
        router.push('Dashboard');
        return true;
    }
}