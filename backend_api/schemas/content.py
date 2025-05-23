from sqlalchemy.orm import mapped_column, Mapped, relationship
from sqlalchemy import Text, String, Integer, ForeignKey
from typing import List
from ..db_dependency import Base

from dotenv import load_dotenv
load_dotenv()

class Module(Base):
    __tablename__ = "module"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    module_name: Mapped[str] = mapped_column(String(250), nullable=False, unique=True)

    topics: Mapped[List["Topic"]] = relationship("Topic", back_populates="topic_module", cascade="all, delete-orphan", lazy="selectin")

    def __repr__(self) -> str:
        return f"Module(id={self.id}, module_name={self.module_name}, topics={self.topics})"

class Topic(Base):
    __tablename__ = "topic"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    topic_name: Mapped[str] = mapped_column(String(250), nullable=False, unique=True)

    module_id: Mapped[int] = mapped_column(ForeignKey("module.id", ondelete="CASCADE"))

    topic_module: Mapped["Module"] = relationship("Module", back_populates="topics", lazy="selectin")
    content_rel: Mapped["Content"] = relationship("Content", back_populates="topic_rel", cascade="all, delete-orphan", lazy="selectin")

    def __repr__(self) -> str:
        return f"Topic(id={self.id}, topic_name={self.topic_name}, module_id={self.module_id}, topic_module={self.topic_module})"


class Content(Base):
    __tablename__ = "content"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    topic_id: Mapped[int] = mapped_column(ForeignKey("topic.id", ondelete="CASCADE"))
    topic_content: Mapped[str] = mapped_column(Text, nullable=False)

    presentations: Mapped[List["ContentPresentation"]] = relationship("ContentPresentation", back_populates="presentation_rel", lazy="selectin")
    videos: Mapped[List['ContentVideo']] = relationship("ContentVideo", back_populates="video_rel", lazy="selectin")
    images: Mapped[List['ContentImage']] = relationship("ContentImage", back_populates="image_rel", lazy="selectin")

    topic_rel: Mapped["Topic"] = relationship("Topic", back_populates="content_rel", lazy="selectin")
    
class ContentPresentation(Base):
    __tablename__ = "presentation_media"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    presentation_path: Mapped[str] = mapped_column(String(1024), nullable=False)
    content_id: Mapped[int] = mapped_column(ForeignKey("content.id", ondelete="CASCADE"))
    presentation_rel: Mapped["Content"] = relationship("Content", back_populates="presentations", lazy="selectin")

class ContentImage(Base):
    __tablename__ = "image_media"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    image_path: Mapped[str] = mapped_column(String(1024), nullable=False)
    content_id: Mapped[int] = mapped_column(ForeignKey("content.id", ondelete="CASCADE"))
    image_rel: Mapped["Content"] = relationship("Content", back_populates="images", lazy="selectin")

class ContentVideo(Base):
    __tablename__ = "video_media"
    
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    video_path: Mapped[str] = mapped_column(String(1024), nullable=False)
    content_id: Mapped[int] = mapped_column(ForeignKey("content.id", ondelete="CASCADE"))
    video_rel: Mapped["Content"] = relationship("Content",  back_populates="videos", lazy="selectin")