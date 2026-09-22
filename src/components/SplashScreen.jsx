import React, { useEffect } from "react";
import { makeStyles } from "@fluentui/react-components";
import splashImage from "../assets/splash.svg";

const useStyles = makeStyles({
  container: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1f1f1f",
  },
});

const SPLASH_DURATION_MS = 2000;

export default function SplashScreen({ onFinished }) {
  const styles = useStyles();

  useEffect(() => {
    const timer = setTimeout(onFinished, SPLASH_DURATION_MS);
    return () => clearTimeout(timer);
  }, [onFinished]);

  return (
    <div className={styles.container}>
      <img src={splashImage} alt="Tartish POS" width={240} height={240} />
    </div>
  );
}
