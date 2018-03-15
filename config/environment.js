var config={
    "port":"",
    "dbName":"",
    "dbHost":"",
    "secretKey":"",
    "socketPort":"",
    "type":""
};
if(process.env.npm_config_argv !=undefined){
    var enviroment=JSON.parse(process.env.npm_config_argv);
        enviroment=enviroment.remain[0];
        if(enviroment === "development" || enviroment ==="dev"){
            config.port=3000;
            config.dbName="chatMe",
            config.dbHost="localhost:27017"
            config.secretKey="secret";
            config.socketPort=4000;
            config.type="development";
        }else if(enviroment ==="production" || enviroment === "prod"){
            config.port=4000;
            config.dbName="",
            config.dbHost=process.env.dbuserName+":"+process.env.dbPassword+"@ds249707.mlab.com:49707/chat"
            config.secretKey="secret";
            config.socketPort=5000;
            config.type="production";
        }
        else if(enviroment ==="staging"){
            config.port=4000;
            config.dbName="",
            config.dbHost=process.env.dbuserName+":"+process.env.dbPassword+"@ds249707.mlab.com:49707/chat"
            config.secretKey="secret";
            config.socketPort=5000;
            config.type="staging";
        }else{
            config.port=3000;
            config.dbName="chatMe",
            config.dbHost="localhost:27017"
            config.secretKey="secret";
            config.socketPort=4000;
            config.type="development";
        }
    }else{
        config.port=3000;
        config.dbName="chatMe",
        config.dbHost="localhost:27017"
        config.secretKey="secret";
        config.socketPort=4000;
    }

    module.exports = config;