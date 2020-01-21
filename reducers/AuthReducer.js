export const authReducer = (state, action) => {
    // console.log(state);
    switch (action.type) {
        case 'SIGN_IN':
            if (localStorage.getItem('userData') !== null) {
                localStorage.removeItem('userData');
                return { token: null };
            }
            localStorage.setItem('userData', action.userData);
            return JSON.parse(action.userData)
        case 'SIGN_UP':
            return
        case 'FB_LOGIN':
            return
        default:
            return
    }
}
