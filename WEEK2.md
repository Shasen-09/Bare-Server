WEEK 2 — AUTHENTICATION AUTOPSY 

How was authentication implemented initially?
- Installing JWT then directly creating token using crypto and verifying to authenticate the route. 

What assumptions did you make that later turned out to be wrong?
- Just access token or one token is purely safe as it is created by random 128 characters in hex.

Which attack was the easiest to execute?
- Refresh token 

Which attack surprised you the most?
- User object id(_Id) and the userID in refresh token surprised the most.

What does “secure auth” actually mean in practice now?
- It means dynamical token which expires in a certain period that could be re-achieve again (refresh token) is enabled , the term rotation has a significant role when playing with tokens as it can be misued when a token is leaked. Secured endpoint as per role should be enabled for better control of the system whereas rate limits enables the system to accept certain requests in a period to slow down the heavy load. Logout inavlidation should specifically ensure the token is revoked for the system to remain intact. 

How did your thinking about JWTs change?
- I did some project before using JWT , i didn't expect the term refresh token, rotation as some can infiltrate using refresh token or the token is not revoked time to time.

What would you design differently if starting again?
- Specific role for the server, proper DB setup for hash enabled token.



Finish this sentence honestly:

“Before this week, I thought auth was security check using a token provided by the system.
Now I know it is system of security check where role,rate limit,token rotation is structured in a flow.”