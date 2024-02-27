from sqlalchemy import String, Integer, Float, and_
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy import create_engine
from sqlalchemy.orm import Session
from sqlalchemy import select
from sqlalchemy.exc import OperationalError
from sqlalchemy_utils import database_exists, create_database
from marshmallow_sqlalchemy import SQLAlchemySchema, auto_field
import uuid
import datetime


engine = create_engine("postgresql+psycopg2://reason:reason@db:5432/songs")
if not database_exists(engine.url):
    create_database(engine.url)

class Base(DeclarativeBase):
    pass


class Files(Base):
    __tablename__ = "files"
    id: Mapped[str] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String)
    created_at: Mapped[str] = mapped_column(String)
    created_by: Mapped[int] = mapped_column(String)


class FilesSchema(SQLAlchemySchema):
    class Meta:
        model = Files
        load_instance = True

    id = auto_field()
    name = auto_field()
    created_at = auto_field()
    created_by = auto_field()


def create_all():
    try:
        Base.metadata.create_all(engine)
    except OperationalError:
        print("DB connection failed")


def insert_data(file_id: str, name: str, user_id: int) -> uuid.uuid4:
    with Session(engine) as session:

        created_at = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        new_entry = Files(
            id=file_id,
            name=name,
            created_at=created_at,
            created_by=user_id
        )

        session.add(new_entry)
        session.commit()

    return id


def get_data() -> dict:
    files_schema = FilesSchema(many=True)

    with Session(engine) as session:
        statement = select(Files).order_by(Files.created_at.desc()) #.limit(chunk_size)
        result = session.scalars(statement).all()
        return files_schema.dump(result)


def delete(file_id: str, user_id: int) -> int:
    with Session(engine) as session:
        query = session.query(Files).filter(and_((Files.id==file_id), (Files.created_by==str(user_id))))
        count = query.count()
        query.delete()
        session.commit()
    return count


create_all()
