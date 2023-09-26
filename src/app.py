from flask import Flask, request, jsonify,json
import subprocess
from flask_cors import CORS
import os
import openai
 
import sys
openai.api_key =  "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"

app = Flask(__name__)
CORS(app)

@app.route('/story',methods=['GET','POST'] ,strict_slashes=False)
def story_gen():
      data = request.data
      response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
            {
                  "role": "user",
                  "content": "generate story on : {} ".format(data)
            }
            ],
            temperature=1,
            max_tokens=256,
            top_p=1,
            frequency_penalty=0,
            presence_penalty=0
            )
      if 'choices' in response:
           if (len(response['choices'])>0):
                answer=response['choices'][0]['message']['content']
                return(answer)
      
if __name__ == '__main__':
    app.run(debug=True ,port=8080,use_reloader=False)




