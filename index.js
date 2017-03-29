var express = require('express')
var app = express()

app.get('/health', function(req, res) {
    res.send('{"status":"UP","healthInfo":{"status":"UP","App Name":"PDP UI"}}')
})

app.listen(3000, function() {
    console.log('Example app listening on port 3000!')
})
