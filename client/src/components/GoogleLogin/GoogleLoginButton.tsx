import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

interface DecodedJwtPayload extends JwtPayload {
  email: string;
  name: string;
}

export default function GoogleLoginButton() {
  const navigate = useNavigate();
  const googleLoginHandler = (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      const decoded = jwtDecode(credentialResponse.credential);
      console.log(decoded);

      const { email, name } = decoded as DecodedJwtPayload;
      console.log(email, name);

      sessionStorage.setItem("videoChatUser", JSON.stringify({ email, name }));
    } else {
      console.log("Credential is undefined");
    }
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "1rem",
        flexWrap: "wrap",
      }}
    >
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          googleLoginHandler(credentialResponse);
          navigate(0);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </div>
  );
}
