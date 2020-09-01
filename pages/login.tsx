/** @jsx jsx */
import { jsx, Styled } from "theme-ui";
import { useState, useEffect } from "react";
import firebase from "~/src/services/firebase/client";
import { Form, FormikProps, Formik } from "formik";
import Router from "next/router";
import Container from "~/src/components/primitives/Container";
import Button from "~/src/components/Button";
import { rem } from "~/src/theme";
import * as Yup from "yup";
import TextInput from "~/src/components/Input";
import ArrowBack from "~/src/assets/icons/arrowBack";
import PageNotch from "~/src/components/PageNotch";
import Text from "~/src/components/primitives/Text";
import { NextSeo } from "next-seo";
import TickList from "~/src/components/TickList";
interface signInEmailFormValues {
  email: string;
  password: string;
}
interface signUpEmailFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const signInEmailValidation = Yup.object().shape({
  email: Yup.string().email().required("We require this"),
  password: Yup.string().required("We require this"),
});

const signupEmailValidation = Yup.object().shape({
  email: Yup.string().email().required("We require this"),
  password: Yup.string().required("We require this"),
  firstName: Yup.string().required("We require this information"),
  lastName: Yup.string().required("We require this information"),
});

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [emailSignIn, setEmailSignIn] = useState(false);
  const [createUser, setCreateUser] = useState(false);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
  });

  const [signUpError, setSignUpError] = useState("");
  const [signInError, setSignInError] = useState("");
  const [redirectError, setRedirectError] = useState("");

  useEffect(() => {
    const body = document.querySelector("body");
    // case where user is navigated from content modal, need to remove overlay
    if (body.className === "modal-opened") {
      body.className = "";
    }
    if (window.location.hash === "#auth") {
      setLoading(true);
    }

    firebase
      .auth()
      .getRedirectResult()
      .then(function (result) {
        if (result.credential) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          window.location.hash = "";
          // ...
        }
      })
      .catch(function (error) {
        window.location.hash = "";
        var errorMessage = error.message;
        setRedirectError(errorMessage);
      });

    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        if (createUser) {
          await user.updateProfile({
            displayName: `${userData.firstName} ${userData.lastName}`,
          });
        }

        const redirectRoute: any = Router.router.query.redirect
          ? Router.router.query.redirect
          : "/";

        Router.push(redirectRoute);
      } else {
        setLoading(false);
      }
    });
  }, [createUser]);

  const setProviderRedirectHash = () => {
    window.location.hash = "auth";
  };

  const facebookLogin = async () => {
    setProviderRedirectHash();
    firebase
      .auth()
      .signInWithRedirect(new firebase.auth.FacebookAuthProvider());
  };

  const gmailLogin = async () => {
    setProviderRedirectHash();
    await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    await firebase
      .auth()
      .signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  };

  return (
    <main
      sx={{
        bg: "white",
        height: "100%",
        position: "relative",
        borderTop: "2px solid black",
        variant: "spacing.verticalSmall",
      }}
    >
      <NextSeo title="Log in | MedLitGo" />

      <PageNotch color="lightYellow" />

      <Container
        sx={{
          maxWidth: rem(400),
        }}
      >
        {emailSignIn ? (
          <button
            sx={{
              display: "flex",
              alignItems: "center",
              mb: rem(20),
              p: 3,
              ml: -3,
              borderRadius: "3px",
              "&:hover": {
                bg: "rgba(0,0,0,0.10)",
                "> h4": {
                  textDecoration: "none",
                },
              },
            }}
            onClick={() => {
              setEmailSignIn(false);
            }}
          >
            <ArrowBack />{" "}
            <Styled.h4
              sx={{
                display: "inline-block",
                ml: rem(6),
              }}
            >
              Back
            </Styled.h4>
          </button>
        ) : null}
        <Styled.h1>
          {emailSignIn ? "Log in with email" : "Sign up or login"}
        </Styled.h1>

        {!loading && (
          <>
            <Text>
              Help MedLitGo provide a richer experience for everyone else by
              Signing Up and sharing your wisdom and thoughts.
            </Text>

            <TickList
              items={[
                "Begin building your profile",
                "Have access to your contributions",
                "Know who is commenting",
              ]}
              childStyles={{
                mb: 2,
              }}
              parentStyles={{
                mb: 10,
              }}
            />
          </>
        )}

        <main>
          {loading ? (
            <div>
              <div
                sx={{
                  mt: rem(60),
                }}
              ></div>
              <Text styles={{ textAlign: "center" }}>Logging you in</Text>
              <div
                className="la-ball-clip-rotate la-dark la-2x"
                sx={{
                  margin: "0 auto",
                }}
              >
                <div></div>
              </div>
            </div>
          ) : emailSignIn ? (
            <div>
              <>
                <Formik
                  initialValues={{
                    email: "",
                    password: "",
                  }}
                  onSubmit={(values, actions) => {
                    firebase
                      .auth()
                      .signInWithEmailAndPassword(values.email, values.password)
                      .catch(function (error) {
                        console.log(error);
                        setSignInError(error.message);
                      });
                  }}
                  enableReinitialize
                  validationSchema={signInEmailValidation}
                >
                  {(props: FormikProps<signInEmailFormValues>) => (
                    <section>
                      <Styled.h3>Existing user</Styled.h3>
                      <Form>
                        <TextInput
                          name="email"
                          type="text"
                          placeholder="Email"
                        />
                        <TextInput
                          name="password"
                          type="password"
                          placeholder="Password"
                        />
                        <div
                          sx={{
                            mt: 5,
                          }}
                        >
                          <Button onClick={() => {}} noMaxWidth>
                            Log in
                          </Button>
                        </div>
                        {signInError && (
                          <Text
                            styles={{
                              mt: 3,
                            }}
                          >
                            {signInError}
                          </Text>
                        )}
                      </Form>
                    </section>
                  )}
                </Formik>

                <Seperator />

                <Formik
                  enableReinitialize
                  initialValues={{
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: "",
                  }}
                  onSubmit={({ firstName, lastName, email, password }) => {
                    setUserData({
                      firstName: firstName,
                      lastName: lastName,
                    });
                    firebase
                      .auth()
                      .createUserWithEmailAndPassword(email, password)
                      .catch(function (error) {
                        setSignUpError(error.message);
                      });
                    setCreateUser(true);
                  }}
                  validationSchema={signupEmailValidation}
                >
                  {(props: FormikProps<signUpEmailFormValues>) => (
                    <section>
                      <Styled.h3>New user</Styled.h3>

                      <Form>
                        <TextInput
                          name="firstName"
                          type="text"
                          placeholder="First name"
                        />
                        <TextInput
                          name="lastName"
                          type="text"
                          placeholder="Last name"
                        />
                        <TextInput
                          name="email"
                          type="text"
                          placeholder="Email"
                        />
                        <TextInput
                          name="password"
                          type="password"
                          placeholder="Password"
                        />
                        <div
                          sx={{
                            mt: 5,
                          }}
                        >
                          <Button onClick={() => {}} noMaxWidth>
                            Create account
                          </Button>
                        </div>
                        {signUpError && (
                          <Text
                            styles={{
                              mt: 3,
                            }}
                          >
                            {signUpError}
                          </Text>
                        )}
                      </Form>
                    </section>
                  )}
                </Formik>
              </>
            </div>
          ) : (
            <>
              <button
                sx={{
                  bg: "white",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  border: "1px solid",
                  borderColor: "midGrey",
                  borderRadius: rem(3),
                  minHeight: rem(50),
                  width: "100%",

                  mb: rem(12),
                }}
                onClick={gmailLogin}
              >
                <span
                  sx={{
                    display: "block",
                    width: rem(18),
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 533.5 544.3"
                    width="100%"
                  >
                    <path
                      d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                      fill="#4285f4"
                    />
                    <path
                      d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                      fill="#34a853"
                    />
                    <path
                      d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                      fill="#fbbc04"
                    />
                    <path
                      d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                      fill="#ea4335"
                    />
                  </svg>
                </span>

                <span
                  sx={{
                    fontWeight: "bold",
                    ml: rem(10),
                  }}
                >
                  Continue with Google
                </span>
              </button>
              <button
                onClick={facebookLogin}
                sx={{
                  bg: "#3b5998",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  border: "1px solid",
                  borderColor: "transparent",
                  borderRadius: rem(3),
                  minHeight: rem(50),
                  width: "100%",
                  color: "white",
                }}
              >
                <span
                  sx={{
                    display: "block",
                    width: rem(18),
                  }}
                >
                  <svg
                    width="100%"
                    viewBox="0 0 512 512"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="white"
                  >
                    <path d="m297.277344 508.667969c-2.132813.347656-4.273438.667969-6.421875.960937 2.148437-.292968 4.289062-.613281 6.421875-.960937zm0 0" />
                    <path d="m302.398438 507.792969c-1.019532.1875-2.039063.359375-3.058594.535156 1.019531-.175781 2.039062-.347656 3.058594-.535156zm0 0" />
                    <path d="m285.136719 510.339844c-2.496094.28125-5.007813.53125-7.527344.742187 2.519531-.210937 5.03125-.460937 7.527344-.742187zm0 0" />
                    <path d="m290.054688 509.738281c-1.199219.160157-2.40625.308594-3.609376.449219 1.203126-.140625 2.410157-.289062 3.609376-.449219zm0 0" />
                    <path d="m309.367188 506.410156c-.898438.191406-1.800782.382813-2.703126.566406.902344-.183593 1.804688-.375 2.703126-.566406zm0 0" />
                    <path d="m326.664062 502.113281c-.726562.207031-1.453124.402344-2.179687.605469.726563-.203125 1.453125-.398438 2.179687-.605469zm0 0" />
                    <path d="m321.433594 503.542969c-.789063.207031-1.582032.417969-2.375.617187.792968-.199218 1.585937-.40625 2.375-.617187zm0 0" />
                    <path d="m314.589844 505.253906c-.835938.195313-1.679688.378906-2.523438.566406.84375-.1875 1.6875-.371093 2.523438-.566406zm0 0" />
                    <path d="m277.527344 511.089844c-1.347656.113281-2.695313.214844-4.046875.304687 1.351562-.089843 2.699219-.191406 4.046875-.304687zm0 0" />
                    <path d="m512 256c0-141.363281-114.636719-256-256-256s-256 114.636719-256 256 114.636719 256 256 256c1.503906 0 3-.03125 4.5-.058594v-199.285156h-55v-64.097656h55v-47.167969c0-54.703125 33.394531-84.476563 82.191406-84.476563 23.367188 0 43.453125 1.742188 49.308594 2.519532v57.171875h-33.648438c-26.546874 0-31.6875 12.617187-31.6875 31.128906v40.824219h63.476563l-8.273437 64.097656h-55.203126v189.453125c107.003907-30.675781 185.335938-129.257813 185.335938-246.109375zm0 0" />
                    <path d="m272.914062 511.429688c-2.664062.171874-5.339843.308593-8.023437.398437 2.683594-.089844 5.359375-.226563 8.023437-.398437zm0 0" />
                    <path d="m264.753906 511.835938c-1.414062.046874-2.832031.082031-4.25.105468 1.417969-.023437 2.835938-.058594 4.25-.105468zm0 0" />
                  </svg>
                </span>

                <span
                  sx={{
                    fontWeight: "bold",
                    ml: rem(10),
                  }}
                >
                  Continue with Facebook
                </span>
              </button>
              <Seperator />

              <Button onClick={() => setEmailSignIn(true)} noMaxWidth>
                Continue with email
              </Button>
            </>
          )}

          {redirectError && (
            <Text
              styles={{
                mt: 5,
              }}
            >
              {redirectError}
            </Text>
          )}
        </main>
      </Container>
    </main>
  );
};
export default Login;

const Seperator = () => (
  <div
    sx={{
      display: "flex",
      my: rem(20),
      alignItems: "center",
    }}
  >
    <hr
      sx={{
        height: "1px",
        bg: "lightGrey",
        border: "none",
        width: "100%",
      }}
    />
    <p
      sx={{
        px: rem(20),
      }}
    >
      or
    </p>
    <hr
      sx={{
        height: "1px",
        bg: "lightGrey",
        border: "none",
        width: "100%",
      }}
    />
  </div>
);
