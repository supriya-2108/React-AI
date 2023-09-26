import React, { useState, useEffect } from 'react'
import axios from 'axios';
const App = () => {
  const [prompt,setPrompt]=useState('')
  const [story,setStory]=useState('')
  const PromptShare=(event)=>{
    event.preventDefault()
    const data={key1:prompt}
    fetch("http://127.0.0.1:8080/story",{
      method: "POST",   
      headers: {
          'Content-Type': 'application/json', 
      },
      body:JSON.stringify(data.key1)
  }).then( response=> response.text())
  .then((data) => {
    setStory(data);
})
  .catch((error) => {
      // Handle any errors
      console.error('Error sending data:', error);
  });
}
const downloadText = () => {
  const text = story; // Get the content from the textarea

  // Create a new Blob object with the text content
  const blob = new Blob([text], { type: "text/plain" });

  // Create a temporary <a> element and set its download attribute to specify the file name
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "file.txt"; // Replace with your desired file name

  // Programmatically click the link to trigger the download
  link.click();

  // Clean up the URL.createObjectURL by revoking the object URL after some time
  setTimeout(() => {
    URL.revokeObjectURL(link.href);
  }, 100);
};
  

  const handlePromptChange=(event)=>{
    setPrompt(event.target.value);
    
  }

  // API TO  SHARE WITH
const share=()=>{
  if (navigator.share) {
    navigator.share({
        title: 'YOUR STORY',
        text:story
    }).then(() => {
        console.log('Thanks for sharing!');
    }).catch(err => {

        // Handle errors, if occurred
        console.log(
        "Error while using Web share API:");
        console.log(err);
    });
} else {

    // Alerts user if API not available
    alert("Browser doesn't support this API !");
}
}
  return (
    <>
    <div style={{marginLeft:"20%",marginTop:"2%"}}>
    <form>
      <label>Enter the prompt for the story you want to create</label><br/>
      <input type="text" name="prompt" value={prompt} onChange={handlePromptChange}/>
      <button type='submit' onClick={PromptShare}>Submit</button><br/><br/><br/>
      </form> 
      {
        story!==""?<><label style={{fontWeight:"bold"}}>YourStory</label><br/><textarea value={story} style={{height:"400px",width:"600px",border:"none"}} /><br/><button onClick={downloadText}>Save</button><button onClick={share}>Share</button></>:""
      }
    </div>
    </>
  )
}

export default App
