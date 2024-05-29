from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('guess_page.html')


@app.route('/about')
def about():
    return '<h1>About site</h1>'


if __name__ == '__main__':
    app.run(debug=True)