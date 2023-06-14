import json
from typing import Union
from fastapi import  FastAPI
from pymongo import MongoClient
from bson.json_util import dumps
from fastapi.middleware.cors import CORSMiddleware
from pymongo.cursor import Cursor

# MongoDB connection
conn = MongoClient("mongodb+srv://manoj:kvno1chm@ikea.mkadg2e.mongodb.net/ikea?retryWrites=true&w=majority")
db = conn['Bookstore']  # Select the database
collection = db['Bookstore']  # Select the collection

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/books")
async def get_data(page: int = 1, limit: int = 12):
   
    skip = (page - 1) * limit
    items: Cursor = list(collection.find().skip(skip).limit(limit))
    
    # Retrieve the total count of items
    total_count = collection.count_documents({})
    stringdata= dumps(items)
    res= json.loads(stringdata)
    
    # Return the paginated items and total count as JSON response
    return {
        "items": res,
        "total_count": total_count,
        "page": page,
        "limit": limit
    }

@app.get("/search")
async def search_book(title: str = None, genres:str=None, rating: int= None , page: int = 1, limit: int = 12):

    skip= (page-1)*limit

    query={}

    if title:
        query["title"] = {"$regex" :title, "$options": "i"}
    if genres:
        query["genres"] = {"$in":[genres]} 
    if rating:
        query["rating"] = rating   

    result = collection.find({"$or":[query]}).skip(skip).limit(limit)

    stringdata= dumps(result)
    res= json.loads(stringdata)
    return {
        "items": res,
        "page": page,
        "limit": limit
    }

    












# @app.post("/book")
# async def add_book(book_data:dict):
#     print(book_data)

#     result =collection.insert_one(book_data)

#     if result.inserted_id:
#        return {"message": "Book added successfully", "book_id": str(result.inserted_id)}
#     else:
#         return {"message": "Failed to add book"}



# @app.delete("/book/{book_id}")
# async def delete_book(book_id:str):

#     # Delete the book based on the provided book_id
#     result = collection.delete_one({"_id":{"$oid":book_id}})
   
#     print(result)

#     if result.deleted_count:
#         return {"message": "Book deleted successfully"}
#     else:
#         return {"message": "Book not found"}

