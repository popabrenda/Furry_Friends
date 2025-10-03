package winx.controller;

import Domain.Animal;
import Domain.Animal_type;
import Interfaces.IAnimalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/furry_friends/animals")
@CrossOrigin(origins = "http://localhost:8080")
public class AnimalRestController {

    @Autowired
    private IAnimalRepository animalRepository;


    @GetMapping
    public ResponseEntity<Iterable<Animal>> getAllAnimals() {
        System.out.println("Getting animals");
        try {
            Iterable<Animal> animals = animalRepository.getAll();
            return ResponseEntity.ok(animals);
        } catch (Exception e) {
            System.err.println("Error retrieving animals: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PostMapping("/register-animal")
    public ResponseEntity<?> addAnimal(@RequestBody Animal animal) {
        try {
            System.out.println("Creating animal "+ animal);
//            validateAnimal(animal);
            animalRepository.add(animal);
            return ResponseEntity.ok(animal);
        } catch (Exception e) {
           return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    // Metodă de validare a obiectului Animal
    private void validateAnimal(Animal animal) throws Exception {
        if (animal.getName() == null || animal.getName().trim().isEmpty()) {
            throw new Exception("Animal name cannot be null or empty.");
        }
        //TO DO: trebuie modificat sa apara eroare in cazul in care nu exista un owner
        if (animal.getOwner() == null || animal.getOwner().getId() == null) {
            throw new Exception("Animal owner cannot be null.");
        }
        //TO DO: trebuie modificat sa apara eroare in cazul in care nu exista cael tip de animal(asta se poate face si din frontend sa aleaga ce tip de animal e)
        if (animal.getType() == null || animal.getType().getId() == null){
            throw new Exception("Animal type cannot be null.");
        }
        if (animal.getDescription() == null || animal.getDescription().trim().isEmpty()) {
            throw new Exception("Animal description cannot be null or empty.");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Animal> getAnimalById(@PathVariable("id") Integer id) {
        System.out.println("Getting animal with ID: " + id);
        try {
            // Fetch animal from the repository by ID
            Animal animal = animalRepository.findOne(id);
            if (animal != null) {
                return ResponseEntity.ok(animal);  // If animal is found, return it
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);  // Animal not found
            }
        } catch (Exception e) {
            System.err.println("Error retrieving animal by ID: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);  // Server error
        }
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<List<Animal>> getAllAnimalsByUserId(@PathVariable("id") int id) {
        try {
            System.out.println("In Animal Controller-Getting animals for user with ID: " + id);
            // Obținem lista de animale pentru utilizatorul cu id-ul dat
            List<Animal> animals = animalRepository.getAllAnimalsById(id);

            // Dacă nu sunt găsite animale, returnăm un răspuns 404
            if (animals.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

            // Returnăm lista de animale cu status 200 OK
            return new ResponseEntity<>(animals, HttpStatus.OK);
        } catch (Exception e) {
            // În caz de eroare, returnăm un răspuns cu status 500
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
