What broke first?
- Async Error Handler.

What failure confused you the most?
- Logger Request

Which logs were actually useful?
- Logger and Error logs that had structured JSON log with timestamp, method, message and path.

Which logs lied or lacked context?
- Error & Fatal i.e if level is info and warn console.log where error & fatal console.error

What did you wrongly assume about:

env vars
- Required vars was not useful in server js.

error handling
- Server is crashed always if there is error/we couldn't see stack of error with message without crashing the app 

DB connections
- If DB is not connected before server listens the server should not break.

What would you never deploy like this again?
- Too much chaos or make failure then deploy again repeating the cycle