import React, { useState } from "react";
import {
  makeStyles,
  Card,
  Title3,
  Field,
  Input,
  Button,
  MessageBar,
} from "@fluentui/react-components";

const DEMO_USERNAME = "admin";
const DEMO_PASSWORD = "admin";

const useStyles = makeStyles({
  container: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: "320px",
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
});

export default function LoginScreen({ onLoginSuccess }) {
  const styles = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    if (username === DEMO_USERNAME && password === DEMO_PASSWORD) {
      setError("");
      onLoginSuccess();
    } else {
      setError("Invalid demo credentials. Try admin / admin.");
    }
  }

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <Title3>Tartish POS Login</Title3>
        <form onSubmit={handleSubmit}>
          <Field label="Username">
            <Input value={username} onChange={(e) => setUsername(e.target.value)} />
          </Field>
          <Field label="Password">
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Field>
          {error && <MessageBar intent="error">{error}</MessageBar>}
          <Button appearance="primary" type="submit" style={{ marginTop: "12px" }}>
            Sign in
          </Button>
        </form>
      </Card>
    </div>
  );
}
