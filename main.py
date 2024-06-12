from flask import Flask, render_template, abort
from sqlalchemy.sql.expression import func

app = Flask(__name__)


@app.route('/')
def main():
    return render_template('guess.html')


if __name__ == '__main__':
    app.run(debug=True)
