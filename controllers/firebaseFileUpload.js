'use strict';
var fileEvents=function(){
    var bucket = gcs.bucket(process.env.firebaseProjectId + '.appspot.com');
var fileUpload=function(file){
    var uuid = UUID();
    bucket.upload(file).then(function(err,res){
        if(!err){
            var img_path="https://firebasestorage.googleapis.com/v0/b/"+process.env.firebaseProjectId+".appspot.com/o/"+ encodeURIComponent('copyright.png')+ "?alt=media&token=" + uuid;
            return img_path;
        }else{
            console.log(err);
            return err;
        }
    });
};


var base64Upload=function(filePath){
    filePath=filePath.replace('data:image/png;base64,','');
    var file=bucket.file("new.png");
    var buff = Buffer.from(filePath, 'binary').toString('utf-8');
    const stream = file.createWriteStream({
		metadata: {
			contentType: 'image/png'
		}
	});
	stream.on('error', (err) => {
		console.log(err);
	});
	stream.on('finish', () => {
		console.log("File Uploaded");
	});
	stream.end(new Buffer(buff, 'base64'));
};

var removeFile=function(file){
    bucket.file(file).delete().then(function(err,res){
        if(!err){
            console.log(res);
        }else{
console.log(err);
        }
    });
};

return {
    upload:fileUpload,
    delete:removeFile,
    base64Upload:base64Upload
}

}();
module.exports = fileEvents;