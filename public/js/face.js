var xinput = require('xinput');
xinput.listProps(2 /* someId */, function(err, properties){
    console.log(properties); // => true
});