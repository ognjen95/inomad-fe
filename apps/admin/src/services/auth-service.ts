import auth0, { Auth0UserProfile } from "auth0-js";
import { decode } from "jsonwebtoken";

class AuthService {
  private webAuth = new auth0.WebAuth({
    domain: process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL as string,
    clientID: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID as string,
    audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE as string,
    responseType: "token",
    redirectUri: process.env.NEXT_PUBLIC_ADMIN_APP_BASE_URL as string,
    scope: "offline_access openid profile email",
  });

  public token =
    typeof window !== "undefined"
      ? localStorage.getItem("authToken") ?? ""
      : "";

  public userInfo: Auth0UserProfile | null = null;

  public generateToken = (callback: (token: string) => void): void => {
    if (this.token) {
      const decoded = decode(this.token, {
        json: true,
      });

      if (decoded!.exp! * 1000 > Date.now()) {
        callback(this.token);
        return;
      }
    }

    this.webAuth.checkSession({}, (err, result: { accessToken: string }) => {
      if (err) {
        callback("");
        return;
      }

      this.token = result.accessToken;
      localStorage.setItem("authToken", result.accessToken);

      callback(this.token);
    });
  };

  public getUserInfo = (
    callback: (userData: Auth0UserProfile | null) => void
  ): void => {
    this.generateToken(() => {
      this.webAuth.client.userInfo(this.token, (err, user) => {
        if (err) {
          callback(null);
          return;
        }

        callback(user);
        localStorage.setItem("name", user?.name ?? "");
        localStorage.setItem("email", user?.email ?? "");
        localStorage.setItem("picture", user?.picture ?? "");
        this.userInfo = user;
      });
    });
  };

  public logout = (): void => {
    localStorage.clear();
    this.webAuth.logout({});
    window.location.href = `${
      process.env.NEXT_PUBLIC_AUTH_APP_BASE_URL ?? ""
    }?logout=true`;
  };
}

const authService = new AuthService();

export default authService;
