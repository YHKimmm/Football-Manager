import { CognitoUserPool, CognitoUser, AuthenticationDetails, CognitoUserAttribute } from "amazon-cognito-identity-js"

// Just a convenience function to promisify the cognito functions
function promisify(func) {
    return function () {
        return new Promise((resolve, reject) => {
            func.apply(this, [
                ...Array.from(arguments),
                (err, result) => {
                    if (err) {
                        reject(err)
                        return
                    }
                    resolve(result)
                },
            ])
        })
    }
}


const poolData = {
    UserPoolId: "ca-central-1_Mo6WkucaB",
    ClientId: "6uvnosjra71n74grpf1etsobu8"
}


const userPool = new CognitoUserPool(poolData)

export async function signUp({ username, email, password }) {
    const attributeList = [
        new CognitoUserAttribute({ Name: "email", Value: email })
    ]

    const cognitoSignUp = promisify(userPool.signUp).bind(userPool)
    const result = await cognitoSignUp(username, password, attributeList, null)
    console.log('sign up result', result)
    return result
}

export async function confirmUser({ username, code }) {
    const userData = {
        Username: username,
        Pool: userPool,
    }

    const cognitoUser = new CognitoUser(userData)
    const confirm = promisify(cognitoUser.confirmRegistration).bind(cognitoUser)
    const result = await confirm(code, false)
    return result
}

export async function signIn({ username, password }) {
    return new Promise((resolve, reject) => {
        const authData = {
            Username: username,
            Password: password,
        }

        const authDetails = new AuthenticationDetails(authData)

        const userData = {
            Username: username,
            Pool: userPool,
        }

        const cognitoUser = new CognitoUser(userData)
        console.log('sign in user', cognitoUser)
        cognitoUser.authenticateUser(authDetails, {
            onSuccess: (result) => {
                resolve(result)
            },
            onFailure: (error) => reject(error),
        })
    })
}

export function currentUser() {
    return userPool.getCurrentUser()
}

export function signOut() {
    const user = currentUser()
    user?.signOut()
    console.log('sign out user', user)
}

async function getUserSession() {
    const user = currentUser()
    if (!user) {
        throw "User not logged in"
    }
    const getSession = promisify(user.getSession).bind(user)

    const session = await getSession()
    return session
}

export async function getAccessToken() {
    const session = await getUserSession()
    const jwt = session?.accessToken?.jwtToken
    return jwt
}

// forgot password and reset password
export async function forgotPassword({ username }) {
    try {
        const userData = {
            Username: username,
            Pool: userPool
        };
        const cognitoUser = new CognitoUser(userData);

        const userExists = await new Promise((resolve, reject) => {
            cognitoUser.getSession((err, session) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            });
        });

        if (!userExists) {
            throw new Error("User not found");
        }

        return new Promise((resolve, reject) => {
            cognitoUser.forgotPassword({
                onSuccess: (data) => {
                    resolve(data);
                },
                onFailure: (err) => {
                    reject(err);
                }
            });
        });
    } catch (err) {
        throw new Error(err.message);
    }
}


export async function resetPassword({ username, code, newPassword }) {
    const cognitoUser = new CognitoUser({
        Username: username,
        Pool: userPool
    })
    return new Promise((resolve, reject) => {
        cognitoUser.confirmPassword(code, newPassword, {
            onSuccess: (data) => {
                resolve(data)
            },
            onFailure: (err) => {
                reject(err)
            }
        })
    })
}