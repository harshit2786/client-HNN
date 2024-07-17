import CryptoJS from "crypto-js";
import { LoginUserGrabJwt } from "./publiccontroller";
export const NavigateSign = async (email, password) => {
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
    console.log(isEmailExist);
    if(emailExists){
        if(password === CryptoJS.AES.decrypt(isEmailExist[0].Password2, `${process.env.REACT_APP_SECRET_KEY}`).toString(CryptoJS.enc.Utf8)){
            const login = await LoginUserGrabJwt(email);
            sessionStorage.setItem("KadduData", JSON.stringify(login));
            return true;
        }
        else{
            const error = new Error("You are not authorized to access this page") 
            error.status = "403";
            throw error;
        }
    }
    else{
        const error = new Error("You are not authorized to access this page") 
            error.status = "403";
            throw error;
    }
}