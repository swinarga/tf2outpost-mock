TODO:

-   [ ] dotenv address of frontend

-   Frontend clicks button -> request to /auth/steam
-   /auth/steam redirects to Steam API
-   Upon successful authorization:
    -   Steam API redirects to:
        ```
        /auth/steam/return?openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&openid.mode=id_res&openid.op_endpoint=https%3A%2F%2Fsteamcommunity.com%2Fopenid%2Flogin&openid.claimed_id=https%3A%2F%2Fsteamcommunity.com%2Fopenid%2Fid%2F76561198067699902&openid.identity=https%3A%2F%2Fsteamcommunity.com%2Fopenid%2Fid%2F76561198067699902&openid.return_to=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Fsteam%2Freturn&openid.response_nonce=2024-05-18T11%3A57%3A24Zdw5js4L3Q6nQU5oeq69RkSc5%2BHU%3D&openid.assoc_handle=1234567890&openid.signed=signed%2Cop_endpoint%2Cclaimed_id%2Cidentity%2Creturn_to%2Cresponse_nonce%2Cassoc_handle&openid.sig=RMPaBMdQAccZ41Ou82Ar1UJZyEU%3D
        ```
        Backend service requests the Steam API again with Passport. Passport uses the query parameters to verify the authentication
    -   Steam API returns user's Steam ID.
-   Steam API redirects back to /auth/steam/return
-   Backend redirects back to Frontend home page

Serialize -> store ID to cookie
Deserialize -> find user by ID from cookie
