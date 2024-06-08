from flask import Flask, render_template, abort
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import ForeignKey
from sqlalchemy.sql.expression import func
from config import settings

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = settings.DATABASE_URL_psycopg
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Track(db.Model):
    __tablename__ = 'tracks'

    id: Mapped[int] = mapped_column(autoincrement=True, primary_key=True)
    name: Mapped[str]
    type: Mapped[str]
    singers = db.relationship('TrackBySinger', back_populates='track')


class Singer(db.Model):
    __tablename__ = 'singers'

    id: Mapped[int] = mapped_column(autoincrement=True, primary_key=True)
    name: Mapped[str]
    tracks = db.relationship('TrackBySinger', back_populates='singer')


class TrackBySinger(db.Model):
    __tablename__ = 'tracksbysingers'

    track_id: Mapped[int] = mapped_column(ForeignKey('tracks.id'), primary_key=True)
    singer_id: Mapped[int] = mapped_column(ForeignKey('singers.id'), primary_key=True)
    track = db.relationship('Track', back_populates='singers')
    singer = db.relationship('Singer', back_populates='tracks')


@app.route('/')
def main():
    return render_template('main_page.html')


@app.route('/<style>')
def show_style(style):
    if style not in ['pop', 'internet-heroes', 'rurap', 'electronic']:
        abort(404)

    tracks = db.session.query(Track).filter_by(type=style).order_by(func.random()).limit(12).all()
    if not tracks:
        abort(404)

    tracks_data = []

    for track in tracks:
        singers = db.session.query(Singer).join(TrackBySinger).filter(TrackBySinger.track_id == track.id).all()
        tracks_data.append({'track': track, 'singers': singers})

    return render_template('guess.html', tracks_data=tracks_data, style=style.capitalize())


def parse_tracks(filename):
    tracks = []
    with open(filename, 'r', encoding='utf-8') as file:
        for line in file:
            # Разделяем строку на части: исполнители и трек с типом
            parts = line.strip().rsplit(' ', 1)
            if len(parts) != 2:
                continue  # Пропускаем строки с некорректным форматом

            artists_part, track_type = parts
            # Разделяем исполнителей и название трека
            artists_and_track = artists_part.rsplit(' ', 1)
            if len(artists_and_track) != 2:
                continue  # Пропускаем строки с некорректным форматом

            artists, track_name = artists_and_track
            # Разделяем исполнителей по запятым
            artists_list = [artist.strip() for artist in artists.split(',')]

            track_info = {
                'artists': artists_list,
                'track_name': track_name,
                'track_type': track_type
            }
            tracks.append(track_info)
    return tracks


def add_tracks_to_db(tracks):
    for track in tracks:
        # Проверяем, существует ли трек в базе данных
        existing_track = db.session.query(Track).filter_by(name=track['track_name'], type=track['track_type']).first()
        if not existing_track:
            new_track = Track(name=track['track_name'], type=track['track_type'])
            db.session.add(new_track)
            db.session.commit()
        else:
            new_track = existing_track

        for artist_name in track['artists']:
            # Проверяем, существует ли певец в базе данных
            existing_singer = db.session.query(Singer).filter_by(name=artist_name).first()
            if not existing_singer:
                new_singer = Singer(name=artist_name)
                db.session.add(new_singer)
                db.session.commit()
            else:
                new_singer = existing_singer

            # Проверяем, существует ли связь между треком и певцом
            existing_relation = db.session.query(TrackBySinger).filter_by(track_id=new_track.id, singer_id=new_singer.id).first()
            if not existing_relation:
                new_relation = TrackBySinger(track_id=new_track.id, singer_id=new_singer.id)
                db.session.add(new_relation)
                db.session.commit()


if __name__ == '__main__':
    with app.app_context():
        filename = 'tracks.txt'
        tracks = parse_tracks(filename)
        add_tracks_to_db(tracks)
        print("Данные успешно добавлены в базу данных.")
    app.run(debug=True)
