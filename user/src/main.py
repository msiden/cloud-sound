from fastapi import Depends, FastAPI, HTTPException
from pydantic import BaseModel
from sqlalchemy import create_engine, Integer, Column
from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy.ext.declarative import declarative_base


engine = create_engine("sqlite:///./user.db", connect_args={"check_same_thread": False})

LocalSession = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


class User(BaseModel):
    id: int

    class Config:
        orm_mode = True


class UserModel(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)


Base.metadata.create_all(bind=engine)

app = FastAPI()


def get_db():
    db = LocalSession()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
def root():
    return {"message": "There is no Spoon"}


@app.get("/user/{user_id}")
def get_user(user_id: int, db: Session = Depends(get_db)):
    user = db_get_user(user_id, db)
    print(user)
    if not user:
        raise HTTPException(status_code=404, detail="Not found.")
    return user


@app.post("/user")
def create_user(user: User, db: Session = Depends(get_db)):
    db_user = db_get_user(user.id, db)
    if db_user:
        raise HTTPException(status_code=409, detail=f"{user.id} already exists")
    return db_create_user(user, db)


def db_get_user(
    user_id: int,
    db: Session,
):
    return db.query(UserModel).filter(UserModel.id == user_id).first()


def db_create_user(user: User, db: Session):
    db_user = UserModel(id=user.id)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user
