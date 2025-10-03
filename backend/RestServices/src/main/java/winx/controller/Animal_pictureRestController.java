package winx.controller;

import Domain.Animal;
import Domain.Animal_picture;
import Interfaces.IAnimal_pictureRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping("/furry_friends/animals_pictures")
@CrossOrigin(origins = "http://localhost:8080")
public class Animal_pictureRestController {
    @Autowired
    private IAnimal_pictureRepository repository;

    @GetMapping
    public Iterable<Animal_picture> getAllAnimal_pictures() {
        System.out.println("Getting animal pictures");
        try {
            return repository.getAll();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

//    @PostMapping("/upload")
//    public void upload(@RequestBody Animal_picture animal_picture) {
//        System.out.println("Uploading animal picture");
//        try {
//            repository.add(animal_picture);
//        } catch (Exception e) {
//            throw new RuntimeException(e);
//        }
//    }

    @PostMapping("/upload")
    public ResponseEntity<Map<String,String>> upload(@RequestParam("id_animal") int id_animal, @RequestParam("picture") MultipartFile picture) {
        System.out.println("Uploading animal picture");
        try {
            Animal animal = repository.getAnimalById(id_animal);
            if (animal == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "Animal not found"));
            }
            Animal_picture animal_picture = new Animal_picture();
            animal_picture.setAnimal(animal);
            animal_picture.setPictureData(picture.getBytes());
            repository.add(animal_picture);
            return ResponseEntity.ok(Map.of("message", "Picture uploaded successfully"));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("message", "Error uploading picture"));
        }
    }


//    @PutMapping("/update/{id}")
//    public void update(@PathVariable Integer id, @RequestBody Animal_picture animal_picture) {
//        System.out.println("Updating animal picture");
//        try {
//            repository.update(id, animal_picture);
//        } catch (Exception e) {
//            throw new RuntimeException(e);
//        }
//    }

//    @DeleteMapping("/delete/{id}")
//    public void delete(@PathVariable Integer id) {
//        System.out.println("Deleting animal picture");
//        try {
//            repository.remove(id);
//        } catch (Exception e) {
//            throw new RuntimeException(e);
//        }
//    }

//    @GetMapping("/{id}")
//    public ResponseEntity<byte[]> getPicture(@PathVariable int id) {
//        Animal_picture picture = repository.findOne(id);
//        if (picture == null || picture.getPictureData() == null) {
//            return ResponseEntity.notFound().build();
//        }
//        return ResponseEntity.ok()
//                .contentType(MediaType.IMAGE_JPEG) // Adjust for your image type
//                .body(picture.getPictureData());
//    }

    //method to get all the pictures of an animal
    @GetMapping("/animal/{id}")
    public Iterable<Animal_picture> getAnimalPictures(@PathVariable("id") Integer id) {
        System.out.println("Getting animal pictures");
        try {
            return repository.getPicturesByAnimalId(id);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

//    @GetMapping("/{id}")
//    public ResponseEntity<Animal_picture> getAnimal_pictureById(@PathVariable("id") Integer id) {
//        System.out.println("Getting animal picture with ID: " + id);
//        try {
//            Animal_picture animal_picture = repository.findOne(id);
//            if (animal_picture != null) {
//                return ResponseEntity.ok(animal_picture);
//            } else {
//                return ResponseEntity.notFound().build();
//            }
//        } catch (Exception e) {
//            throw new RuntimeException(e);
//        }
//    }

//    @DeleteMapping("/{id}")
//    public void deleteAnimal_picture(@PathVariable("id") Integer id) {
//        System.out.println("Deleting animal picture with ID: " + id);
//        try {
//            repository.remove(id);
//        } catch (Exception e) {
//            throw new RuntimeException(e);
//        }
//    }
//
//    @PutMapping("/{id}")
//    public void updateAnimal_picture(@PathVariable("id") Integer id, @RequestBody Animal_picture animal_picture) {
//        System.out.println("Updating animal picture with ID: " + id);
//        try {
//            repository.update(id, animal_picture);
//        } catch (Exception e) {
//            throw new RuntimeException(e);
//        }
//    }
//
//    @GetMapping("/animal/{id}")
//    public Iterable<Animal_picture> getAnimal_picturesByAnimalId(@PathVariable("id") Integer id) {
//        System.out.println("Getting animal pictures by animal ID: " + id);
//        try {
//            return repository.getPicturesByAnimalId(id);
//        } catch (Exception e) {
//            throw new RuntimeException(e);
//        }
//    }
//
//    @GetMapping("/animal/{id}/count")
//    public Integer getAnimal_picturesCountByAnimalId(@PathVariable("id") Integer id) {
//        System.out.println("Getting animal pictures count by animal ID: " + id);
//        try {
//            return repository.getPicturesCountByAnimalId(id);
//        } catch (Exception e) {
//            throw new RuntimeException(e);
//        }
//    }


}

