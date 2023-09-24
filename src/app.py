
from flask import Flask, request, jsonify
import subprocess

app = Flask(__name__)

@app.route('/generate_story', methods=['POST'])
def generate_story():
    try:
        prompt = request.json.get('prompt')
        # Call your Python script with the provided prompt
        result = subprocess.check_output(['python', 'ai-content.py', prompt], text=True)
        return jsonify({'story': result})
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)




