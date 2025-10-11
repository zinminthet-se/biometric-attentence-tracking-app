import axios from "axios";
import apiClient from "./api-client";

class UserService {
  login() {
    apiClient.get("/auth/user/login",);
  }
}
