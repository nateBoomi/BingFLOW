function getCharFromInt(a){return "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$".charAt(a);};

var i, value,
	context_dictionary= {},
	context_dictionaryToCreate= {},
	context_c="",
	context_wc="",
	context_w="",
	context_enlargeIn= 2, // Compensate for the first entry which should not count
	context_dictSize= 3,
	context_numBits= 2,
	context_data=[],
	context_data_val=0,
	context_data_position=0,
	ii;

for (ii = 0; ii < exportString.length; ii += 1) {
  context_c = exportString.charAt(ii);
  if (!Object.prototype.hasOwnProperty.call(context_dictionary,context_c)) {
	context_dictionary[context_c] = context_dictSize++;
	context_dictionaryToCreate[context_c] = true;
  }

  context_wc = context_w + context_c;
  if (Object.prototype.hasOwnProperty.call(context_dictionary,context_wc)) {
	context_w = context_wc;
  } else {
	if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate,context_w)) {
	  if (context_w.charCodeAt(0)<256) {
		for (i=0 ; i<context_numBits ; i++) {
		  context_data_val = (context_data_val << 1);
		  if (context_data_position == 5) {
			context_data_position = 0;
			context_data.push(getCharFromInt(context_data_val));
			context_data_val = 0;
		  } else {
			context_data_position++;
		  }
		}
		value = context_w.charCodeAt(0);
		for (i=0 ; i<8 ; i++) {
		  context_data_val = (context_data_val << 1) | (value&1);
		  if (context_data_position == 5) {
			context_data_position = 0;
			context_data.push(getCharFromInt(context_data_val));
			context_data_val = 0;
		  } else {
			context_data_position++;
		  }
		  value = value >> 1;
		}
	  } else {
		value = 1;
		for (i=0 ; i<context_numBits ; i++) {
		  context_data_val = (context_data_val << 1) | value;
		  if (context_data_position == 5) {
			context_data_position = 0;
			context_data.push(getCharFromInt(context_data_val));
			context_data_val = 0;
		  } else {
			context_data_position++;
		  }
		  value = 0;
		}
		value = context_w.charCodeAt(0);
		for (i=0 ; i<16 ; i++) {
		  context_data_val = (context_data_val << 1) | (value&1);
		  if (context_data_position == 5) {
			context_data_position = 0;
			context_data.push(getCharFromInt(context_data_val));
			context_data_val = 0;
		  } else {
			context_data_position++;
		  }
		  value = value >> 1;
		}
	  }
	  context_enlargeIn--;
	  if (context_enlargeIn === 0) {
		context_enlargeIn = Math.pow(2, context_numBits);
		context_numBits++;
	  }
	  delete context_dictionaryToCreate[context_w];
	} else {
	  value = context_dictionary[context_w];
	  for (i=0 ; i<context_numBits ; i++) {
		context_data_val = (context_data_val << 1) | (value&1);
		if (context_data_position == 5) {
		  context_data_position = 0;
		  context_data.push(getCharFromInt(context_data_val));
		  context_data_val = 0;
		} else {
		  context_data_position++;
		}
		value = value >> 1;
	  }


	}
	context_enlargeIn--;
	if (context_enlargeIn === 0) {
	  context_enlargeIn = Math.pow(2, context_numBits);
	  context_numBits++;
	}
	// Add wc to the dictionary.
	context_dictionary[context_wc] = context_dictSize++;
	context_w = String(context_c);
  }
}

// Output the code for w.
if (context_w !== "") {
  if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate,context_w)) {
	if (context_w.charCodeAt(0)<256) {
	  for (i=0 ; i<context_numBits ; i++) {
		context_data_val = (context_data_val << 1);
		if (context_data_position == 5) {
		  context_data_position = 0;
		  context_data.push(getCharFromInt(context_data_val));
		  context_data_val = 0;
		} else {
		  context_data_position++;
		}
	  }
	  value = context_w.charCodeAt(0);
	  for (i=0 ; i<8 ; i++) {
		context_data_val = (context_data_val << 1) | (value&1);
		if (context_data_position == 5) {
		  context_data_position = 0;
		  context_data.push(getCharFromInt(context_data_val));
		  context_data_val = 0;
		} else {
		  context_data_position++;
		}
		value = value >> 1;
	  }
	} else {
	  value = 1;
	  for (i=0 ; i<context_numBits ; i++) {
		context_data_val = (context_data_val << 1) | value;
		if (context_data_position == 5) {
		  context_data_position = 0;
		  context_data.push(getCharFromInt(context_data_val));
		  context_data_val = 0;
		} else {
		  context_data_position++;
		}
		value = 0;
	  }
	  value = context_w.charCodeAt(0);
	  for (i=0 ; i<16 ; i++) {
		context_data_val = (context_data_val << 1) | (value&1);
		if (context_data_position == 5) {
		  context_data_position = 0;
		  context_data.push(getCharFromInt(context_data_val));
		  context_data_val = 0;
		} else {
		  context_data_position++;
		}
		value = value >> 1;
	  }
	}
	context_enlargeIn--;
	if (context_enlargeIn === 0) {
	  context_enlargeIn = Math.pow(2, context_numBits);
	  context_numBits++;
	}
	delete context_dictionaryToCreate[context_w];
  } else {
	value = context_dictionary[context_w];
	for (i=0 ; i<context_numBits ; i++) {
	  context_data_val = (context_data_val << 1) | (value&1);
	  if (context_data_position == 5) {
		context_data_position = 0;
		context_data.push(getCharFromInt(context_data_val));
		context_data_val = 0;
	  } else {
		context_data_position++;
	  }
	  value = value >> 1;
	}


  }
  context_enlargeIn--;
  if (context_enlargeIn === 0) {
	context_enlargeIn = Math.pow(2, context_numBits);
	context_numBits++;
  }
}

// Mark the end of the stream
value = 2;
for (i=0 ; i<context_numBits ; i++) {
  context_data_val = (context_data_val << 1) | (value&1);
  if (context_data_position == 5) {
	context_data_position = 0;
	context_data.push(getCharFromInt(context_data_val));
	context_data_val = 0;
  } else {
	context_data_position++;
  }
  value = value >> 1;
}

// Flush the last char
while (true) {
  context_data_val = (context_data_val << 1);
  if (context_data_position == 5) {
	context_data.push(getCharFromInt(context_data_val));
	break;
  }
  else context_data_position++;
}
exportString = context_data.join('');

	

/* Lz-string by pieroxy:
MIT License

Copyright (c) 2013 pieroxy

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. */