from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Sample quiz data
questions = [
    {"id": 1, "question": "What does HTML stand for?", "difficulty": "Easy"},
    {"id": 2, "question": "Which tag is used for the largest heading?", "difficulty": "Easy"},
    {"id": 3, "question": "What does CSS stand for?", "difficulty": "Medium"},
    {"id": 4, "question": "Which CSS property changes text color?", "difficulty": "Medium"},
    {"id": 5, "question": "Which keyword declares a constant in JavaScript?", "difficulty": "Hard"},
    {"id": 6, "question": "What is JSON used for?", "difficulty": "Hard"}
]

user = {
    "xp": 0,
    "level": 1
}

@app.route("/")
def home():
    return jsonify({"message": "Backend is running"})

@app.route("/questions")
def get_questions():
    return jsonify(questions)

@app.route("/submit", methods=["POST"])
def submit():
    data = request.json
    correct = data.get("correct", False)

    if correct:
        user["xp"] += 10

    if user["xp"] >= 50:
        user["level"] = 2
    if user["xp"] >= 100:
        user["level"] = 3

    return jsonify(user)

@app.route("/analytics")
def analytics():
    return jsonify(user)

if __name__ == "__main__":
    app.run(debug=True)
