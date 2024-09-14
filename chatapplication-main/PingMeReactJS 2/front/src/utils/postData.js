const postData = async (method,route,body)=>{
    try{
        const headers = {
            'Content-Type':'application/json'
        }
        const response = await fetch(`http://localhost:8000/${route}`,{
            method,
            headers,
            body:JSON.stringify(body)
        })
        const data = await response.json()
        return data
    }
    catch(err){
        console.log(err);
        return err
    }
}


module.exports = postData