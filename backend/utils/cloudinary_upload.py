import cloudinary
import cloudinary.uploader
from werkzeug.utils import secure_filename
import os

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'webp', 'mp4', 'webm'}

def allowed_file(filename):
    """Check if file extension is allowed"""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def upload_to_cloudinary(file, folder="portfolio"):
    """Upload file to Cloudinary"""
    if not file:
        return None
    
    if not allowed_file(file.filename):
        raise ValueError(f"File type not allowed. Allowed types: {', '.join(ALLOWED_EXTENSIONS)}")
    
    try:
        # Upload to Cloudinary
        result = cloudinary.uploader.upload(
            file,
            folder=folder,
            resource_type="auto",  # Automatically detect image or video
            transformation={
                'quality': 'auto:good',
                'fetch_format': 'auto'
            }
        )
        
        return {
            'url': result['secure_url'],
            'public_id': result['public_id'],
            'type': result['resource_type'],
            'format': result['format'],
            'width': result.get('width'),
            'height': result.get('height'),
            'size': result.get('bytes')
        }
    except Exception as e:
        raise Exception(f"Error uploading to Cloudinary: {str(e)}")

def delete_from_cloudinary(public_id):
    """Delete file from Cloudinary"""
    try:
        result = cloudinary.uploader.destroy(public_id)
        return result['result'] == 'ok'
    except Exception as e:
        print(f"Error deleting from Cloudinary: {str(e)}")
        return False

def upload_multiple_files(files, folder="portfolio"):
    """Upload multiple files to Cloudinary"""
    uploaded_files = []
    errors = []
    
    for file in files:
        try:
            if file and allowed_file(file.filename):
                result = upload_to_cloudinary(file, folder)
                uploaded_files.append(result)
            else:
                errors.append(f"Invalid file: {file.filename}")
        except Exception as e:
            errors.append(f"Error uploading {file.filename}: {str(e)}")
    
    return uploaded_files, errors