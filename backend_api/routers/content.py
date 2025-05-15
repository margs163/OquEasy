from fastapi import APIRouter, Path, Depends, HTTPException, status, UploadFile, File, Query
from typing import Annotated, Any
from pydantic import BaseModel
from ..db_dependency import get_async_session
from ..schemas.content import Topic, Content, Module, ContentPresentation, ContentVideo
from sqlalchemy import select
from sqlalchemy.orm import joinedload
from sqlalchemy.ext.asyncio import AsyncSession
import os
import json

router = APIRouter(prefix="/content", tags=["content"])

# FLOW:
# 1. User presses to create new topic
# 2. User writes a module_name and topic_name and it creates a new topic
# 3. User adds a text content by pressing and edit button. He writes a main heading and selects .md file.
# 4. User adds a presentation by pressing and edit button. 
#
#

@router.get("/{topic_name}")
async def get_topic_data(
    topic_name: Annotated[str, Path(title="the topic name associated with materials")],
    session: Annotated[AsyncSession, Depends(get_async_session)]
    ):
    try:
        topic_in_db = await session.execute(select(Topic).where(Topic.topic_name == topic_name))
        topic_in_db = topic_in_db.scalars().first()
        if not topic_in_db:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Topic not found!")
    
        result = await session.execute(
            select(Topic).options(
                joinedload(Topic.content_rel)
                .joinedload(Content.images),
                joinedload(Topic.content_rel)
                .joinedload(Content.presentations),
                joinedload(Topic.content_rel)
                .joinedload(Content.videos))
                .where(Topic.topic_name == topic_name))
        
        data = result.scalars().first()
        images = []
        presentations = []
        videos = []

        if not data:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Topic not found in damn!")

        theory_obj = json.loads(data.content_rel.topic_content)
        for image in data.content_rel.images:
            images.append(image.image_path)
        for present in data.content_rel.presentations:
            presentations.append(present.presentation_path)
        for video in data.content_rel.videos:
            videos.append(video.video_path)

        return {
            "theory": theory_obj,
            "images": images,
            "presentations": presentations,
            "videos": videos
        }
        
    except Exception as e:
        raise Exception("Exception:", e)

@router.patch("/text/{topic_name}")
async def delete_topic_text(
    topic_name: Annotated[str, Path(title="The topic name associated with materials")],
    session: Annotated[AsyncSession, Depends(get_async_session)],
    heading: Annotated[str, Query()] = None,
    delete_content: Annotated[bool, Query()] = False
):
    try:
        async with session.begin():
            topic_in_db = await session.execute(
                select(Topic)
                .options(joinedload(Topic.content_rel))
                .where(Topic.topic_name == topic_name)
            )
            topic_in_db = topic_in_db.scalars().first()

            if not topic_in_db:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Topic not found!")

            if not topic_in_db.content_rel:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No content found for this topic!")

            old_content = json.loads(topic_in_db.content_rel.topic_content)

            if heading and delete_content:
                new_content = {
                "module": old_content.get('module', ''),
                "topic": old_content.get('topic', ''),
                "mainHeading": heading,
                "content": [""]
            } 
            elif heading:
                new_content = {
                "module": old_content.get('module', ''),
                "topic": old_content.get('topic', ''),
                "mainHeading": heading,
                "content": old_content.get("content"),
            }  
            else:
                new_content = {
                    "module": old_content.get('module', ''),
                    "topic": old_content.get('topic', ''),
                    "mainHeading": old_content.get('mainHeading', ''),
                    "content": []
                }

            topic_in_db.content_rel.topic_content = json.dumps(new_content)

            print(f"[DEBUG]: Successfully emptied content for topic '{topic_name}'!")
            return {
                "changed": True,
                "message": f"Content for topic '{topic_name}' has been changed."
            }
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

@router.post("/text/{topic_name}")
async def inser_topic_text(
    module_name: Annotated[str, Query()],
    heading: Annotated[str, Query()],
    topic_name: Annotated[str, Path(title="The topic name associated with materials")],
    topic_content: Annotated[UploadFile, File()],
    session: Annotated[AsyncSession, Depends(get_async_session)],
    plain_module: Annotated[str, Query()] = None,
    plain_topic: Annotated[str, Query()] = None,
):
    try:
        async with session.begin():
            module_in_db = await session.execute(select(Module).where(Module.module_name == module_name))
            module_in_db = module_in_db.scalars().first()
            new_content = None

            if not module_in_db:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Module not found!")

            topic_in_db = await session.execute(
                select(Topic)
                .options(joinedload(Topic.content_rel))
                .where(Topic.topic_name == topic_name))
            topic_in_db = topic_in_db.scalars().first()

            if not topic_in_db:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Topic not found!")

            file_content = await topic_content.read()
            file_text = file_content.decode()

            if not topic_in_db.content_rel:
                if not plain_module and not plain_topic:
                    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Topic name and module name are not specified!")

                new_content = {
                    "module": plain_module,
                    "topic": plain_topic,
                    "mainHeading": heading,
                    "content": [file_text]
                }
            else:
                old_content = json.loads(topic_in_db.content_rel.topic_content)

                if not plain_module and not plain_topic:
                    new_content = {
                        "module": old_content['module'],
                        "topic": old_content['topic'],
                        "mainHeading": heading,
                        "content": [file_text]
                    }
                else:
                    new_content = {
                        "module": plain_module,
                        "topic": plain_topic,
                        "mainHeading": heading,
                        "content": [file_text]
                    }

            if not topic_in_db.content_rel:
                new_content = Content(
                    topic_id=topic_in_db.id,
                    topic_content=json.dumps(new_content),
                    presentations=[],
                    images=[],
                    videos=[]
                )
                session.add(new_content)
            else:
                topic_in_db.content_rel.topic_content = json.dumps(new_content)

            print(f"[DEBUG]: Successfully updated content for topic '{topic_name}'!")
            return {
                "inserted": True,
                "content": new_content
            }
    except Exception as e:
        raise e

@router.delete("/content/{topic_name}")
async def delete_topic_content(
    topic_name: Annotated[str, Path(title="The topic name associated with the content")],
    session: Annotated[AsyncSession, Depends(get_async_session)],
):
    try:
        async with session.begin():
            topic_in_db = await session.execute(
                select(Topic)
                    .options(joinedload(Topic.content_rel))
                    .where(Topic.topic_name == topic_name)
            )
            topic_in_db = topic_in_db.scalars().first()

            if not topic_in_db:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Topic not found!")

            if not topic_in_db.content_rel:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No content found for this topic!")

            topic_in_db.content_rel.topic_content = json.dumps({})

            print(f"[DEBUG]: Successfully deleted content for topic '{topic_name}'!")
            return {"message": f"Content for topic '{topic_name}' has been deleted."}
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

@router.post("/presentation/{topic_name}")
async def inser_topic_presentation(
    module_name: Annotated[str, Query()],
    topic_name: Annotated[str, Path(title="The topic name associated with materials")],
    session: Annotated[AsyncSession, Depends(get_async_session)],
    topic_presentation: Annotated[UploadFile, File()] = None,
    video_link: Annotated[str, Query()] = None,
):
    try:
        async with session.begin():
            module_in_db = await session.execute(select(Module).where(Module.module_name == module_name))
            module_in_db = module_in_db.scalars().first()
            file_content = None
            pre_path = None
            end_path = None

            if not module_in_db:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Module not found!")

            topic_in_db = await session.execute(
                select(Topic)
                .options(
                    joinedload(Topic.content_rel)
                    .joinedload(Content.presentations),
                    joinedload(Topic.content_rel)
                    .joinedload(Content.videos))
                .where(Topic.topic_name == topic_name))

            topic_in_db = topic_in_db.scalars().first()

            if not topic_in_db:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Topic not found!")
            
            if topic_presentation:
                file_content = await topic_presentation.read()
                pre_path = os.path.abspath(f"./backend_api/static/{module_name}/{topic_name}")
                end_path = os.path.join(pre_path, topic_presentation.filename)

                os.makedirs(pre_path, exist_ok=True, mode=0o755)

                with open(end_path, "wb") as file:
                    file.write(file_content)
                
            if topic_presentation and video_link:
                topic_in_db.content_rel.presentations.append(
                    ContentPresentation(presentation_path=f"http://localhost:8000/static/{module_name}/{topic_name}/{topic_presentation.filename}"))
                topic_in_db.content_rel.videos.append(
                    ContentVideo(video_path=video_link)
                )
            elif topic_presentation:
                topic_in_db.content_rel.presentations.append(
                    ContentPresentation(presentation_path=f"http://localhost:8000/static/{module_name}/{topic_name}/{topic_presentation.filename}"))
            elif video_link:
                topic_in_db.content_rel.videos.append(
                    ContentVideo(video_path=video_link)
                )
 
            print(f"[DEBUG]: Successfully updated content for topic '{topic_name}'!")
            return {
                "inserted_path": end_path
            }
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

@router.delete("/presentation/{topic_name}/{file_name}")
async def delete_topic_presentation(
    topic_name: Annotated[str, Path(title="The topic name associated with the presentation")],
    file_name: Annotated[str, Path(title="The name of the presentation file to delete")],
    session: Annotated[AsyncSession, Depends(get_async_session)],
):
    try:
        async with session.begin():
            topic_in_db = await session.execute(
                select(Topic)
                    .options(
                        joinedload(Topic.content_rel)
                        .joinedload(Content.presentations)
                    )
                    .where(Topic.topic_name == topic_name)
            )
            topic_in_db = topic_in_db.scalars().first()

            if not topic_in_db:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Topic not found!")

            if not topic_in_db.content_rel or not topic_in_db.content_rel.presentations:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No presentations found for this topic!")

            presentation_to_delete = None
            for presentation in topic_in_db.content_rel.presentations:
                if presentation.presentation_path.endswith(file_name):
                    presentation_to_delete = presentation
                    break

            if not presentation_to_delete:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Presentation not found!")

            await session.delete(presentation_to_delete)

            file_path = os.path.abspath(presentation_to_delete.presentation_path.replace("http://localhost:8000", "./backend_api"))
            if os.path.exists(file_path):
                os.remove(file_path)
                print(f"[DEBUG]: File '{file_path}' deleted from filesystem.")
            else:
                print(f"[WARNING]: File '{file_path}' not found on filesystem.")

            print(f"[DEBUG]: Successfully deleted presentation '{file_name}' from topic '{topic_name}'!")
            return {"message": f"Presentation '{file_name}' has been deleted from topic '{topic_name}'."}
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

@router.delete("/video/{topic_name}")
async def delete_topic_video(
    topic_name: Annotated[str, Path(title="The topic name associated with the presentation")],
    video_link: Annotated[str, Query(title="The video link to delete to delete")],
    session: Annotated[AsyncSession, Depends(get_async_session)],
):
    try:
        async with session.begin():
            topic_in_db = await session.execute(
                select(Topic)
                    .options(
                        joinedload(Topic.content_rel)
                        .joinedload(Content.videos)
                    )
                    .where(Topic.topic_name == topic_name)
            )
            topic_in_db = topic_in_db.scalars().first()

            # return {"topic": topic_in_db}

            if not topic_in_db:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Topic not found!")

            if not topic_in_db.content_rel or not topic_in_db.content_rel.videos:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No videos found for this topic!")
            
            video_to_delete = None
            for video in topic_in_db.content_rel.videos:
                if video.video_path.endswith(video_link[10:]):
                    video_to_delete = video
                    break

            if not video_to_delete:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Video not found!")

            # return {"dsamn": video_to_delete}
            await session.delete(video_to_delete)

            print(f"[DEBUG]: Successfully deleted presentation '{video_link}' from topic '{topic_name}'!")
            return {"message": f"Video '{video_link}' has been deleted from topic '{topic_name}'."}
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))