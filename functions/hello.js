exports.handler = async function (event, context){
    return{
        statusCode : 200,
        body : JSON.stringify({
            naem: 'NEWNEW',
            age: 30
        })
    }
}