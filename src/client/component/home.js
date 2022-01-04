import React, { useState } from "react";
import ReactDom from "react-dom";
import Img from "../images/natural-language-processing-dealing-with-text-data-text-pre-processing-featured.jpg"
import { urlValidate } from "../js/checkUrl";




const Home = ()=>{
    const [articleUrl , setArticleUrl] = useState("");
    const [nlpData,setNlpData] = useState({})
    const [error,setError] = useState({isError:false , msg:""})

    const handleSubmit = (e)=>{
       e.preventDefault();
        const valid = urlValidate(articleUrl)
        if(!valid)
            {
                 alert("Enter Valid URL")
            }else

        { fetch("http://localhost:9000/" , {
            method : "POST",
            headers : {
                "Content-Type" :"application/json",
            },
            body :JSON.stringify({url : articleUrl}),
        })
        .then((res)=>res.json())
        .then((data) =>{
            console.log(data)
            if(data.status.code === "100"){
       return setError({isError:true ,msg:data.status.msg})
            }
         data.status = true;
            setNlpData(data)
        })
    }

    }
    return(
        <div className="home">
            <img src={Img}/>
<form onSubmit={handleSubmit}>
    <input type="text" id="userUrl" placeholder="Enter Valid URL " onChange={(e)=>setArticleUrl(e.target.value)}/>
     <button type="submit" >Analyze</button>
    </form>
<div className="results">
    <div className="nlpData">
    {nlpData && Object.entries(nlpData).map(([key,value])=>(
        <p key={key}>
            {key} : {value}
        </p>
    ))}
    {error.isError && <p>{error.msg}</p>}
    </div>
</div>
        </div>
    )
}

export default Home