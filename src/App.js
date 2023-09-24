import React, { useState } from 'react'
import GeneratedStory from './GeneratedStory'
import axios from 'axios';
const App = () => {
  
  const [prompt,setPrompt]=useState('')
  const [dummy,setDummy]=useState('')
  const [story,setStory]=useState('')
  const PromptShare=(event)=>{
    event.preventDefault()
    setPrompt(dummy)

    axios.post('/generate_story', { prompt })
            .then((response) => {
                setStory(response.data);
            })
            .catch((error) => {
                console.error('Error generating story:', error);
            });
    };
    
  

  const handlePromptChange=(event)=>{
    setDummy(event.target.value);
    
  }

  return (
    <>
     <form>
      <label>Enter the prompt</label>
      <textarea name="prompt" value={dummy} onChange={handlePromptChange}/>
      <button type='submit' onClick={PromptShare}>Submit</button>
      <GeneratedStory prompt={prompt}/>
      </form> 
    </>
  )
}

export default App
