import * as face from 'face-detector'
 
const imageUrl = 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
 
face.detect(imageUrl,function(result){
  console.log(result)
 
})