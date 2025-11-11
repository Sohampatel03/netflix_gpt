 export const check = (email , password) => {
    const emailcheck = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
    const passwordcheck = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

    if(!emailcheck) return "email is not valid"
    if(!passwordcheck) return "password is not valid"
    
    return null;
}

