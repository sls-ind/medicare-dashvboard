
/**
 * Enter here the user flows and custom policies for your B2C application
 * To learn more about user flows, visit: https://docs.microsoft.com/en-us/azure/active-directory-b2c/user-flow-overview
 * To learn more about custom policies, visit: https://docs.microsoft.com/en-us/azure/active-directory-b2c/custom-policy-overview
 */
export const b2cPolicies = {
    names: {
        signUpSignIn: "B2C_1_sign-up",
        resetPassword: "B2C_1_password_reset",
        editProfile: "B2C_1_editProfile"
    },
    authorities: {
        signUpSignIn: {
            authority: "https://iabhiorg.b2clogin.com/iabhiorg.onmicrosoft.com/B2C_1_sign-up",
        },
        resetPassword: {
            authority: "https://iabhiorg.b2clogin.com/iabhiorg.onmicrosoft.com/B2C_1_password_reset",
        },
        editProfile: {
            authority: "https://iabhiorg.b2clogin.com/iabhiorg.onmicrosoft.com/B2C_1_editProfile"
        }
    },
    authorityDomain: "iabhiorg.b2clogin.com"
}

/**
 * Enter here the coordinates of your web API and scopes for access token request
 * The current application coordinates were pre-registered in a B2C tenant.
 */
export const apiConfig: { scopes: string[]; uri: string } = {
    scopes: ['https://iabhiorg.onmicrosoft.com/351adf59-8cb6-4b3a-bfde-31738a8d2778/demo.read'],
    uri: 'https://iabhiorg.onmicrosoft.com/351adf59-8cb6-4b3a-bfde-31738a8d2778'
};
