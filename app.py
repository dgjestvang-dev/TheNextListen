
from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')    

@app.route('/feed')
def feed():
    return render_template('feed.html')

@app.route('/mymusic')
def mymusic():
    return render_template('mymusic.html')


if __name__ == "__main__":
    app.run(debug=True)
