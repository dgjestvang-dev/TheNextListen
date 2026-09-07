
from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('discover.html', active_page='home')

@app.route('/feed')
def feed():
    return render_template('feed.html', active_page='feed')

@app.route('/mymusic')
def mymusic():
    return render_template('mymusic.html', active_page='mymusic')


if __name__ == "__main__":
    app.run(debug=True)
