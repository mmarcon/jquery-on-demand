#!/usr/bin/env node

var fs = require('fs'),
    path = require('path'),
    wrench = require('wrench');

var args = process.argv,
    executable = args[1],
    input = args[2],
    outputFolder = input.replace(/\./g, '-') + '-ondemand';

var model = {
    all: '',
    groups: {},
    functions: [],
    objects: []
};

var annotationsHandler = function (input, callback) {
    var annotationsAndOptions = /\/\/\s@(.+)\n((?:.+\n)+)\/\/\s@end(.+)/gm,
        attributes = /\((.+)\)/g,
        result, att, match = {}, attArray;
    while ((result = annotationsAndOptions.exec(input))) {
        while ((att = attributes.exec(result[1]))) {
            attArray = att[1].split(',');
            attArray.forEach(function(e){
                var av = e.split('=');
                match.attributes = match.attributes || [];
                match.attributes.push({attr: av[0], value: av[1]});
            });
        }
        match.code = result[2];
        match.role = result[1].split(' ')[0];
        if (typeof callback === 'function') {
            callback (match);
        }
        //Reset match
        match = {};
    }
}

fs.readFile(input, function(err, content) {
    var toBeParsed, units = [], model = {}, g, data, nss;
    if (err) {
        console.log(err);
        process.exit(1);
    }

    toBeParsed = content.toString();

    annotationsHandler(toBeParsed, function(u){
        var group, name;
        switch (u.role) {
            case 'all':
                model.all = model.all || [];
                model.all.push(u.code);
                break;
            case 'function':
            case 'object':
                group = 'ungrouped';
                name = 'unnamed';
                namespace = 'window';
                u.attributes.forEach(function(a){
                    if(a.attr === 'group') group = a.value;
                    else if (a.attr === 'name') name = a.value;
                    else if (a.attr === 'namespace') namespace = a.value;
                });
                model.groups = model.groups || {};
                model.groups[group] = model.groups[group] || [];
                model.groups[group].push({code: u.code, name: name, ns: namespace});
        }
    });
    
    if (fs.existsSync(outputFolder)) {
        wrench.rmdirSyncRecursive(outputFolder, false);
    }
    fs.mkdirSync(outputFolder);

    for (g in model.groups) {
        data = model.all ? model.all.join('\n') : '';
        nss = [];
        model.groups [g].forEach(function(o){
            data += o.code + '\n';
            if (nss.indexOf(o.ns) === -1) {
                nss.push(o.ns);
            }
        });
        data += '(function(){';
        nss.forEach(function(ns){
            data += '$.onDemand.registerAll('+ns+');';
        })
        data += '})();';
        fs.writeFileSync(outputFolder + '/' + g + '-ondemand.js', data);
    }

});