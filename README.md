SimpleTokenizer
===============

Very simple Tokenizer for JS/NodeJs.When you parse a text with SimpleTokenizer, It will give you a list of tokens that you were specified by rules.


Description
-----------
This library parse a string and get all tokens in the same order that it appears in the string.


Usage
-----

__Async example__

    var SimpleTokenizer = require("SimpleTokenizer");
    var st;

    st = new SimpleToenizer();
    st.addRule( /\[[a-z ]+\]/, "token_type_1" );
    st.addRule( /\([a-z ]+\)/, "token_type_2" );

    var txtToTest = "Lorem [ipsum] dolor [sit amet], (consectetur adipisicing) elit, sed do eiusmod [tempor] incididunt ut labore et dolore magna aliqua";

    st.on('token', function(token) {
        console.log(token.type + ": " + token.token);
    })
    st.parse(txtToTest, function(tokens){console.log("Tokens founded: " + tokens)});


__Sync example__
   var SimpleTokenizer = require("SimpleTokenizer");
    var st;

    st = new SimpleToenizer();
    st.addRule( /\[[a-z ]+\]/, "token_type_1" );
    st.addRule( /\([a-z ]+\)/, "token_type_2" );

    var txtToTest = "Lorem [ipsum] dolor [sit amet], (consectetur adipisicing) elit, sed do eiusmod [tempor] incididunt ut labore et dolore magna aliqua";

    var tokens = st.parseSync(txtToTest);
    console.log(tokens);


API documentation
-----------------

_Class_ `SimpleTokenizer2`

_Properties_
* `rules`: List of RegExp to check
* `speed`: The speed of async mode

_Methods_
* `parse`: void function (string, void callback(Array)) > Parse a string and call the callback when it finish
* `parseSync`: Array function(string) > Parse a string and return a list of tokens
* `addRule`: void function (RegExp, string) > Add a new rule to test

_Events_
* `data`: On Async parse, when gets a new token
* `token`: Same `data` event
* `end`: On Async parse, when finish to test all string

Licence
-------
The MIT License (MIT)

Copyright (c) 2013 Andres Lozada Mosto

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
