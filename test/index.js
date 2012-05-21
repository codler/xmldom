var wows = require('vows');
var assert = require('assert');
var DOMParser = require('xmldom').DOMParser;
var parser = new DOMParser();
// Create a Test Suite
wows.describe('XML Parser').addBatch({
    'simple type parser': {
        'element': function () { 
        	var dom = parser.parseFromString('<xml><child/></xml>');
        	assert.equal (dom.childNodes.length, 1);
        	assert.equal (dom.documentElement.childNodes.length, 1);
        	assert.equal (dom.documentElement.tagName, 'xml');
        	assert.equal (dom.documentElement.firstChild.tagName, 'child');
        },
        'cdata': function () {
        	var dom = parser.parseFromString('<xml>start <![CDATA[<encoded>]]> end</xml>');
        	var root = dom.documentElement;
        	assert.equal ( root.firstChild.data ,'start ');
        	assert.equal ( root.firstChild.nextSibling.data ,'<encoded>');
        },
        'textContent':function(){
        	
        }
    },
    'text node parser': {
        'cdata comment': function(){
        	var dom = parser.parseFromString('<xml>start <![CDATA[<encoded>]]> <!-- comment -->end</xml>');
        	var root = dom.documentElement;
        	assert.equal ( root.firstChild.nodeValue ,'start ');
        	assert.equal ( root.firstChild.nextSibling.nodeValue ,'<encoded>');
        	assert.equal ( root.firstChild.nextSibling.nextSibling.nextSibling.nodeValue ,' comment ');
        	assert.equal ( root.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nodeValue ,'end');
        }
    },
    'namespace parser': {
        'default namespace': function () { 
        	var dom = parser.parseFromString('<xml xmlns="http://test.com"></xml>');
        	var root = dom.documentElement;
        	assert.equal(root.namespaceURI,'http://test.com')
        }
    }
}).run(); // Run it