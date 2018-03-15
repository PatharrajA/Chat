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
    delete:removeFile
}

}();
module.exports = fileEvents;