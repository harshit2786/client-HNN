import CryptoJS from "crypto-js";

export const LoginLogic = async (email,password) => {
    const response = await fetch(
        `${process.env.REACT_APP_STRAPI_IP_ADDRESS}/api/users/?populate=*&filters[email][$eq]=${email}`,
        {
            method: "GET",
            mode: "cors",
            cache: "no-cache",
            redirect: "follow",
            referrerPolicy: "no-referrer",
        }
    )
    const isEmailExist = await response.json();
    if (isEmailExist.length !== 0) {
        if(password === CryptoJS.AES.decrypt(isEmailExist[0].Password2, `${process.env.REACT_APP_SECRET_KEY_PUBLIC}`).toString(CryptoJS.enc.Utf8)){
            const login = await LoginUserGrabJwt(email);
            if(sessionStorage.getItem("KadduData")){
                sessionStorage.removeItem("KadduData");
            }
            sessionStorage.setItem("userData", JSON.stringify(login));
            return "Success";
        }
        else{
            return "Incorrect";
        }
    }
    else{
        return "DNE";
    }
}
export const LoginUserGrabJwt = async (email) => {
    const Payload = {
        "identifier": email,
        "password": "JhNOK01mFsaoZh"
    }
    const URL = `${process.env.REACT_APP_STRAPI_IP_ADDRESS}/api/auth/local/?populate=*`
    const response = await fetch(URL, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(Payload),
        redirect: "follow",
        referrerPolicy: "no-referrer"
    })
    let data = response.json();
    return data;
}
export const SignUpLogic = async(email,password,name) => {
    
    const response = await fetch(
        `${process.env.REACT_APP_STRAPI_IP_ADDRESS}/api/users/?populate=*&filters[email][$eq]=${email}`,
        {
            method: "GET",
            mode: "cors",
            cache: "no-cache",
            redirect: "follow",
            referrerPolicy: "no-referrer",
        }
    )
    const isEmailExist = await response.json();
    if (isEmailExist.length !== 0) {
        return "Exists";
    }
    else{
        const Signin = await RegisterUserGrabJwt(email, password,name);
        console.log(Signin);
        const login = await LoginUserGrabJwt(email);
        if(sessionStorage.getItem("KadduData")){
            sessionStorage.removeItem("KadduData");
        }
        sessionStorage.setItem("userData", JSON.stringify(login));
        return "Success";
    }
}
export const RegisterUserGrabJwt = async (email, password2,name) => {
    const URL = `${process.env.REACT_APP_STRAPI_IP_ADDRESS}/api/auth/local/register?populate=*`;
    const secretKey = `${process.env.REACT_APP_SECRET_KEY_PUBLIC}`;
    const inputString = password2;
    const encrypted = CryptoJS.AES.encrypt(inputString, secretKey);
    const AESHash = encrypted.toString();
    
    const payload = {
        email: email,
        FirstName:name,
        password: "JhNOK01mFsaoZh",
        Password2: AESHash,
        username: email,
        Theme: "Light"
    }
    const response = await fetch(URL, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        headers: {
            "Content-type": "Application/JSOn"
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(payload)
    })
    let data = response.json();
    return data
}
export const NavigateSign = async (email, password2) => {
    // Check if user exists.
    let emailExists = false;
    const response = await fetch(
        `${process.env.REACT_APP_STRAPI_IP_ADDRESS}/api/users/?populate=*&filters[email][$eq]=${email}`,
        {
            method: "GET",
            mode: "cors",
            cache: "no-cache",
            redirect: "follow",
            referrerPolicy: "no-referrer",
        }
    )
    const isEmailExist = await response.json();
    if (isEmailExist.length !== 0) {
        emailExists = true;
    }
    let navigate_route;
    const password = "JhNOK01mFsaoZh";
    if (!emailExists) {
        const Signin = await RegisterUserGrabJwt(email, password2);
        if (Signin) {
            // const PublicRole=await getAllRoles()
            //     const roles={
            //         "role": {
            //         "disconnect": [
            //             {
            //                 "id": Signin.user.id
            //             }
            //         ],
            //         "connect": [
            //             {
            //                 "id": PublicRole.id,
            //                 "position": {
            //                     "end": true
            //                 }
            //             }
            //         ]
            //     }
            // }
            // await UpdateOneUserData("users",Signin.user.id,roles);
        }
        const login = await LoginUserGrabJwt(email, password);
        if(sessionStorage.getItem("KadduData")){
            sessionStorage.removeItem("KadduData");
        }
        sessionStorage.setItem("userData", JSON.stringify(login));
        
    }
    else {
        const login = await LoginUserGrabJwt(email, password);
        if(sessionStorage.getItem("KadduData")){
            sessionStorage.removeItem("KadduData");
        }
        sessionStorage.setItem("userData", JSON.stringify(login));
        navigate_route = isEmailExist[0].OrgRoute === null ? "/onboarding" : `${isEmailExist[0].OrgRoute}`;
    }
    return navigate_route;
}