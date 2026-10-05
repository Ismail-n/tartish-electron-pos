import { httpClient } from "./httpClient.js";
import { ENDPOINTS } from "./config.js";
import { getDeviceId } from "../utils/deviceId.js";

export function login(email, password) {
  return httpClient.post(ENDPOINTS.LOGIN, {
    email,
    password,
    deviceInfo: {
      deviceId: getDeviceId(),
    },
  });
}

export function verifyLoginOtp(sessionId, otp) {
  return httpClient.post(ENDPOINTS.VERIFY_LOGIN_OTP, {
    sessionId,
    otp,
    deviceInfo: {
      deviceId: getDeviceId(),
    },
  });
}
