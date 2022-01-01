module.exports  = {
    issuer: "SumukShashidhar",
    signOptions: {
        issuer:  "SumukShashidhar",
        expiresIn:  "24h",
        algorithm:  "RS512"
    },
    verifyOptions: {
        issuer:  "SumukShashidhar",
        expiresIn:  "24h",
        algorithm:  ["RS512"],
       }
}