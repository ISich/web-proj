from flask import Flask, render_template, abort
from sqlalchemy.sql.expression import func

app = Flask(__name__)

data = {
    "pop": {
        "genre": "ПопМузыка"
    },
    "internet-heroes":{
        "genre": "ИнтернетГерои"
    },
    "electronic": {
        "genre": "Электроника"
    },
    "rock": {
        "genre": "Рок"
    },
    "rurap": {
        "genre": "РусскийРэп"
    }
}


@app.route('/')
def main():
    return render_template('main_page.html')


@app.route('/<style>')
def guess(style):
    if style in data:
        return render_template('guess.html', style_data=data[style])
    else:
        return "Route not found", 404


if __name__ == '__main__':
    app.run(debug=True)
