# app.py
import os
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

load_dotenv()

api_key = os.getenv("API_KEY")

app = Flask(__name__)
CORS(app)

API_KEY = "mVbLY_DMDnGeoOT6qWSoxQ"

# People Search Route
@app.route("/api/search-people", methods=["POST"])
def search_people():
    try:
        url = "https://api.apollo.io/api/v1/mixed_people/search"
        
        headers = {
            "accept": "application/json",
            "Cache-Control": "no-cache",
            "Content-Type": "application/json",
            "x-api-key": api_key
        }
           
        response = requests.post(url, headers=headers, json=request.json)
        print(response.json())
        return jsonify(response.json()), response.status_code
        
        
       
    except Exception as e:
        
        print(f"Error: {str(e)}")
        return jsonify({"error": str(e)}), 500
        
# Companies Search Route
@app.route("/api/search-companies", methods=["POST"])
def search_companies():
    try:
        url = "https://api.apollo.io/api/v1/mixed_companies/search"
        
        headers = {
            "accept": "application/json",
            "Cache-Control": "no-cache",
            "Content-Type": "application/json",
            "x-api-key": api_key
        }

        response = requests.post(url, headers=headers, json=request.json)
        print("response is", response)
        return jsonify(response.json()), response.status_code

    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=3001) 

    