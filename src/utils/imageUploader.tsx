export const imageUploader = async (imageFile:File) =>{
    try {
        const formData = new FormData();
        formData.append('image', imageFile);
    
        // Make a POST request to ImgBB's upload API using fetch
        const response = await fetch('https://api.imgbb.com/1/upload?key=6f86d66cc799b084d1e64b3150aef3db', {
          method: 'POST',
          body: formData,
        });
    
        if (!response.ok) {
          throw new Error('Image upload failed');
        }
    
        const responseData = await response.json();
    
        // Return the ImgBB response
        return responseData.data;
      } catch (error) {
        console.error('Error uploading image to ImgBB:', error);
        throw error;
      }
}