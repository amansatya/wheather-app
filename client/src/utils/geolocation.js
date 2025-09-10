export const getUserLocation = (successCallback, errorCallback) => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    } else {
        console.log("Geolocation not supported");
        errorCallback({ message: "Geolocation not supported" });
    }
};
