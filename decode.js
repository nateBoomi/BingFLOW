var baseReverseDic = {};
var keyStrUriSafe = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$";

function getBaseValue(character) {
  if (!baseReverseDic[keyStrUriSafe]) {
    baseReverseDic[keyStrUriSafe] = {};
    for (var i=0 ; i<keyStrUriSafe.length ; i++) {
      baseReverseDic[keyStrUriSafe][keyStrUriSafe.charAt(i)] = i;
    }
  }
  return baseReverseDic[keyStrUriSafe][character];
}

importString = importString.replace(/ /g, "+");

var f = String.fromCharCode;

function getNextValue(index) { 
  return getBaseValue(importString.charAt(index)); 
};

var dictionary = [],
	next,
	enlargeIn = 4,
	dictSize = 4,
	numBits = 3,
	entry = "",
	result = [],
	i,
	w,
	bits, resb, maxpower, power,
	c,
	data = {val:getNextValue(0), position:32, index:1};

for (i = 0; i < 3; i += 1) {
  dictionary[i] = i;
}

bits = 0;
maxpower = Math.pow(2,2);
power=1;
while (power!=maxpower) {
  resb = data.val & data.position;
  data.position >>= 1;
  if (data.position === 0) {
	data.position = 32;
	data.val = getNextValue(data.index++);
  }
  bits |= (resb>0 ? 1 : 0) * power;
  power <<= 1;
}

switch (next = bits) {
  case 0:
	  bits = 0;
	  maxpower = Math.pow(2,8);
	  power=1;
	  while (power!=maxpower) {
		resb = data.val & data.position;
		data.position >>= 1;
		if (data.position === 0) {
		  data.position = 32;
		  data.val = getNextValue(data.index++);
		}
		bits |= (resb>0 ? 1 : 0) * power;
		power <<= 1;
	  }
	c = f(bits);
	break;
  case 1:
	  bits = 0;
	  maxpower = Math.pow(2,16);
	  power=1;
	  while (power!=maxpower) {
		resb = data.val & data.position;
		data.position >>= 1;
		if (data.position === 0) {
		  data.position = 32;
		  data.val = getNextValue(data.index++);
		}
		bits |= (resb>0 ? 1 : 0) * power;
		power <<= 1;
	  }
	c = f(bits);
	break;
  case 2: 
	  break;
	//return "";
}
dictionary[3] = c;
w = c;
result.push(c);

while (true) {
  if (data.index > importString.length) {
	  break;
	//return "";
  }

  bits = 0;
  maxpower = Math.pow(2,numBits);
  power=1;
  while (power!=maxpower) {
	resb = data.val & data.position;
	data.position >>= 1;
	if (data.position === 0) {
	  data.position = 32;
	  data.val = getNextValue(data.index++);
	}
	bits |= (resb>0 ? 1 : 0) * power;
	power <<= 1;
  }

  switch (c = bits) {
	case 0:
	  bits = 0;
	  maxpower = Math.pow(2,8);
	  power=1;
	  while (power!=maxpower) {
		resb = data.val & data.position;
		data.position >>= 1;
		if (data.position === 0) {
		  data.position = 32;
		  data.val = getNextValue(data.index++);
		}
		bits |= (resb>0 ? 1 : 0) * power;
		power <<= 1;
	  }

	  dictionary[dictSize++] = f(bits);
	  c = dictSize-1;
	  enlargeIn--;
	  break;
	case 1:
	  bits = 0;
	  maxpower = Math.pow(2,16);
	  power=1;
	  while (power!=maxpower) {
		resb = data.val & data.position;
		data.position >>= 1;
		if (data.position === 0) {
		  data.position = 32;
		  data.val = getNextValue(data.index++);
		}
		bits |= (resb>0 ? 1 : 0) * power;
		power <<= 1;
	  }
	  dictionary[dictSize++] = f(bits);
	  c = dictSize-1;
	  enlargeIn--;
	  break;
	case 2:
	  importString = result.join('');
  }

  if (enlargeIn === 0) {
	enlargeIn = Math.pow(2, numBits);
	numBits++;
  }

  if (dictionary[c]) {
	entry = dictionary[c];
  } else {
	if (c === dictSize) {
	  entry = w + w.charAt(0);
	} else {
	  break;
	  //return null;
	}
  }
  entry = '' + entry;
  result.push(entry);

  // Add w+entry[0] to the dictionary.
  dictionary[dictSize++] = w + entry.charAt(0);
  enlargeIn--;

  w = entry;

  if (enlargeIn === 0) {
	enlargeIn = Math.pow(2, numBits);
	numBits++;
  }

}
  
bingoData = importString;




/* Lz-string by pieroxy:
MIT License

Copyright (c) 2013 pieroxy

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. */