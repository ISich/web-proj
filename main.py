from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
from config import settings

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = settings.DATABASE_URL_psycopg
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)


@app.route('/')
def index():
    return render_template('guess.html')


@app.route('/about')
def about():
    return '<h1>About site</h1>'


if __name__ == '__main__':
    app.run(debug=True)