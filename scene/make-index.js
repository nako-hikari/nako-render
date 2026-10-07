const fs=require('fs'),path=require('path');
const dir=__dirname;
const files=fs.readdirSync(dir).filter(f=>/\.json$/i.test(f)&&f.toLowerCase()!=='index.json').sort();
fs.writeFileSync(path.join(dir,'index.json'),JSON.stringify(files,null,2)+'\n');
console.log('index.json updated with '+files.length+' scene(s)');
