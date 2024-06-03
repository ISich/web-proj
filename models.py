from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from sqlalchemy import ForeignKey


class Base(DeclarativeBase):
    pass


class Tracks(Base):
    __tablename__ = 'tracks'

    id: Mapped[int] = mapped_column(autoincrement=True, primary_key=True)
    name: Mapped[str]
    type: Mapped[str]


class Singers(Base):
    __tablename__ = 'singers'

    id: Mapped[int] = mapped_column(autoincrement=True, primary_key=True)
    name: Mapped[str]


class TracksBySingers(Base):
    __tablename__ = 'tracksbysingers'

    track_id: Mapped[int] = mapped_column(ForeignKey('tracks.id'), primary_key=True)
    singer_id: Mapped[int] = mapped_column(ForeignKey('singers.id'), primary_key=True)