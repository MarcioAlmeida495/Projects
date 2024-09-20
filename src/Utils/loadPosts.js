export const loadPosts = async () => {
    const postsResponse = fetch('https://jsonplaceholder.typicode.com/posts');
    const [posts] = await Promise.all([postsResponse]);
    const postsJson = await posts.json();

    const photosResponse = fetch('https://jsonplaceholder.typicode.com/photos');
    const [photos] = await Promise.all([photosResponse]);
    const photosJson = await photos.json();

    console.log(postsJson);
    const postsAndPhotos = postsJson.map((post, index)=>{
      return { ...post, cover: photosJson[index].url }
    })

    //console.log();
    return postsAndPhotos;
}